function ipToBinary(ip) {
    return ip.split('.').map(octet => {
        // Converte o octeto para um inteiro, depois para binário
        let binaryOctet = parseInt(octet, 10).toString(2);
        // Preenche com zeros à esquerda para garantir 8 bits
        return binaryOctet.padStart(8, '0');
    }).join('.');
}

// Teste da função


const ip = '192.168.1.1'
console.log(ip.split('.').map(num => ('00000000' + parseInt(num, 10).toString(2)).slice(-8)).join(''))