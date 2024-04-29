export default function Mask(type, value){
    switch (type) {
        case 'phone':
            const cleanedValue = value.replace(/\D/g, '');
            let maskedValue = '';
            if (cleanedValue.length < 11) {
                // Máscara para números de telefone com 10 dígitos (xx) xxxx-xxxx
                maskedValue = cleanedValue.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
            } else {
                // Máscara para números de telefone com 11 dígitos (xx) xxxxx-xxxx
                maskedValue = cleanedValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            }
            return maskedValue;
        case 'amount':
            const formattedAmount = (value / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              });
            return formattedAmount
        default:
            break;
    }
}
