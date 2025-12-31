// Animação simples de entrada
window.onload = () => {
  document.querySelector(".container").style.opacity = 0;
  document.querySelector(".container").style.transform = "translateY(20px)";

  setTimeout(() => {
    document.querySelector(".container").style.transition = "0.6s";
    document.querySelector(".container").style.opacity = 1;
    document.querySelector(".container").style.transform = "translateY(0)";
  }, 100);
};
const diasSemana = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado"
];

const cardapios = {
  1: {
    titulo: "🥩 Segunda-feira",
    itens: [
      "Bife acebolado",
      "Frango grelhado",
      "Arroz",
      "Feijão",
      "Purê de batata",
      "Salada de alface e tomate"
    ]
  },
  2: {
    titulo: "🍛 Terça-feira",
    itens: [
      "Feijoada completa",
      "Lombo suíno acebolado",
      "Arroz",
      "Couve refogada",
      "Laranja"
    ]
  },
  3: {
    titulo: "🍗 Quarta-feira",
    itens: [
      "Strogonoff de frango",
      "Carne de panela",
      "Arroz",
      "Batata palha",
      "Salada de repolho"
    ]
  },
  4: {
    titulo: "🍝 Quinta-feira",
    itens: [
      "Macarronada à bolonhesa",
      "Frango assado",
      "Arroz",
      "Batata sauté",
      "Salada verde"
    ]
  },
  5: {
    titulo: "🐟 Sexta-feira",
    itens: [
      "Peixe frito",
      "Filé de tilápia grelhado",
      "Arroz",
      "Feijão",
      "Salada de legumes",
      "Limão"
    ]
  },
  6: {
    titulo: "🔥 Sábado",
    itens: [
      "Churrasco completo",
      "Carne bovina",
      "Linguiça",
      "Frango",
      "Arroz",
      "Feijão tropeiro",
      "Vinagrete",
      "Farofa"
    ]
  },
  0: {
    titulo: "❌ Domingo",
    itens: [
      "Restaurante fechado",
      "Bom descanso 😊"
    ]
  }
};

// DATA ATUAL
const hoje = new Date().getDay();

// ELEMENTOS
const tituloDia = document.getElementById("dia-semana");
const container = document.getElementById("cardapio");
const btnZap = document.getElementById("btnZap");

// CARRINHO
const carrinho = [];

// TÍTULO DO DIA
tituloDia.innerText = cardapios[hoje].titulo;

// LIMPA
container.innerHTML = "";

// RENDERIZA ITENS
cardapios[hoje].itens.forEach(item => {
  const div = document.createElement("div");
  div.classList.add("item");
  div.innerHTML = `<h3>${item}</h3>`;

  div.addEventListener("click", () => {
    if (carrinho.includes(item)) {
      carrinho.splice(carrinho.indexOf(item), 1);
      div.classList.remove("selecionado");
    } else {
      carrinho.push(item);
      div.classList.add("selecionado");
    }
  });

  container.appendChild(div);
});

// WHATSAPP
btnZap.addEventListener("click", () => {
  if (carrinho.length === 0) {
    alert("Selecione pelo menos um prato 😊");
    return;
  }

  let mensagem = `Olá! Gostaria de pedir o cardápio de hoje:%0A%0A`;

  carrinho.forEach(item => {
    mensagem += `- ${item}%0A`;
  });

  const telefone = "5531995956396";
  const url = `https://api.whatsapp.com/send?phone=${telefone}&text=${mensagem}`;

  window.open(url, "_blank");
});
