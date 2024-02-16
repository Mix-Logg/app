export default async function Mask(value, mask){
    switch (mask) {
        case 'firstName':
            const partName = value.trim().split(' ');
            const firstName = partName[0];
            const nameFormat = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
            console.log('format:',nameFormat)
            return nameFormat;
        default:
            value
            break;
    }
}