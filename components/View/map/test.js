import MapViewRoute from 'react-native-maps-routes';
import MapViewDirections from 'react-native-maps-directions';
import MapView from 'react-native-maps';
import tailwind from 'twrnc';
export default function TestMap(){
    const origin = { latitude: 37.332280, longitude: -122.010980 };
    const destination = { latitude: 37.423199, longitude: -122.084068 };
    const GOOGLE_MAPS_APIKEY = 'AIzaSyAjzzp6aFH2qAGERfWJS_EDvMQuQece0wo';
    return(
        <MapView style={tailwind`h-200 w-full`}>
            {/* <MapViewRoute
                origin={origin}
                destination={destination}
                apiKey={GOOGLE_MAPS_APIKEY}
            /> */}
        </MapView>
    )
}
