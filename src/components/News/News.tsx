import React from "react"
import { GoogleMap, LoadScript } from "@react-google-maps/api"

const apikey = "AIzaSyCrvjt2TKWbbWwVDtRaoWoHtfUY3gr2IsY"

// lat and lng are float numbers not string
const lat =50.447968448664206
const lng = 30.5225565125408

const News = () => {
    const [map, setMap] = React.useState(null)
    return (
        <LoadScript id="script-loader" googleMapsApiKey={apikey}>
            <GoogleMap
                // set the state with the current instance of map.
                onLoad={map => {
                    setMap(map)
                }}
                mapContainerStyle={{
                    height: "400px",
                    width: "800px",
                }}
                zoom={16}
                center={{
                    lat: lat,
                    lng: lng,
                }}
                id="example-map"
                // here onZoomChanged we are accessing the current zoom value from our map
                //instance which is stored in the state
                onZoomChanged={() => {
                   // if(map)  console.log(map.getZoom())

                }}
            >
                ...Your map components
            </GoogleMap>
        </LoadScript>
    )
}

export default News