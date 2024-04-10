const inputEstado = document.getElementById("datalistEstado");
const cidadeList = document.getElementById("selectCidade")
const UF = document.getElementById("datalistOptionsEstados");
const urlUF = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados' // API DO IBGE

inputEstado.addEventListener('change', async function(){
    const urlCidades = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+inputEstado.value+'/municipios'
    const request = await fetch(urlCidades)
    const response = await request.json()
    
    let options = ''
    response.forEach(function(cidades){
        options += '<option>'+cidades.nome+'</option>'
    })
    cidadeList.innerHTML = options
    console.log(cidadeList.value)
})

window.addEventListener('load', async () => {
    const request = await fetch(urlUF);
    const response = await request.json();

    const options = document.createElement("optgroup");
    options.setAttribute('label', 'UFs');


    response.forEach(function (UF) {
        const option = document.createElement("option");
        option.textContent = UF.sigla;
        options.appendChild(option);

    });

    UF.append(options);

    console.log(UF)
});




