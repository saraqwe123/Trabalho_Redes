let botinho = document.getElementById("ibotao");
let formulario = document.getElementById("icontainer");
let container2 = document.getElementById("icontainer2");
let ip = document.getElementById("iip");
let hosts = document.getElementById("ihost");
let mascara = document.getElementById("imascara");
let ul = document.getElementById("iul");
let intIntervalo = 0;
let mascinteira = 0;
let listaIntervalos = [];
let listaMascara = [];
let primeiro_end = [];
let ultimo_end = [];
let sub_rede = [];

function muda_div(event) {
  event.preventDefault();
  if (
    event.target === botinho &&
    ip.value.trim() != "" &&
    hosts.value.trim() != "" &&
    hosts.value.trim() >= 1 &&
    mascara.value.trim() >= 0 &&
    mascara.value.trim() <= 32
  ) {
    //verificações necessárias para mudar a div da tela
    formulario.style.display = "none";
    container2.style.display = "flex";
    intervalo(); //chamando a funcao intervalo
    calcula_mascara(); //chamando a funcao calcula_mascara
    subrede(); //chamando a funcao subrede
    primeiro_valido(); //chamando a funcao primeiro_valido
    ultimo_valido(); //chamando a funcao ultimo_valido
    mostrar(); //chamando a funcao mostrar
  } else {
    alert("preencha tudo corretamente"); //caso os dados nao estejam de acordo
  }
}

function intervalo() {
  let contador = []; //armazenar os valores
  let numIntervalo = [1, 2, 4, 8, 16, 32, 64, 128]; //possíveis intervalos
  let intervalo = Math.floor(255 / hosts.value); //pegando a parte inteira da divisão
  intIntervalo = intervalo;
  for (let i of numIntervalo) {
    contador.push(Math.abs(intIntervalo - i)); //subtraindo p achar a menor diferença
  }
  let valorperto = numIntervalo[contador.indexOf(Math.min(...contador))]; //acha o valor minimo e acessa sua posição, referente ao numIntervalo
  intIntervalo = Math.abs(valorperto); //tira o sinal
  console.log("intervalo: ", intIntervalo); //teste
  cria_listaIntervalo(); //chamando a funcao
  return intIntervalo;
}

function cria_listaIntervalo() {
  for (i = 0; i < hosts.value; i++) {
    //rodar até passar pela quantidade de subredes
    listaIntervalos.push(intIntervalo); //adc na lista para mostrar na tela dps
  }
  console.log(listaIntervalos);
  return listaIntervalos;
}

function calcula_mascara() {
  let diferenca = 32 - mascara.value; //calcula quantos bits sao 0 na mascara da subrede
  let acha_log = 256 / diferenca; //quantas sub-redes podem ser criadas usando a máscara de sub-rede especificada
  if (diferenca == 0) {
    acha_log = 1
  }
  let calcula_log = Math.log2(acha_log); //math para realizar operações matemáticas
  let nova_masc = 32 - calcula_log; //calcula_log é o número de bits que serão reservados para a máscara de sub-rede
  mascinteira = Math.floor(nova_masc); //parte inteira
  console.log("Nova máscara: ", nova_masc);
  console.log("Máscara inteira: ", mascinteira);
  console.log("Cálculo do log: ", calcula_log);
  cria_listaMascara();
}

function cria_listaMascara() {
  for (i = 0; i < hosts.value; i++) {
    listaMascara.push(mascinteira);
  }
  console.log(listaMascara);
  return listaMascara;
}

function subrede() {
  let ip_atual = ip.value; //para salvar o resultado
  for (i = 0; i < hosts.value; i++) {
    if (i == 0) {
      sub_rede.push(ip_atual); //adc
    }
    let ip_split = ip_atual.split("."); //separando pelos .
    let ult_ip = parseInt(ip_split.slice(-1)); //pegando a ultima posicao
    let novo_ult_ip = ult_ip + intIntervalo; //adc o intervalo p alterar o valor a cada subred
    console.log(novo_ult_ip); //teste
    ip_split.pop(); //removendo
    ip_split.push(novo_ult_ip.toString()); //adc no fim de ip_split e transformando em string
    let novo_end_ip = ip_split.join("."); //juntando novamente, pois antes tinhamos separado por póntos
    sub_rede.push(novo_end_ip); //adc
    ip_atual = novo_end_ip;
  }
  console.log(sub_rede);
}

function primeiro_valido() {
  for (i = 0; i < hosts.value; i++) {
    let ip_split = sub_rede[i].split("."); //pegando o endereço ip correto
    let ult_ip = parseInt(ip_split.slice(-1)); // pegando o ultimo elemento de ult_ip
    let novo_ult_ip = ult_ip + 1; //somando 1
    console.log(novo_ult_ip); //testes
    ip_split.pop(); //removendo o ultimo
    ip_split.push(novo_ult_ip.toString()); //adc e passando p string
    let novo_end_ip = ip_split.join("."); //acabando com a separacao por pontos 
    primeiro_end.push(novo_end_ip);  //adc o novo final
  }
  console.log(primeiro_end);
}

function ultimo_valido() {
  for (i = 0; i < hosts.value; i++) {
    let ip_split = primeiro_end[i].split("."); 
    let ult_ip = parseInt(ip_split.slice(-1)); //transformando em inteiro e pegando o ultimo elemento
    let novo_ult_ip = ult_ip + (intIntervalo - 2); //somando o ultimo elemento com o valor de intervslo menos 2
    console.log(novo_ult_ip);
    ip_split.pop(); //removendo 
    ip_split.push(novo_ult_ip.toString()); //adc
    if (novo_ult_ip >= 256){ //transformando pra 255 caso o valor ultrapasse o mesmo
      novo_ult_ip = 255
      break
    }
    let novo_end_ip = ip_split.join("."); //removendo a separacao
    ultimo_end.push(novo_end_ip); //adc

  }
  console.log(ultimo_end);
}

function mostrar() {
  for (let i = 0; i < hosts.value; i++) {
    let li = document.createElement("li");
    let hosts_texto = document.createElement("span");
    hosts_texto.textContent = i + 1;
    let ip_texto = document.createElement("span");
    ip_texto.textContent = sub_rede[i];
    let endvalido_texto = document.createElement("span");
    endvalido_texto.textContent = primeiro_end[i];
    let intIntervalo_texto = document.createElement("span");
    intIntervalo_texto.textContent = listaIntervalos[i];
    let rultendvalido_texto = document.createElement("span");
    rultendvalido_texto.textContent = ultimo_end[i];
    let masc_texto = document.createElement("span");
    masc_texto.textContent = "/" + listaMascara[i];
    hosts_texto.style.width = "18%";
    ip_texto.style.width = "25%";
    endvalido_texto.style.width = "25%";
    intIntervalo_texto.style.width = "15%";
    hosts_texto.style.width = "18%";
    rultendvalido_texto.style.width = "25%";
    masc_texto.style.width = "10%";
    li.appendChild(hosts_texto);
    li.appendChild(ip_texto);
    li.appendChild(intIntervalo_texto);
    li.appendChild(endvalido_texto);
    li.appendChild(rultendvalido_texto);
    li.appendChild(masc_texto);
    li.style.display = "flex";
    li.style.border = "1px solid black";
    li.style.borderBottom = "none";
    li.style.padding = "2%";
    ul.appendChild(li);
  }
}

botinho.addEventListener("click", muda_div);