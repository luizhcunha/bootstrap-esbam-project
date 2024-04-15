// Declaration Error Screen
const closeButton = document.querySelector("#close-message");
const fadeElement = document.querySelector("#fade");
const addressForm = document.querySelector("#address-form");

// Inputs Form Declaration
const inputCEP = document.getElementById("inputCEP");
const inputEstado = document.querySelector("#inputEstado");
const inputCidade = document.querySelector("#inputCidade");
const inputRua = document.querySelector("#inputRua");
const inputBairro = document.querySelector("#inputBairro");
const inputNRua = document.querySelector("#inputNRua");
const inputComplemento = document.querySelector("#inputComplemento");
const inputurlEvento = document.querySelector("#inputUrlEvent");
const inputNomeEvento = document.querySelector("#inputNomeEvento");
const inputDescricaoEvento = document.querySelector("#inputDescricaoEvento");
const formInputs = document.querySelectorAll("[data-input]");

// API ViaCEP
const url = `viacep.com.br/ws/${inputCEP}/json/`;

// Inputs Presencial e Online
const presencialInput = document.getElementById("inputCheckLocalEventoPresencial");
const onlineInput = document.getElementById("inputCheckLocalEventoOnline");

// Containers para Presencial e Online
const containerPresencial = document.getElementById("container-presencial-checked");
const containerOnline = document.getElementById("container-online-checked");

// Verificar o input do CEP
inputCEP.addEventListener("keypress", (e) => {
    const onlyNumbers = /[0-9]/;
    const key = e.key;

    // Permitir apenas números
    if (!onlyNumbers.test(key)) {
        e.preventDefault();
        return;
    }
});

// Evento para pegar o endereço
inputCEP.addEventListener("keyup", (e) => {
    const inputValue = e.target.value;

    // Checar a quantidade correta de caracteres
    if (inputValue.length === 8) {
        getAddress(inputValue);
    }
});

// Pegar o endereço digitado diretamente da API
const getAddress = async (cep) => {
    toggleLoader();
    inputCEP.blur();

    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log(data);

    // Mostrar erro e resetar o formulário
    if (data.erro) {
        if (!inputEstado.hasAttribute("disabled")) {
            toggleDisabled();
        }

        inputCEP.value = "";
        inputEstado.value = "";
        inputCidade.value = "";
        inputBairro.value = "";
        inputRua.value = "";

        toggleLoader();
        toggleMessage("CEP inválido, tente novamente.");
        return;
    }

    if (inputEstado.value === "") {
        toggleDisabled();
    }

    inputEstado.value = data.uf;
    inputCidade.value = data.localidade;
    inputRua.value = data.logradouro;
    inputBairro.value = data.bairro;
    inputComplemento.value = data.complemento;
    toggleLoader();
};

// Alternar campos do formulário entre habilitado e desabilitado
const toggleDisabled = () => {
    if (inputEstado.hasAttribute("disabled")) {
        formInputs.forEach((input) => {
            input.removeAttribute("disabled");
        });
    } else {
        formInputs.forEach((input) => {
            input.setAttribute("disabled", "disabled");
        });
    }
};

// Alternar exibição do loader
const toggleLoader = () => {
    const loaderElement = document.querySelector("#loader");

    fadeElement.classList.toggle("hide");
    loaderElement.classList.toggle("hide");
};

// Alternar exibição da mensagem
const toggleMessage = (msg) => {
    const messageElement = document.querySelector('#message');
    const messageElementText = document.querySelector('#message p');

    messageElementText.innerText = msg;

    messageElement.classList.toggle("hide");
    fadeElement.classList.toggle("hide");
};

// Fechar mensagem de erro
closeButton.addEventListener("click", () => toggleMessage());

// Submissão do formulário de endereço
addressForm.addEventListener("submit", (e) => {
    e.preventDefault();
    toggleLoader();

    // Armazena os dados do evento na sessão da web

    if (presencialInput.checked) {
        // Pegue os valores dos campos do formulário
        const nome = document.getElementById('inputName').value;
        const sobrenome = document.getElementById('inputSurname').value;
        const email = document.getElementById('inputEmail').value;
        const telefone = document.getElementById('inputPhoneNumber').value;

        // Localização do Evento
        const cep = inputCEP.value;
        const estado = inputEstado.value;

        const nomeEvento = inputNomeEvento.value;
        const descricaoEvento = inputDescricaoEvento.value;

        // Armazene os valores no Local Storage ou Session Storage
        localStorage.setItem('nome', nome);
        localStorage.setItem('sobrenome', sobrenome);
        localStorage.setItem('email', email);
        localStorage.setItem('telefone', telefone);

        localStorage.setItem('nomeEvento', nomeEvento);
        localStorage.setItem('descricaoEvento', descricaoEvento);

        localStorage.setItem('cep', inputCEP.value);
        localStorage.setItem('estado', inputEstado.value);
        localStorage.setItem('cidade', inputCidade.value);
        localStorage.setItem('rua', inputRua.value);
        localStorage.setItem('bairro', inputBairro.value);
        localStorage.setItem('complemento', inputComplemento.value);

    }

    setTimeout(() => {
            toggleLoader();
            toggleMessage("Informações adicionadas com sucesso!\nIndo para o seu evento...");
    }, 500);

    setTimeout(() => {
        addressForm.reset();
        toggleDisabled();
        window.location.href = './pages/eventocriado.html';
    }, 1500);
});

// Eventos de clique para selecionar entre Presencial e Online
presencialInput.addEventListener("click", function () {
    containerOnline.setAttribute("hidden", true);
    containerPresencial.removeAttribute("hidden", true);
});

onlineInput.addEventListener("click", function () {
    containerPresencial.setAttribute("hidden", true);
    containerOnline.removeAttribute("hidden", true);
});

// Botão de Voltar ao Topo
$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
});
