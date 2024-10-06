document.addEventListener('DOMContentLoaded', () => {
  const produtoForm = document.getElementById('produtoForm');
  const produtosTableBody = document.querySelector('#produtosTable tbody');

  // Função para carregar os produtos do LocalStorage
  const carregarProdutos = () => {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtosTableBody.innerHTML = '';
    produtos.forEach(produto => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${produto.id}</td>
        <td>${produto.descricao}</td>
        <td>${produto.cor}</td>
        <td>${produto.tamanho}</td>
        <td>R$ ${produto.valor_custo.toFixed(2)}</td>
        <td>R$ ${produto.valor_venda.toFixed(2)}</td>
        <td><button class="action-btn" data-id="${produto.id}">Excluir</button></td>
      `;
      produtosTableBody.appendChild(tr);
    });
  };

  // Função para adicionar um novo produto
  const adicionarProduto = (produto) => {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.push(produto);
    localStorage.setItem('produtos', JSON.stringify(produtos));
    carregarProdutos();
  };

  // Função para excluir um produto
  const excluirProduto = (id) => {
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos = produtos.filter(produto => produto.id !== id);
    localStorage.setItem('produtos', JSON.stringify(produtos));
    carregarProdutos();
  };

  // Evento de envio do formulário
  produtoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const descricao = document.getElementById('descricao').value.trim();
    const cor = document.getElementById('cor').value.trim();
    const tamanho = document.getElementById('tamanho').value.trim();
    const valor_custo = parseFloat(document.getElementById('valor_custo').value);
    const valor_venda = parseFloat(document.getElementById('valor_venda').value);

    if (!descricao || !cor || !tamanho || isNaN(valor_custo) || isNaN(valor_venda)) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    // Gerar ID automaticamente
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const novoId = produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1;

    const novoProduto = {
      id: novoId,
      descricao,
      cor,
      tamanho,
      valor_custo,
      valor_venda
    };

    adicionarProduto(novoProduto);
    produtoForm.reset();
  });

  // Evento para excluir produtos
  produtosTableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('action-btn')) {
      const id = parseInt(e.target.getAttribute('data-id'));
      if (confirm('Tem certeza que deseja excluir este produto?')) {
        excluirProduto(id);
      }
    }
  });

  // Carregar produtos ao iniciar
  carregarProdutos();
});
