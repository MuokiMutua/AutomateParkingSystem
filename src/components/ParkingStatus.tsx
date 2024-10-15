import React from 'react';

interface ParkingStatusProps {
  status: string;
}

const ParkingStatus: React.FC<ParkingStatusProps> = ({ status }) => {
  return (
    <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
      {status}
    </div>
  );
};

export default ParkingStatus;