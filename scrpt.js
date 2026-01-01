// ===== ANIMAÇÃO DE ENTRADA =====
window.onload = () => {
  const container = document.querySelector(".container");
  if (!container) return;

  container.style.opacity = 0;
  container.style.transform = "translateY(20px)";

  setTimeout(() => {
    container.style.transition = "0.6s";
    container.style.opacity = 1;
    container.style.transform = "translateY(0)";
  }, 100);
};

// ===== CARDÁPIO POR DIA =====
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
const btnZap = document.getElementById("btnZap");

// ===== ESTADOS =====
let carrinho = [];
let bebidasSelecionadas = [];
let tamanhoSelecionado = "";

// ===== RENDERIZA CARDÁPIO =====
lista.innerHTML = "";

cardapios[hoje].forEach(item => {
  const div = document.createElement("div");
  div.className = "item";
  div.innerText = item;

  div.addEventListener("click", () => {
    if (carrinho.includes(item)) {
      carrinho = carrinho.filter(i => i !== item);
      div.classList.remove("selecionado");
    } else {
      carrinho.push(item);
      div.classList.add("selecionado");
    }
  });

  lista.appendChild(div);
});

// ===== TAMANHO DA MARMITA =====
document.querySelectorAll(".tam").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tam").forEach(b => b.classList.remove("selecionado"));
    btn.classList.add("selecionado");
    tamanhoSelecionado = btn.dataset.tamanho.toLowerCase(); // IMPORTANTE
  });
});

// ===== BEBIDAS =====
document.querySelectorAll(".bebida-item").forEach(bebida => {
  bebida.addEventListener("click", () => {
    const nome = bebida.innerText;

    if (bebidasSelecionadas.includes(nome)) {
      bebidasSelecionadas = bebidasSelecionadas.filter(b => b !== nome);
      bebida.classList.remove("selecionado");
    } else {
      bebidasSelecionadas.push(nome);
      bebida.classList.add("selecionado");
    }
  });
});

// ===== QUANTIDADE =====
let quantidade = 1;

const spanQtd = document.getElementById("qtd");
const btnMais = document.getElementById("mais");
const btnMenos = document.getElementById("menos");

btnMais.onclick = () => {
  quantidade++;
  spanQtd.innerText = quantidade;
};

btnMenos.onclick = () => {
  if (quantidade > 1) {
    quantidade--;
    spanQtd.innerText = quantidade;
  }
};

// ===== PREÇOS =====
const precoMarmita = {
  pequena: 12,
  média: 15,
  grande: 18
};

const precoBebidas = {
  "Coca-Cola 2L": 12,
  "Coca-Cola Lata": 5,
  "Guaraná Antarctica 2L": 10,
  "Guaraná Lata": 5,
  "Água Mineral": 3
};

// ===== WHATSAPP =====
btnZap.onclick = () => {
  if (!tamanhoSelecionado) {
    alert("Escolha o tamanho da marmita 🍱");
    return;
  }

  if (bebidasSelecionadas.length === 0) {
    alert("Escolha pelo menos uma bebida 🥤");
    return;
  }

  // ===== CÁLCULO DO TOTAL =====
  let total = 0;

  if (precoMarmita[tamanhoSelecionado]) {
    total += precoMarmita[tamanhoSelecionado] * quantidade;
  }

  bebidasSelecionadas.forEach(b => {
    total += precoBebidas[b] || 0;
  });

  // ===== TEXTO WHATS =====
let texto = "*PEDIDO XEXEU BEER*\n\n";
texto += "Quantidade: " + quantidade + "\n";
texto += "Tamanho: " + tamanhoSelecionado + "\n\n";

texto += "A marmita contém:\n";
cardapios[hoje].forEach(item => {
  texto += item + "\n";
});

texto += "\nBebidas:\n";
bebidasSelecionadas.forEach(b => {
  texto += b + "\n";
});

texto += "\nTotal a pagar: R$ " + total.toFixed(2);

  const tel = "5531995956396";
  window.open(
    "https://api.whatsapp.com/send?phone=" +
      tel +
      "&text=" +
      encodeURIComponent(texto),
    "_blank"
  );
};
