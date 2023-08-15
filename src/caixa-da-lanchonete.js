class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {

    // Checa se existe algum item em itens[]. Se o tamanho for igual a 0, retorna que não existem itens no carrinho
    if(itens.length == 0) return "Não há itens no carrinho de compra!";
    let metodos_de_pagamento = ["dinheiro", "credito", "debito"];
    // Instancia preços como um objeto
    let precos = {
      cafe: 3.0,
      chantily: 1.5,
      suco: 6.2,
      sanduiche: 6.5,
      queijo: 2.0,
      salgado: 7.25,
      combo1: 9.5,
      combo2: 7.5,
    };
    let { cafe, chantily, suco, sanduiche, queijo, salgado, combo1, combo2 } = precos;
    let pTotal = 0.0;


    // Loop em itens[] p/ checar se o parâmetro inclui item no objeto preços
    for(let i = 0; i < itens.length; i++) {
        let nome_item = itens[i].split(",")[0];
        if(!precos[nome_item]) return "Item inválido!";
    }

    // Extras
    // Mapeia itens e cria um novo array com apenas os itens que estão atrás da vírgula
    let extras = itens.map((comida) => comida.split(",")[0]);
    let erro = false;

    // Checa se existe chantily em extras. Se existir, checa se café existe também. Caso exista chantily e não café, seta erro como true.
    if (extras.includes("chantily")) {
      if (!extras.includes("cafe")) {
        erro = true;
      }
    }

    // Checa se existe queijo em extras. Se existir, checa se café existe também. Caso exista queijo e não exista sanduíches, seta erro como true.
    if (extras.includes("queijo")) {
      if (!extras.includes("sanduiche")) {
        erro = true;
      }
    }

    //Se erro for setado como true, existe um item extra sem o principal
    if (erro) return "Item extra não pode ser pedido sem o principal";

    // Calculador de preços
    for (let index = 0; index < itens.length; index++) {
      let [item, quantidade] = itens[index].split(","); // Atribui index 1 a quantidade e o index 0 a item

      switch (item) {
        case "cafe":
          // Checa se existe um extra e a quantidade dos extras separadamente
          if (extras.includes("chantily")) {
            // Filtrando itens para achar "chantily" e pegando a quantidade depois da vírgula ([1])
            let qtdChantily = itens.filter(i => i.includes("chantily"))[0].split(",")[1];
            pTotal += quantidade * cafe + (quantidade * qtdChantily);
          } else {
            pTotal += quantidade * cafe;
          }
          break;
        case "suco":
          pTotal += quantidade * suco;
          break;
        case "sanduiche":
          // Checa se existe um extra
          if (extras.includes("queijo")) {
            // Filtrando itens para achar "queijo" e pegando a quantidade depois da vírgula ([1])
            let qtdQueijo = itens.filter(i => i.includes("queijo"))[0].split(",")[1];
            pTotal += (sanduiche * quantidade) + (qtdQueijo * queijo);
          } else {
            pTotal += sanduiche * quantidade;
          }
          break;
        case "salgado":
          pTotal += quantidade * salgado;
          break;
        case "combo1":
          pTotal += quantidade * combo1;
          break;
        case "combo2":
          pTotal += quantidade * combo2;
          break;
      }
    }

    // Checa e faz acréscimos baseados no método de pagamento
    switch (metodoDePagamento) {
        case "dinheiro":
            pTotal = pTotal - (5 * pTotal / 100);
            break;
        case "credito":
            pTotal += pTotal * 0.03;
            break;
    }

    // Checa a quantidade de itens
    if (pTotal == 0) return "Quantidade inválida!";
    
    // Formatações finais
    let preco = pTotal.toFixed(2).replace(".", ",");
    return `R$ ${preco}`;
  }
}

export { CaixaDaLanchonete };
