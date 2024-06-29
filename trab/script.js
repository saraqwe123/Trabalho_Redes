let botinho = document.getElementById("ibotao")
let formulario = document.getElementById("icontainer")
let container2 = document.getElementById("icontainer2")
let ip = document.getElementById("iip")
let hosts = document.getElementById("ihost")
let mascara = document.getElementById("imascara")
let ul = document.getElementById("iul")

function muda_div(event) {
    event.preventDefault();
    if (event.target === botinho && ip.value.trim() != "" && hosts.value.trim() != "" && hosts.value.trim() >= 1 && mascara.value.trim() >= 0 && mascara.value.trim() <= 32) {
        formulario.style.display = "none"
        container2.style.display = "flex"
        cria_lista()
        calcula_mascara()
    }
    else {
        alert("preencha tudo corretamente")
    }
}

function cria_lista() {
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
    for (let i = 0; i < parseFloat(hosts.value); i++){
        if (2 ** i >= parseFloat(hosts.value)) {
            let li = ul.children[i]
            let p6 = document.createElement("p6")
            p6.textContent = mascara.value - (2 ** i)
            li.appendChild(p6)
            break
        }
    }
}

botinho.addEventListener("click", muda_div)