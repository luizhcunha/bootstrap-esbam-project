// Obter dados do localStorage
const nome = localStorage.getItem('nome');
const sobrenome = localStorage.getItem('sobrenome');
const email = localStorage.getItem('email');
const telefone = localStorage.getItem('telefone');
const nomeEvento = localStorage.getItem('nomeEvento');
const descricaoEvento = localStorage.getItem('descricaoEvento');
const cep = localStorage.getItem('cep');
const estado = localStorage.getItem('estado');
const cidade = localStorage.getItem('cidade');
const rua = localStorage.getItem('rua');
const bairro = localStorage.getItem('bairro');
const complemento = localStorage.getItem('complemento');
const tipoEvento = localStorage.getItem('tipoEvento');
const horarioEvento = localStorage.getItem('dataEvento')

console.log(cep, horarioEvento);

// Construir nome completo
const nomeCompleto = `${nome} ${sobrenome}`;

// Selecionar elementos HTML
const textoNomeEvento = document.querySelector('#nomeEvento');
const textoDescricaoEvento = document.querySelector('#descricaoEvento');
const textoIdealizador = document.querySelector("#idealizadorEvento");
const textoContatoTelefone = document.querySelector("#contatoEventoZap");
const textoContatoEmail = document.querySelector("#contatoEventoEmail");
const textoCEP = document.querySelector("#cepEvento");
const textoEstado = document.querySelector("#estadoEvento");
const textoCidade = document.querySelector("#cidadeEvento");
const textoRua = document.querySelector("#ruaEvento");
const textoBairro = document.querySelector("#bairroEvento");
const textoComplemento = document.querySelector("#complementoEvento");
const textoHorario = document.querySelector("#horarioEvento")
const textoTipoEvento = document.querySelector("#tipoEvento")

// Inserir dados nos elementos HTML
textoNomeEvento.innerHTML = nomeEvento;
textoDescricaoEvento.innerHTML = descricaoEvento;
textoIdealizador.innerHTML = nomeCompleto;
textoContatoTelefone.value = telefone;
textoContatoEmail.value = email;
textoCEP.value = cep;
textoEstado.value = estado;
textoCidade.value = cidade;
textoRua.value = rua;
textoBairro.value = bairro;
textoComplemento.value = complemento;
textoHorario.value = horarioEvento;
textoTipoEvento.value = tipoEvento;