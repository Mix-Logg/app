import VerifyCPFUser from "../../api/VerifyCPFUser";

export default async function validateCPF(cpf){
    cpf = cpf.replace(/[^\d]/g, ''); // Remove caracteres não numéricos
    
     // Verifica se o CPF possui 11 dígitos
    if (cpf.length !== 11) {
        return false;
    }
    
    // Verifica se todos os dígitos são iguais, o que torna o CPF inválido
    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }
    
    // Faz a validação do CPF
    let sum = 0;
    let remainder;
    
    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    
    remainder = (sum * 10) % 11;
    
    if ((remainder === 10) || (remainder === 11)) {
        remainder = 0;
    }
    
    if (remainder !== parseInt(cpf.substring(9, 10))) {
        return false;
    }
    
    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    
    remainder = (sum * 10) % 11;
    
    if ((remainder === 10) || (remainder === 11)) {
        remainder = 0;
    }
    
    if (remainder !== parseInt(cpf.substring(10, 11))) {
        return false;
    }
    response = await VerifyCPFUser(cpf)
    if(response === 200){
        return true;
    } 
    return false;
}