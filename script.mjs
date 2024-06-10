import { hex_sha256 } from "./sha256-min.mjs";

const alvo = 'fd398252ff83832ff9ced13a4476cdc1d9609eed6e44a5684527c8f708b40357'; //SENHA123


document.getElementById('btn_login').onclick = () => {
    const entrada = document.getElementById('entrada-senha').value;
    if (hex_sha256(entrada) == alvo){
        sessionStorage.setItem('logado', 1);
        window.location.href = 'principal.html';
    } else {
        alert("Usuário inválido!")
    }
}
