const inputCEP = document.getElementById("inputCEP");
const inputEstado = document.getElementById("datalistEstado");
const inputCidade = document.getElementById("inputCidade");
const cidadeList = document.getElementById("selectCidade")
const UF = document.getElementById("datalistOptionsEstados");
const urlUF = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados' // API DO IBGE

const url = `viacep.com.br/ws/${inputCEP}/json/`

inputCEP.addEventListener("keyup", (e) => {
    const inputValue = e.target.value  

    // Checar a quantidade certa de caracteres
    if (inputValue.length === 8) {
        getAdress(inputValue);
    }
});

// Pegar o endereço digitado direto da API
const getAdress = async (cep) => {
    console.log(cep);
    toggleLoader();
};

// Mostrar ou exibir o loader
const toggleLoader = () => {
    const fadeElement = document.querySelector('#fade');
    const loaderElement = document.querySelector('#loader');

    fadeElement.classList.toggle("hide");
    loaderElement.classList.toggle("hide");
}


const presencialInput = document.getElementById("inputCheckLocalEventoPresencial")
const onlineInput = document.getElementById("inputCheckLocalEventoOnline")

const containerPresencial = document.getElementById("container-presencial-checked")
const containerOnline = document.getElementById("container-online-checked")


presencialInput.addEventListener("click", function(){
    containerOnline.setAttribute("hidden", true)
    containerPresencial.removeAttribute("hidden", true)

})

onlineInput.addEventListener("click", function() {
    containerPresencial.setAttribute("hidden", true)
    containerOnline.removeAttribute("hidden", true)
})


