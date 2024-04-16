// Declaration Error Screen
const closeButton = document.querySelector("#close-message");
const fadeElement = document.querySelector("#fade");
const addressForm = document.querySelector("#address-form");
const corpoForm = document.querySelector(".body-form");
const btnMainEvent = document.querySelector("#btnMainEvent");

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
const inputTipoEvento = document.querySelector("#inputTipoEvento")
const inputDiaEvento = document.querySelector("#inputDiaEvento");
const inputHoraEvento = document.querySelector("#inputHoraEvento");
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
inputCEP, inputNRua.addEventListener("keypress", function (e) {
    const onlyNumbers = /[0-9]/;
    const key = e.key;

    // Permitir apenas números
    if (!onlyNumbers.test(key)) {
        e.preventDefault();
        return;
    }
});

inputDiaEvento.addEventListener('change', atualizarDataEvento);
inputHoraEvento.addEventListener('change', atualizarDataEvento);

// Função para atualizar e armazenar a data do evento
function atualizarDataEvento() {
    // Obter os valores dos inputs de dia e hora do evento
    const dia = inputDiaEvento.value;
    const hora = inputHoraEvento.value;

    // Dividir a data em partes (ano, mês, dia)
    const [ano, mes, diaInput] = dia.split('-');

    // Criar um novo objeto Date com a data fornecida
    const dataEvento = new Date(ano, mes - 1, diaInput); // Mês é base 0, então subtrai 1

    // Obter o dia, mês e ano da data do evento
    const diaFormatado = dataEvento.getDate().toString().padStart(2, '0'); // Dia com 2 dígitos
    const mesFormatado = (dataEvento.getMonth() + 1).toString().padStart(2, '0'); // Mês com 2 dígitos
    const anoFormatado = dataEvento.getFullYear();

    // Formatar a data no formato dd/mm/aaaa
    const dataFormatada = `${diaFormatado}/${mesFormatado}/${anoFormatado}`;

    // Combinar a data formatada com a hora e armazenar no localStorage
    localStorage.setItem('dataEvento', `${dataFormatada} às ${hora} horas (horário de ${inputEstado.value})`);
}

//

// Evento para pegar o endereço
inputCEP.addEventListener("keyup", function (e) {
    const inputValue = e.target.value;

    // Checar a quantidade correta de caracteres
    if (inputValue.length === 8) {
        getAddress(inputValue);
    }
});

// Pegar o endereço digitado diretamente da API
const getAddress = async function (cep) {
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

btnMainEvent.addEventListener("click", function (e){

    const isAddressFormFilled = validateAddressForm();

    if(isAddressFormFilled) {
        console.log(inputCEP)
        window.location.href = './pages/eventocriado.html';
    }else {
        e.preventDefault();
        toggleMessage("Insira todos os dados para ir para o seu evento!");

        corpoForm.scrollIntoView({ behavior: "smooth", block: "start" });
    }
})

function validateAddressForm() {
    // Verificar se todos os campos do formulário de endereço estão preenchidos
    const inputCEP = document.getElementById("inputCEP").value;
    const inputEstado = document.getElementById("inputEstado").value;
    const inputCidade = document.getElementById("inputCidade").value;
    const inputRua = document.getElementById("inputRua").value;
    const inputBairro = document.getElementById("inputBairro").value;
    const inputComplemento = document.getElementById("inputComplemento").value;

    // Verificar se algum campo está vazio
    if (
        inputCEP === "" ||
        inputEstado === "" ||
        inputCidade === "" ||
        inputRua === "" ||
        inputBairro === "" ||
        inputComplemento === ""
    ) {
        return false; // Algum campo está vazio
    } else {
        return true; // Todos os campos estão preenchidos
    }
}

// Alternar campos do formulário entre habilitado e desabilitado
const toggleDisabled = function () {
    if (inputEstado.hasAttribute("disabled")) {
        formInputs.forEach(function (input) {
            input.removeAttribute("disabled");
        });
    } else {
        formInputs.forEach(function (input) {
            input.setAttribute("disabled", "disabled");
        });
    }
};

// Alternar exibição do loader
const toggleLoader = function () {
    const loaderElement = document.querySelector("#loader");

    fadeElement.classList.toggle("hide");
    loaderElement.classList.toggle("hide");
};

// Alternar exibição da mensagem
const toggleMessage = function (msg) {
    const messageElement = document.querySelector('#message');
    const messageElementText = document.querySelector('#message p');

    messageElementText.innerText = msg;

    messageElement.classList.toggle("hide");
    fadeElement.classList.toggle("hide");
};

// Fechar mensagem de erro
closeButton.addEventListener("click", function () {
    toggleMessage();
});

// Submissão do formulário de endereço
addressForm.addEventListener("submit", function (e) {
    e.preventDefault();
    toggleLoader();

    // Pegue os valores dos campos do formulário
    const nome = document.getElementById('inputName') ? document.getElementById('inputName').value : '';
    const sobrenome = document.getElementById('inputSurname') ? document.getElementById('inputSurname').value : '';
    const email = document.getElementById('inputEmail') ? document.getElementById('inputEmail').value : '';
    const telefone = document.getElementById('inputPhoneNumber') ? document.getElementById('inputPhoneNumber').value : '';
    const nomeEvento = inputNomeEvento.value;
    const descricaoEvento = inputDescricaoEvento.value;

    // Armazena os dados do evento na sessão da web
    localStorage.setItem('nome', nome);
    localStorage.setItem('sobrenome', sobrenome);
    localStorage.setItem('email', email);
    localStorage.setItem('telefone', telefone);
    localStorage.setItem('nomeEvento', nomeEvento);
    localStorage.setItem('descricaoEvento', descricaoEvento);
    localStorage.setItem('tipoEvento', inputTipoEvento.value);

    // Verifique se presencialInput está marcado
    if (presencialInput.checked.toString() === "true") {
        const selecao = presencialInput.checked.toString();

        localStorage.setItem('cep', inputCEP.value);
        localStorage.setItem('estado', inputEstado.value);
        localStorage.setItem('cidade', inputCidade.value);
        localStorage.setItem('rua', inputRua.value);
        localStorage.setItem('bairro', inputBairro.value);
        localStorage.setItem('complemento', inputComplemento.value);
        localStorage.setItem('checkInputPresencial', selecao);

    } else {
        const selecao = presencialInput.checked.toString();
        localStorage.setItem('checkInputPresencial', selecao);
        
        console.log("NÃO FOI SELECIONADO O PRESENCIAL")
        localStorage.setItem('urlEvento', inputurlEvento.value);
    }

    setTimeout(function () {
        toggleLoader();
        toggleMessage("Informações adicionadas com sucesso!\nIndo para o seu evento...");
    }, 500);

    setTimeout(function () {
        addressForm.reset();
        toggleDisabled();
        window.location.href = './pages/eventocriado.html';
    }, 1500);
});


// Eventos de clique para selecionar entre Presencial e Online
presencialInput.addEventListener("click", function () {
    inputurlEvento.value = ' ';

    containerOnline.setAttribute("hidden", true);
    containerPresencial.removeAttribute("hidden", true);
});

onlineInput.addEventListener("click", function () {
    inputCEP.value = ' ';
    inputEstado.value = ' ';
    inputCidade.value = ' ';
    inputNRua.value = ' ';
    inputRua.value = ' ';
    inputBairro.value = ' ';
    inputComplemento.value = ' ';

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
