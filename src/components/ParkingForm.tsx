import React from 'react';
import { Car, Mail, User } from 'lucide-react';

interface ParkingFormProps {
  onSubmit: (data: { name: string; email: string; carPlate: string }) => void;
}

const ParkingForm: React.FC<ParkingFormProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      carPlate: formData.get('carPlate') as string,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-2">
        <User className="text-gray-400" />
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className="flex-1 p-2 border rounded-md"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Mail className="text-gray-400" />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          className="flex-1 p-2 border rounded-md"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Car className="text-gray-400" />
        <input
          type="text"
          name="carPlate"
          placeholder="Car Number Plate"
          required
          className="flex-1 p-2 border rounded-md"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Reserve Parking
      </button>
    </form>
  );
};

export default ParkingForm;