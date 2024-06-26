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
            return formattedAmount;
        case 'cpf':
            // Máscara para CPF: xxx.xxx.xxx-xx
            return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        case 'firstName':
            // Corta o primeiro nome
            return value.split(' ')[0];
        case 'secondName':
            // Retorna o restante do nome (segundo nome)
            return value.split(' ').slice(1).join(' ');
        case 'day':
            // Retorna o dia da data
            return new Date(value).getDate();
        case 'month':
            // Retorna o mês da data
            return new Date(value).getMonth() + 1;
        case 'year':
            // Retorna o ano da data
            return new Date(value).getFullYear();
        case 'remove':
            return value.replace(/\D/g, '');
        case 'amountHidden':
            const amount = (value / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              });
            return amount.replace(/\d/g, '*');
        case 'km':
            const  km = parseFloat(value)
            const  formattedNumber = km.toFixed(2);
            return formattedNumber
        case 'dateFormat':
            if(!value){
                return ''
            }
            // Array com os nomes dos meses em português
            const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
          
            // Quebrando a string
            const partes = value.split('T');
            const data = partes[0].split('-');
            const hora = partes[1].split(':');
          
            // Extraindo e formatando as partes
            const ano = data[0];
            const mesIndex = parseInt(data[1]) - 1; // Subtraindo 1 porque os meses em JavaScript são indexados em 0
            const mes = meses[mesIndex];
            const dia = data[2].padStart(2, '0');
            const horas = hora[0].padStart(2, '0');
            const minutos = hora[1].padStart(2, '0');
            const segundos = hora[2];
            const fusoHorario = 'UTC';
          
            // Formatando a data e hora
            const dataFormatada = `dia ${dia} de ${mes} de ${ano} às ${horas}:${minutos}`;
          
            return dataFormatada;
            return
        default:
            return value;
    }
}
