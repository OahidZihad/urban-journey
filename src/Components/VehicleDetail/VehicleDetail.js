import React from "react";
import { useParams } from "react-router-dom";

const VehicleDetail = () => {
  const { vehicleId } = useParams();
  return (
    <div>
      <div>
        <h1>Here is the Road Map for {vehicleId}</h1>
      </div>
    </div>
  );
};

export default VehicleDetail;
