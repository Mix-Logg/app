
import * as Location from "expo-location";

export default function validDistanceCheck(CDlatitude, CDlongitude, radius){
    
    const R = 6371; // Raio da Terra em km
    // Função para converter graus para radianos
    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };
    // Função para calcular a distância Haversine
    const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distanceInKm = R * c; // Distância em km
        return distanceInKm * 1000; // Converter para metros
    };
    // Função para verificar se o motorista está dentro da área permitida
    const isWithinGeofence = (latMotorista, lonMotorista, latCD, lonCD, radius) => {
        const distance = getDistanceFromLatLonInMeters(latMotorista, lonMotorista, latCD, lonCD);
        return distance <= radius;
    };
    
    return new Promise((resolve, reject) => {
        Location.watchPositionAsync(
            {
                accuracy: Location.LocationAccuracy.Highest,
                timeInterval: 500,
                distanceInterval: 1
            },
            (res) => {
                if (res) {
                    const location = { latitude: res.coords.latitude, longitude: res.coords.longitude };
                    const isInside = isWithinGeofence(location.latitude, location.longitude, CDlatitude, CDlongitude, radius);
                    resolve(isInside); // Resolve a Promise com true ou false
                } else {
                    reject("Erro ao obter posição"); // Rejeita a Promise em caso de erro
                }
            }
        ).then((subscription) => {
            // Pode armazenar a subscription se necessário
        }).catch((error) => {
            console.error("Erro ao iniciar watchPositionAsync:", error);
            reject(error); // Rejeita a Promise em caso de erro
        });
    });
}