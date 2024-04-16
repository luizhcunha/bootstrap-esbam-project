const containerFormPresencial = document.querySelector("#container-location-presencial")
const containerFormOnline = document.querySelector("#container-location-online")

const checkinput = localStorage.getItem('checkInputPresencial');
const nome = localStorage.getItem('nome');
const sobrenome = localStorage.getItem('sobrenome');
const email = localStorage.getItem('email');
const telefone = localStorage.getItem('telefone');
const nomeEvento = localStorage.getItem('nomeEvento');
const tipoEvento = localStorage.getItem('tipoEvento');
const descricaoEvento = localStorage.getItem('descricaoEvento');
const horarioEvento = localStorage.getItem('dataEvento')

if (checkinput === "true") {
    containerFormOnline.setAttribute("hidden", true);
    containerFormPresencial.removeAttribute("hidden", true);

    const cep = localStorage.getItem('cep');
    const estado = localStorage.getItem('estado');
    const cidade = localStorage.getItem('cidade');
    const rua = localStorage.getItem('rua');
    const bairro = localStorage.getItem('bairro');
    const complemento = localStorage.getItem('complemento');

    const textoCEP = document.querySelector("#cepEvento");
    const textoEstado = document.querySelector("#estadoEvento");
    const textoCidade = document.querySelector("#cidadeEvento");
    const textoRua = document.querySelector("#ruaEvento");
    const textoBairro = document.querySelector("#bairroEvento");
    const textoComplemento = document.querySelector("#complementoEvento");

    textoCEP.value = cep;
    textoEstado.value = estado;
    textoCidade.value = cidade;
    textoRua.value = rua;
    textoBairro.value = bairro;
    textoComplemento.value = complemento;
} else {
    console.log("entrou no else")

    containerFormPresencial.setAttribute("hidden", true);
    containerFormOnline.removeAttribute("hidden", true);

    const textoUrl = document.querySelector("#localizacaoURL")

    const urlEvento = localStorage.getItem("urlEvento");
    
    textoUrl.innerHTML = urlEvento;
    textoUrl.setAttribute("href", urlEvento);


}


// Obter dados do localStorage





// Construir nome completo
const nomeCompleto = `${nome} ${sobrenome}`;

// Selecionar elementos HTML
const textoNomeEvento = document.querySelector('#nomeEvento');
const textoDescricaoEvento = document.querySelector('#descricaoEvento');
const textoIdealizador = document.querySelector("#idealizadorEvento");
const textoContatoTelefone = document.querySelector("#contatoEventoZap");
const textoContatoEmail = document.querySelector("#contatoEventoEmail");

const textoHorario = document.querySelector("#horarioEvento")
const textoTipoEvento = document.querySelector("#tipoEvento")

// Inserir dados nos elementos HTML
textoNomeEvento.innerHTML = nomeEvento;
textoDescricaoEvento.innerHTML = descricaoEvento;
textoIdealizador.innerHTML = nomeCompleto;
textoContatoTelefone.value = telefone;
textoContatoEmail.value = email;

textoHorario.value = horarioEvento;
textoTipoEvento.value = tipoEvento;