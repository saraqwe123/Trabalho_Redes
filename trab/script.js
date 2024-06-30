let botinho = document.getElementById("ibotao")
let formulario = document.getElementById("icontainer")
let container2 = document.getElementById("icontainer2")
let ip = document.getElementById("iip")
let hosts = document.getElementById("ihost")
let mascara = document.getElementById("imascara")
let ul = document.getElementById("iul")
let mascara_convertida = ""

function muda_div(event) {
    event.preventDefault();
    if (event.target === botinho && ip.value.trim() != "" && hosts.value.trim() != "" && hosts.value.trim() >= 1 && mascara.value.trim() >= 0 && mascara.value.trim() <= 32) {
        formulario.style.display = "none"
        container2.style.display = "flex"
        transforma_masc()

    }
    else {
        alert("preencha tudo corretamente")
    }
}

function Transforma_bin() {
    return ip.split('.').map(num => ('00000000' + parseInt(num, 10).toString(2)).slice(-8)).join(''); //separando o ip pelos . em seguida transformando os numeros em inteiros e dps pra strings binárias e o slice p tirar os pontos
}

function transforma_masc() {
    for (let i = 0; i <= parseFloat(mascara.value);) {
        mascara_convertida = "1"
        console.log(mascara_convertida)
    }
}

/*function cria_lista() {
    if (hosts.value != "") {
        for (let i = 0; i < parseFloat(hosts.value); i++) {
            var li = document.createElement("li")
            let p1 = document.createElement("p1")
            p1.textContent = `${i + 1}`
            p1.style.border = "1px solid black" 
            li.appendChild(p1)
            li.style.border = "1px solid black"
            li.style.borderBottom = "none"
            li.style.padding = "2%"
            ul.appendChild(li)
        }
    }
}

function calcula_mascara() {
    let nova_masc = ""
    for (let i = 0; i < parseFloat(hosts.value); i++){
        if (2 ** i >= parseFloat(hosts.value)) {
            nova_masc = 2 ** i
            console.log(nova_masc)
            break
        }
    }
    for (let i = 0; i <= parseFloat(hosts.value); i++){
        let li = ul.children[i]
        let p6 = document.createElement("p6")
        p6.textContent = mascara.value - nova_masc
        li.appendChild(p6)
        break
    }
}*/

botinho.addEventListener("click", muda_div)