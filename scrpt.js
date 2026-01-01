// Animação simples de entrada
window.onload = () => {
  document.querySelector(".container").style.opacity = 0;
  document.querySelector(".container").style.transform = "translateY(20px)";

  setTimeout(() => {
    document.querySelector(".container").style.transition = "0.6s";
    document.querySelector(".container").style.opacity = 1;
    document.querySelector(".container").style.transform = "translateY(0)";
  }, 100);
};const cardapios = {
  1: ["Bife acebolado","Frango grelhado","Arroz","Feijão","Purê de batata","Salada"],
  2: ["Feijoada","Lombo suíno","Arroz","Couve","Laranja"],
  3: ["Strogonoff","Carne de panela","Arroz","Batata palha","Salada"],
  4: ["Macarronada","Frango assado","Arroz","Salada"],
  5: ["Peixe frito","Arroz","Feijão","Salada"],
  6: ["Churrasco","Arroz","Farofa","Vinagrete"],
  0: ["Restaurante fechado 😴"]
};

const hoje = new Date().getDay();
const lista = document.getElementById("cardapio");
const btnZap = document.getElementById("btnZap");

let carrinho = [];
let tamanhoSelecionado = "";

/* RENDERIZA CARDÁPIO */
lista.innerHTML = "";
cardapios[hoje].forEach(item => {
  const div = document.createElement("div");
  div.className = "item";
  div.innerText = item;

  div.onclick = () => {
    if (carrinho.includes(item)) {
      carrinho = carrinho.filter(i => i !== item);
      div.classList.remove("selecionado");
    } else {
      carrinho.push(item);
      div.classList.add("selecionado");
    }
  };

  lista.appendChild(div);
});

/* TAMANHO */
document.querySelectorAll(".tam").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".tam").forEach(b => b.classList.remove("selecionado"));
    btn.classList.add("selecionado");
    tamanhoSelecionado = btn.dataset.tamanho;
  };
});

/* WHATSAPP */
btnZap.onclick = () => {
  if (!tamanhoSelecionado) {
    alert("Escolha o tamanho da marmita 🍱");
    return;
  }

  if (carrinho.length === 0) {
    alert("Escolha pelo menos um prato 😊");
    return;
  }

  let msg = `Olá! Gostaria de pedir:%0A%0A`;
  msg += `🍱 Tamanho: ${tamanhoSelecionado}%0A%0A`;
  msg += `🍽️ Pratos:%0A`;
carrinho.forEach(item => {
  msg += `- ${item}%0A`;
});

if (bebidasSelecionadas.length > 0) {
  msg += `%0A🥤 Bebidas:%0A`;
  bebidasSelecionadas.forEach(b => {
    msg += `- ${b}%0A`;
  });
}


  carrinho.forEach(item => {
    msg += `- ${item}%0A`;
  });

  const tel = "5531995956396";
  window.open(`https://api.whatsapp.com/send?phone=${tel}&text=${msg}`, "_blank");
};
  let bebidasSelecionadas = [];

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

