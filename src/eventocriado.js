const nome = localStorage.getItem('nome');
const sobrenome = localStorage.getItem('sobrenome');
const email = localStorage.getItem('email');
const telefone = localStorage.getItem('telefone');
const nomeEvento = localStorage.getItem('nomeEvento');
const descricaoEvento = localStorage.getItem('descricaoEvento');

const cep = localStorage.getItem('cep');
const estado = localStorage.getItem('estado')
const cidade = localStorage.getItem('cidade')
const rua = localStorage.getItem('rua')
const bairro = localStorage.getItem('bairro')
const complemento = localStorage.getItem('complemento')

console.log(nome, sobrenome, email, telefone, nomeEvento, descricaoEvento, cep, estado, cidade, rua, bairro, complemento);

const textoNomeEvento = document.querySelector('#nomeEvento')
const textoDescricaoEvento = document.querySelector('#descricaoEvento')

// Textos de Contato
const textoContatoTelefone = document.querySelector("#contatoEventoZap");
const textoContatoEmail = document.querySelector("#contatoEventoEmail");

// Textos de Localização
const textoCEP = document.querySelector("#cepEvento");
const textoEstado = document.querySelector("#estadoEvento");
const textoCidade = document.querySelector("#cidadeEvento");
const textoRua = document.querySelector("#ruaEvento");
const textoBairro = document.querySelector("#bairroEvento");
const textoComplemento = document.querySelector("#complementoEvento");

// Inserindo no HTMl
textoNomeEvento.innerHTML = nomeEvento;
textoDescricaoEvento.innerHTML = descricaoEvento;

textoContatoTelefone.value = telefone;
textoContatoEmail.value = email;

textoCEP.value = cep;
textoEstado.value = estado;
textoCidade.value = cidade;
textoRua.value = rua;
textoBairro.value = bairro;
textoComplemento.value = complemento;