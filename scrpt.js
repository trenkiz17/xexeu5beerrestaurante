window.onload = () => {
  // ===== ANIMAÇÃO =====
  const container = document.querySelector(".container");
  if (container) {
    container.style.opacity = 0;
    container.style.transform = "translateY(20px)";
    setTimeout(() => {
      container.style.transition = "0.6s";
      container.style.opacity = 1;
      container.style.transform = "translateY(0)";
    }, 100);
  }

  // ===== CARDÁPIO =====
  const cardapios = {
    1: ["Bife acebolado", "Frango grelhado", "Arroz", "Feijão", "Purê de batata", "Salada"],
    2: ["Feijoada", "Lombo suíno", "Arroz", "Couve", "Laranja"],
    3: ["Strogonoff", "Carne de panela", "Arroz", "Batata palha", "Salada"],
    4: ["Macarronada", "Frango assado", "Arroz", "Salada"],
    5: ["Peixe frito", "Arroz", "Feijão", "Salada"],
    6: ["Churrasco", "Arroz", "Farofa", "Vinagrete"],
    0: ["Restaurante fechado 😴"]
  };

  const hoje = new Date().getDay();
  const lista = document.getElementById("cardapio");

  // ===== ESTADOS =====
  let itensSelecionados = [];
  let bebidasSelecionadas = [];
  let tamanhoSelecionado = null; // agora é objeto {nome, preco}
  let quantidade = 1;

  // ===== RENDERIZA ITENS =====
  lista.innerHTML = "";
  cardapios[hoje].forEach(item => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerText = item;

    div.onclick = () => {
      if (itensSelecionados.includes(item)) {
        itensSelecionados = itensSelecionados.filter(i => i !== item);
        div.classList.remove("selecionado");
      } else {
        itensSelecionados.push(item);
        div.classList.add("selecionado");
      }
    };

    lista.appendChild(div);
  });

  // ===== TAMANHO =====
  document.querySelectorAll(".tam").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll(".tam").forEach(b => b.classList.remove("selecionado"));
      btn.classList.add("selecionado");

      // salva nome e preço da marmita
      tamanhoSelecionado = {
        nome: btn.dataset.tamanho,
        preco: parseFloat(btn.dataset.preco.replace("R$", "").replace(",", ".").trim())
      };
    };
  });

  // ===== BEBIDAS =====
  document.querySelectorAll(".bebida-item").forEach(b => {
    b.onclick = () => {
      const nome = b.dataset.nome; // pega só o nome da bebida

      if (bebidasSelecionadas.includes(nome)) {
        bebidasSelecionadas = bebidasSelecionadas.filter(x => x !== nome);
        b.classList.remove("selecionado");
      } else {
        bebidasSelecionadas.push(nome);
        b.classList.add("selecionado");
      }
    };
  });

  // ===== QUANTIDADE =====
  const spanQtd = document.getElementById("qtd");
  const btnMais = document.getElementById("mais");
  const btnMenos = document.getElementById("menos");

  if (btnMais) btnMais.onclick = () => { quantidade++; if (spanQtd) spanQtd.innerText = quantidade; };
  if (btnMenos) btnMenos.onclick = () => { if (quantidade > 1) { quantidade--; if (spanQtd) spanQtd.innerText = quantidade; } };

  // ===== IR PARA O CARRINHO =====
  document.getElementById("irCarrinho").onclick = () => {
    if (!tamanhoSelecionado) { alert("Escolha o tamanho da marmita 🍱"); return; }
    if (itensSelecionados.length === 0 && bebidasSelecionadas.length === 0) { alert("Selecione pelo menos um item 🍽️"); return; }

    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    pedidos.push({
      numero: pedidos.length + 1,
      itens: [...itensSelecionados],
      bebidas: [...bebidasSelecionadas],
      tamanho: tamanhoSelecionado, // objeto {nome, preco}
      quantidade: quantidade
    });

    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    // limpa seleção
    itensSelecionados = [];
    bebidasSelecionadas = [];
    tamanhoSelecionado = null;
    quantidade = 1;
    if (spanQtd) spanQtd.innerText = "1";
    document.querySelectorAll(".selecionado").forEach(el => el.classList.remove("selecionado"));

    window.location.href = "carrinho.html";
  };
};
