// script.js - mantém URLs da sua API
const titulo = document.querySelector('header h1');
const uri = 'http://localhost:3000/'; // sua API
let alocacoes = [];
let automoveis = [];
let clientes = [];
let concessionarias = [];
let vendas = [];

const modal1 = document.getElementById('modal1');
const modal2 = document.getElementById('modal2');
const modal1Titulo = document.getElementById('modal1-titulo');
const modal1Conteudo = document.getElementById('modal1-conteudo');
const modal2Titulo = document.getElementById('modal2-titulo');
const selectCliente = document.getElementById('select-cliente');
const selectConcessionaria = document.getElementById('select-concessionaria');
const confirmarVendaBtn = document.getElementById('confirmar-venda');

let areaSelecionada = null;
let automovelSelecionado = null;
let alocacaoSelecionada = null;
let clienteSelecionado = null;
let concessionariaSelecionada = null;

// --- Carregamento de dados ---
async function carregarTitulo() {
  try {
    const res = await fetch(uri);
    const data = await res.json();
    titulo.textContent = data.titulo || 'Fábrica de Automóveis';
  } catch (e) {
    console.warn('Erro ao carregar título:', e);
  }
}

async function carregarAlocacoes() {
  const res = await fetch(uri + 'alocacoes');
  alocacoes = await res.json();
}
async function carregarVendas() {
  const res = await fetch(uri + 'vendas');
  vendas = await res.json();
}
async function carregarAutomoveis() {
  const res = await fetch(uri + 'automoveis');
  automoveis = await res.json();
}
async function carregarClientes() {
  const res = await fetch(uri + 'clientes');
  clientes = await res.json();
}
async function carregarConcessionarias() {
  const res = await fetch(uri + 'concessionarias');
  concessionarias = await res.json();
}

// --- Montar áreas na tela ---
function montarAreas() {
  const main = document.querySelector('main#patio') || document.getElementById('patio');
  main.innerHTML = '';

  // Layout simples 3 col x 4 rows (11 áreas). Ajuste visual com CSS.
  for (let i = 1; i <= 11; i++) {
    const area = document.createElement('button');
    area.className = 'area';
    area.id = `area-${i}`;
    area.setAttribute('aria-label', `Área ${i}`);
    area.innerHTML = `<span class="area-num">${i}</span>`;

    const areaAlocada = alocacoes.find(a => a.area === i);
    if (areaAlocada) {
      area.classList.add('alocado');
      // se houver venda para alguma alocação nessa área, marca vendido
      const vendaExistente = alocacoes
        .filter(a => a.area === i)
        .some(a => vendas.find(v => v.alocacao === a.id));
      if (vendaExistente) area.classList.add('vendido');
      area.addEventListener('click', () => abrirModalArea(i));
    } else {
      area.classList.add('vazio');
      area.addEventListener('click', () => {
        // feedback simples para usuário
        toast(`Área ${i} vazia`);
      });
    }

    main.appendChild(area);
  }
}

// --- Pintar/atualizar áreas (chamado após carregar dados) ---
function pintarAreas() {
  document.querySelectorAll('.area').forEach(a => a.classList.remove('alocado', 'vendido', 'vazio'));

  for (let i = 1; i <= 11; i++) {
    const areaElem = document.querySelector(`#area-${i}`);
    const areaAlocada = alocacoes.find(a => a.area === i);
    if (!areaElem) continue;
    if (areaAlocada) {
      areaElem.classList.add('alocado');
      const vendaExistente = alocacoes
        .filter(a => a.area === i)
        .some(a => vendas.find(v => v.alocacao === a.id));
      if (vendaExistente) areaElem.classList.add('vendido');
    } else {
      areaElem.classList.add('vazio');
    }
  }
}

// --- Modal helpers ---
function abrirModal(modal) {
  modal.style.display = 'block';
  modal.setAttribute('aria-hidden', 'false');
}
function fecharModal(modal) {
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
}
function fecharTodosModais() {
  fecharModal(modal1);
  fecharModal(modal2);
  // limpa selects
  selectCliente.innerHTML = `<option value="">Selecione um cliente</option>`;
  selectConcessionaria.innerHTML = `<option value="">Selecione uma concessionária</option>`;
  confirmarVendaBtn.disabled = true;
}

// fechar ao clicar no X ou fora do conteúdo
document.querySelectorAll('.modal .close').forEach(btn => {
  btn.addEventListener('click', fecharTodosModais);
});
window.addEventListener('click', (e) => {
  if (e.target === modal1 || e.target === modal2) fecharTodosModais();
});

// --- Abrir modal de área com listagem de carros ---
function abrirModalArea(areaId) {
  areaSelecionada = areaId;
  const alocacoesArea = alocacoes.filter(a => a.area === areaId);

  if (!alocacoesArea || alocacoesArea.length === 0) {
    toast(`Área ${areaId} está vazia.`);
    return;
  }

  modal1Titulo.textContent = `Área ${areaId}`;
  modal1Conteudo.innerHTML = '';

  alocacoesArea.forEach(alocacao => {
    const automovel = automoveis.find(a => a.id === alocacao.automovel);
    const concessionaria = concessionarias.find(c => c.id === alocacao.concessionaria);
    const vendaExistente = vendas.find(v => v.alocacao === alocacao.id);

    if (!automovel) return;

    const item = document.createElement('div');
    item.className = 'carro-item';

    const info = document.createElement('div');
    info.className = 'carro-info';
    info.innerHTML = `<p><strong>Modelo:</strong> ${automovel.modelo}</p>
                      <p class="preco"><strong>Preço:</strong> R$ ${Number(automovel.preco).toLocaleString('pt-BR', {minimumFractionDigits:2})}</p>`;

    item.appendChild(info);

    if (vendaExistente) {
      const detalhes = document.createElement('div');
      detalhes.className = 'detalhes-venda';
      const clienteVenda = clientes.find(c => c.id === vendaExistente.cliente);
      detalhes.innerHTML = `
        <p><strong>Status:</strong> <span class="status-vendido">Vendido</span></p>
        <p><strong>Concessionária:</strong> ${concessionaria ? concessionaria.concessionaria : 'N/A'}</p>
        <p><strong>Cliente:</strong> ${clienteVenda ? clienteVenda.nome : 'N/A'}</p>
        <p><strong>Data:</strong> ${new Date(vendaExistente.data).toLocaleDateString('pt-BR')}</p>
      `;
      item.appendChild(detalhes);
    } else {
      const btn = document.createElement('button');
      btn.className = 'vender-btn';
      btn.textContent = 'Vender';
      btn.dataset.automovelId = automovel.id;
      btn.dataset.alocacaoId = alocacao.id;
      btn.addEventListener('click', () => {
        automovelSelecionado = automovel;
        alocacaoSelecionada = alocacao;
        abrirModalConfirmacao();
      });
      item.appendChild(btn);
    }

    modal1Conteudo.appendChild(item);
  });

  abrirModal(modal1);
}

// --- Abrir modal de confirmação de venda ---
function abrirModalConfirmacao() {
  if (!automovelSelecionado || !alocacaoSelecionada) return;

  modal2Titulo.textContent = automovelSelecionado.modelo;
  // preencher cliente (todos)
  selectCliente.innerHTML = `<option value="">Selecione um cliente</option>` +
    clientes.map(c => `<option value="${c.id}">${c.nome}</option>`).join('');

  // preencher concessionárias que tenham esse automóvel naquela área
  const concessionariasDisponiveisIds = new Set(
    alocacoes
      .filter(a => a.area === alocacaoSelecionada.area && a.automovel === automovelSelecionado.id)
      .map(a => a.concessionaria)
  );

  const opçõesConcessionarias = concessionarias
    .filter(c => concessionariasDisponiveisIds.has(c.id))
    .map(c => `<option value="${c.id}">${c.concessionaria}</option>`);

  selectConcessionaria.innerHTML = `<option value="">Selecione uma concessionária</option>` + opçõesConcessionarias.join('');

  // reset selections + botão
  clienteSelecionado = null;
  concessionariaSelecionada = null;
  confirmarVendaBtn.disabled = true;

  // listeners para habilitar botão (remover listeners antigos para evitar acúmulo)
  selectCliente.onchange = (e) => {
    clienteSelecionado = clientes.find(c => c.id == e.target.value) || null;
    confirmarVendaBtn.disabled = !(clienteSelecionado && concessionariaSelecionada);
  };
  selectConcessionaria.onchange = (e) => {
    concessionariaSelecionada = concessionarias.find(c => c.id == e.target.value) || null;
    confirmarVendaBtn.disabled = !(clienteSelecionado && concessionariaSelecionada);
  };

  fecharModal(modal1);
  abrirModal(modal2);
}

// --- Confirmar venda (POST para sua API) ---
async function confirmarVenda() {
  if (!alocacaoSelecionada || !clienteSelecionado || !concessionariaSelecionada) {
    alert('Preencha cliente e concessionária antes de confirmar.');
    return;
  }

  const vendaData = {
    cliente: clienteSelecionado.id,
    alocacao: alocacaoSelecionada.id,
    concessionaria: concessionariaSelecionada.id // caso sua API aceite, senão será ignorado
  };

  try {
    const resp = await fetch(uri + 'vendas', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(vendaData)
    });

    if (resp.ok) {
      toast('Venda confirmada com sucesso!');
      // recarrega dados e atualiza UI
      await carregarVendas();
      // após carregar vendas, repinta áreas e reabre modal da área para ver status atualizado
      pintarAreas();
      fecharTodosModais();

      // opcional: reabrir modal da área atual para mostrar atualização
      await abrirModalArea(areaSelecionada);
    } else {
      const text = await resp.text();
      console.error('Erro resposta venda:', resp.status, text);
      alert('Erro ao registrar venda no servidor.');
    }
  } catch (err) {
    console.error(err);
    alert('Erro na requisição de venda.');
  }
}

// ---- Pequenina função de feedback (toast) ----
function toast(msg, ms = 1600) {
  let t = document.querySelector('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), ms);
}

// --- Inicialização ---
async function inicializar() {
  await Promise.all([
    carregarTitulo(),
    carregarAlocacoes(),
    carregarAutomoveis(),
    carregarClientes(),
    carregarConcessionarias(),
    carregarVendas()
  ]);
  montarAreas();
  pintarAreas();

  // configurar botão confirmar venda
  confirmarVendaBtn.addEventListener('click', confirmarVenda);
}

inicializar();