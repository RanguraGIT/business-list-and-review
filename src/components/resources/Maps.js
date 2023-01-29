import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";

const containerStyle = {
    width: '100%',
    height: '94vh'
};

const customMapStyle = [
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    }
];

function Map({Location, BusinessPlace}) {
    const [Maps, setMaps] = useState(null);
    const [Zoom, setZoom] = useState(20);
    const [Markers, setMarkers] = useState([]);

    const { isLoaded } = useJsApiLoader({
        id:'google-map-script',
        googleMapsApiKey:process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })

    useEffect(() => {
        const newMarker = {
            position: Location,
            label: "You are here"
        };
        setMarkers([...Markers, newMarker]);

        if (Maps) {
            Maps.setZoom(17);
        }

    }, [Location, Maps])

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        map.setZoom(17);
        setMaps(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMaps(null)
    }
    , [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={Location}
            zoom={Zoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                clickableIcons: false,
                mapTypeControl: false,
                streetViewControl: false,
                placesAutocomplete: false,
                styles: customMapStyle
            }}
        >
            {
                Markers.map((marker, index) => {
                    if(index === Markers.length - 1) {
                        return <Marker key={index} position={marker.position} label={{
                            text: 'U',
                            fontSize: '16px',
                            color: 'white',
                            padding: '5px',
                        }} />
                    }
                })
            }
            {
                BusinessPlace.map((business, index) => {
                    return <Marker key={index} position={{lat: business.business_latitute, lng: business.business_longitude}} label={{
                        text: business.business_name,
                        fontSize: '16px',
                        color: 'black',
                        padding: '5px',
                    }} />
                })
            }
        </GoogleMap>
    ) : (
        <div className="loading">
            <h1>Loading...</h1>
        </div>
    )
}

export default Map;