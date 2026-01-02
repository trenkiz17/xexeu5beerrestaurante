window.onload = () => {
  const lista = document.getElementById("listaCarrinho");
  const totalSpan = document.getElementById("total");

  const precoBebidas = {
    "Coca-Cola 2L": 12,
    "Coca-Cola Lata": 5,
    "Guaraná Antarctica 2L": 10,
    "Guaraná Lata": 5,
    "Água Mineral": 3
  };

  let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  let totalGeral = 0;

  const renderCarrinho = () => {
    lista.innerHTML = "";
    totalGeral = 0;

    if (pedidos.length === 0) {
      lista.innerHTML = "<p>Carrinho vazio 😢</p>";
      totalSpan.innerText = "R$ 0,00";
      return;
    }

    pedidos.forEach((pedido, i) => {
      let subtotalMarmita = (pedido.tamanho.preco || 0) * pedido.quantidade;
      let subtotalBebidas = 0;
      pedido.bebidas.forEach(b => {
        subtotalBebidas += precoBebidas[b.trim()] || 0;
      });

      const subtotal = subtotalMarmita + subtotalBebidas;
      totalGeral += subtotal;

      // Adiciona botão X para remover
      lista.innerHTML += `
        <div class="item-carrinho">
          <strong>🍱 Pedido ${i + 1}</strong>
          <button class="btn-remover" data-index="${i}">❌</button><br>
          Tamanho: ${pedido.tamanho.nome} | Quantidade: ${pedido.quantidade}<br>
          Itens: ${pedido.itens.join(", ")}<br>
          Bebidas: ${pedido.bebidas.length ? pedido.bebidas.join(", ") : "Nenhuma"}<br>
          <strong>Subtotal do Pedido:</strong> R$ ${subtotal.toFixed(2)}
        </div>
        <hr>
      `;
    });

    totalSpan.innerText = "R$ " + totalGeral.toFixed(2);

    // Adiciona evento de remoção aos botões ❌
    document.querySelectorAll(".btn-remover").forEach(btn => {
      btn.onclick = () => {
        const index = btn.getAttribute("data-index");
        pedidos.splice(index, 1);
        localStorage.setItem("pedidos", JSON.stringify(pedidos));
        renderCarrinho();
      };
    });
  };

  renderCarrinho();

  document.getElementById("finalizar").onclick = () => {
    if (pedidos.length === 0) return alert("Carrinho vazio!");

    let texto = "*PEDIDO XEXEU BEER*\n\n";

    pedidos.forEach((p, i) => {
      let subtotalMarmita = (p.tamanho.preco || 0) * p.quantidade;
      let subtotalBebidas = 0;
      p.bebidas.forEach(b => { subtotalBebidas += precoBebidas[b.trim()] || 0; });
      const subtotal = subtotalMarmita + subtotalBebidas;

      texto += `🍱 Pedido ${i + 1}\nTamanho: ${p.tamanho.nome} | Quantidade: ${p.quantidade}\nItens: ${p.itens.join(", ")}\nBebidas: ${p.bebidas.length ? p.bebidas.join(", ") : "Nenhuma"}\nSubtotal: R$ ${subtotal.toFixed(2)}\n\n`;
    });

    texto += `Total do Pedido: R$ ${totalGeral.toFixed(2)}`;

    window.open(
      "https://api.whatsapp.com/send?phone=5531995956396&text=" + encodeURIComponent(texto),
      "_blank"
    );

    localStorage.removeItem("pedidos");
    pedidos = [];
    renderCarrinho();
  };

  document.getElementById("voltar").onclick = () => {
    window.location.href = "cardapio.html";
  };
};
