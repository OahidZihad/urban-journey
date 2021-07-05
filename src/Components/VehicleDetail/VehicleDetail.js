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

  const onLoad = (marker) => {
    console.log("marker: ", marker);
  };

  return (
    <div>
      <div>
        <h1>Here is the Road Map for {vehicleId}</h1>
      </div>
      <LoadScript googleMapsApiKey="AIzaSyCVRJzWxAVF3_K6k7TRaAz1S83fRX_Vmw4">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          <Marker position={center} onLoad={onLoad}></Marker>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default VehicleDetail;
