import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 25.329,
  lng: 89.5415,
};

const VehicleDetail = () => {
  const [directionResponse, setDirectionResponse] = useState(null);
  const { vehicleId } = useParams();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const onLoad = (marker) => {
    console.log("marker: ", marker);
  };

  return (
    <div>
      <div>
        <h1>Here is the Road Map for {vehicleId}</h1>
        <input
          type="text"
          placeholder="From"
          onBlur={(e) => setOrigin(e.target.value)}
        />
        <input
          type="text"
          placeholder="To"
          onBlur={(e) => setDestination(e.target.value)}
        />
      </div>
      <LoadScript
        origin={origin}
        destination={destination}
        googleMapsApiKey="AIzaSyCVRJzWxAVF3_K6k7TRaAz1S83fRX_Vmw4"
      >
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {/* <Marker position={center} onLoad={onLoad}></Marker> */}
          {origin !== "" && destination !== "" && (
            <DirectionsService
              // required
              options={{
                destination: "Al Modina Super Market Gaibandha Bangladesh",
                origin: "Gaibandha Fire Station Gaibandha Bangladesh",
                travelMode: "DRIVING",
              }}
              // required
              callback={(res) => {
                if (res !== null) {
                  setDirectionResponse(res);
                }
              }}
            />
          )}
          {directionResponse && (
            <DirectionsRenderer
              // required
              options={{
                directions: directionResponse,
              }}
              // optional
              onLoad={(directionsRenderer) => {
                console.log(
                  "DirectionsRenderer onLoad directionsRenderer: ",
                  directionsRenderer
                );
              }}
              // optional
              onUnmount={(directionsRenderer) => {
                console.log(
                  "DirectionsRenderer onUnmount directionsRenderer: ",
                  directionsRenderer
                );
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default VehicleDetail;
