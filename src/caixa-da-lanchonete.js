class CaixaDaLanchonete {
  constructor() {
    // Definindo o cardápio com os itens e seus detalhes
    this.cardapio = [
      { codigo: "cafe", descricao: "Café", valor: 3.0 },
      { codigo: "chantily", descricao: "Chantily", extra: "cafe", valor: 1.5 },
      { codigo: "suco", descricao: "Suco Natural", valor: 6.2 },
      { codigo: "sanduiche", descricao: "Sanduíche", valor: 6.5 },
      { codigo: "queijo", descricao: "Queijo", extra: "sanduiche", valor: 2.0 },
      { codigo: "salgado", descricao: "Salgado", valor: 7.25 },
      { codigo: "combo1", descricao: "1 Suco e 1 Sanduíche", valor: 9.5 },
      { codigo: "combo2", descricao: "1 Café e 1 Sanduíche", valor: 7.5 },
    ];

    // Definindo as formas de pagamento aceitas
    this.formasDePagamento = ["debito", "credito", "dinheiro"];
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    // Verificando se a forma de pagamento é válida
    if (!this.formasDePagamento.includes(metodoDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    // Verificando se há itens no carrinho de compra
    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    let total = 0;

    for (const itemStr of itens) {
      // Separando o código do item e a quantidade
      const [codigo, quantidade] = itemStr.split(",");

      // Buscando o item no cardápio pelo código
      const item = this.cardapio.find((entry) => entry.codigo === codigo);

      // Verificando se o item existe no cardápio
      if (!item) {
        return "Item inválido!";
      }

      // Verificando se a quantidade é inválida
      if (quantidade <= 0) {
        return "Quantidade inválida!";
      }

      // Calculando o total para itens não extras
      if (!item.extra) {
        total += item.valor * quantidade;
      } else {
        // Calculando o valor para itens extras
        // Verificar se o código do item principal está na lista de itens do pedido
        const itemPrincipalNoPedido = itens.some((itemStr) => {
          const [codigo] = itemStr.split(",");
          return codigo === item.extra;
        });

        if (!itemPrincipalNoPedido) {
          return "Item extra não pode ser pedido sem o principal";
        }

        total += item.valor * quantidade;
      }
    }

    // Aplicando desconto/acréscimo com base na forma de pagamento
    if (metodoDePagamento === "dinheiro") {
      total *= 0.95; // 5% de desconto
    } else if (metodoDePagamento === "credito") {
      total *= 1.03; // 3% de acréscimo
    }

    // Retornando o total formatado em reais
    return `R$ ${total.toFixed(2).replace(".", ",")}`;
  }
}

export { CaixaDaLanchonete };
