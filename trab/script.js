let botinho = document.getElementById("ibotao")
let formulario = document.getElementById("icontainer")
let container2 = document.getElementById("icontainer2")
let ip = document.getElementById("iip")
let hosts = document.getElementById("ihost")
let mascara = document.getElementById("imascara")
let ul = document.getElementById("iul")
let mascinteira = 0
let intIntervalo = 0
let primeiro_end = []
let ultimo_end = []
let sub_rede = ""


function muda_div(event) {
    event.preventDefault();
    if (event.target === botinho && ip.value.trim() != "" && hosts.value.trim() != "" && hosts.value.trim() >= 1 && mascara.value.trim() >= 0 && mascara.value.trim() <= 32) {
        formulario.style.display = "none"
        container2.style.display = "flex"
        for (let i = 0; i < parseInt(hosts.value.trim()); i++) {
            intervalo()
            endereco_subrede()
            calc_1endvalido()
            ultendvalido()
            calcula_mascara()
            mostrar()
        }
    }
    else {
        alert("preencha tudo corretamente")
    }
}


function intervalo() {
    let contador = []
    let numIntervalo = [1, 2, 4, 8, 16, 32, 64, 128]
    let intervalo = Math.floor(255 / hosts.value)
    intIntervalo = intervalo    
    for (let i of numIntervalo) {
        contador.push(Math.abs(intIntervalo - i))
    }
    let valorperto = numIntervalo[contador.indexOf(Math.min(...contador))]
    intIntervalo = Math.abs(valorperto)
    console.log("intervalo: ", intIntervalo)
    return intIntervalo
}

function calcula_mascara() {
    let diferenca = 32 - mascara.value
    let acha_log = 256 / diferenca
    let calcula_log = Math.log2(acha_log) //math para realizar operações matemáticas
    let nova_masc = 32 - calcula_log
    mascinteira = Math.floor(nova_masc)
    console.log("Nova máscara: ", nova_masc)
    console.log("Máscara inteira: ", mascinteira)
    console.log("Cálculo do log: ", calcula_log)
}


function endereco_subrede() {
    let ultimo_numero = parseInt(ultimo_end.slice(-1)) + 2
    sub_rede = ip.value.split('.')
    sub_rede.pop()
    sub_rede.push(ultimo_numero.toString())
    console.log("sub rede:" + ultimo_numero, sub_rede)
}


function calc_1endvalido() {
    let divisao = ip.value.split(".")
    let ultimo_numero = parseInt(divisao[3], 10)
    divisao[3] = (ultimo_numero + 1).toString()
    primeiro_end = divisao.join(".")
    console.log("1º endereço ip: ", primeiro_end)
}


function ultendvalido() {
    let divisao = ip.value.split(".")
    let ultimo_numero = parseInt(divisao[3], 10)
    divisao[3] = (ultimo_numero + intIntervalo - 2).toString()
    ultimo_end = divisao.join(".")
    console.log("ultimo endereço ip: ", ultimo_end)
    return ultimo_end
}


function mostrar() {
    let li = document.createElement("li")
    let hosts_texto = document.createElement("span")
    hosts_texto.textContent = hosts.value
    let ip_texto = document.createElement("span")
    ip_texto.textContent = ip.value
    let endvalido_texto = document.createElement("span")
    endvalido_texto.textContent = primeiro_end
    let intIntervalo_texto = document.createElement('span')
    intIntervalo_texto.textContent = intIntervalo
    let rultendvalido_texto = document.createElement("span")
    rultendvalido_texto.textContent = ultimo_end
    let masc_texto = document.createElement("span")
    masc_texto.textContent = "/" + mascinteira
    hosts_texto.style.width = "18%"
    ip_texto.style.width = "25%"
    endvalido_texto.style.width = "25%"
    intIntervalo_texto.style.width = "15%"
    hosts_texto.style.width = "18%"
    rultendvalido_texto.style.width = "25%"
    masc_texto.style.width = "10%"
    li.appendChild(hosts_texto)
    li.appendChild(ip_texto)
    li.appendChild(intIntervalo_texto)
    li.appendChild(endvalido_texto)
    li.appendChild(rultendvalido_texto)
    li.appendChild(masc_texto)
    li.style.display = "flex"
    li.style.border = "1px solid black"
    li.style.borderBottom = "none"
    li.style.padding = "2%"
    ul.appendChild(li)
}
botinho.addEventListener("click", muda_div)