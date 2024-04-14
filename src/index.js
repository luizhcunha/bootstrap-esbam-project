const inputCEP = document.getElementById("inputCEP");
const closeButton = document.querySelector("#close-message");
const fadeElement = document.querySelector("#fade");
const inputEstado = document.querySelector("#inputEstado");
const inputCidade = document.querySelector("#inputCidade");
const inputRua = document.querySelector("#inputRua");
const inputBairro = document.querySelector("#inputBairro");
const formInputs = document.querySelectorAll("[data-input]")

const UF = document.getElementById("datalistOptionsEstados");
const urlUF = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados' // API DO IBGE
const url = `viacep.com.br/ws/${inputCEP}/json/`


const presencialInput = document.getElementById("inputCheckLocalEventoPresencial")
const onlineInput = document.getElementById("inputCheckLocalEventoOnline")

const containerPresencial = document.getElementById("container-presencial-checked")
const containerOnline = document.getElementById("container-online-checked")
// Validar o input do CEP
inputCEP.addEventListener("keypress", (e) => {
    const onlyNumbers = /[0-9]/;
    const key = e.key;

    // Permitir apenas numeros
    if(!onlyNumbers.test(key)) {
        e.preventDefault();
        return;
    }
})

// Evento de pegar o endereco
inputCEP.addEventListener("keyup", (e) => {
    const inputValue = e.target.value  

    // Checar a quantidade certa de caracteres
    if (inputValue.length === 8) {
        getAddress(inputValue);
    }
});

// Pegar o endereço digitado direto da API
const getAddress = async (cep) => {
    toggleLoader();
    inputCEP.blur()

    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`
    const response = await fetch(apiUrl)
    const data = await response.json()

    console.log(data);

    // Mostrar erro e resetar o formulario
    if(data.erro) {
        if(!inputEstado.hasAttribute("disabled")) {
            toggleDisabled();
        }

        inputCEP.value = "";
        inputEstado.value = "";
        inputCidade.value = "";
        inputBairro.value = "";
        inputRua.value = "";

        toggleLoader();
        toggleMessage("CEP Inválido, tente novamente.");
        return;
    }

    if(inputEstado.value === "") {
        toggleDisabled();
    }

    inputEstado.value = data.uf;
    inputCidade.value = data.localidade;
    inputRua.value = data.logradouro;
    inputBairro.value = data.bairro;

    toggleLoader();
};

const toggleDisabled = () => {
    if(inputEstado.hasAttribute("disabled")) {
        formInputs.forEach((input) => {
            input.removeAttribute("disabled");
        });
    } else {
        formInputs.forEach((input) => {
            input.setAttribute("disabled", "disabled");
        })
    }
}

// Mostrar ou exibir o loader
const toggleLoader = () => {
    const loaderElement = document.querySelector("#loader");

    fadeElement.classList.toggle("hide");
    loaderElement.classList.toggle("hide");
}

// Mostrar ou esconder a mensagem
const toggleMessage = (msg) => {
    const messageElement = document.querySelector('#message');
    const messageElementText = document.querySelector('#message p');

    messageElementText.innerText = msg;

    messageElement.classList.toggle("hide");
    fadeElement.classList.toggle("hide");
}

closeButton.addEventListener("click", () => toggleMessage())




presencialInput.addEventListener("click", function(){
    containerOnline.setAttribute("hidden", true)
    containerPresencial.removeAttribute("hidden", true)

})

onlineInput.addEventListener("click", function() {
    containerPresencial.setAttribute("hidden", true)
    containerOnline.removeAttribute("hidden", true)
})


