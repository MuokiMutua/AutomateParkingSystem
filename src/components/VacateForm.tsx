import React, { useState } from 'react';
import { Car } from 'lucide-react';

interface VacateFormProps {
  onVacate: (carPlate: string) => void;
}

const VacateForm: React.FC<VacateFormProps> = ({ onVacate }) => {
  const [carPlate, setCarPlate] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onVacate(carPlate);
    setCarPlate('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <h2 className="text-xl font-semibold">Vacate Parking Space</h2>
      <div className="flex items-center space-x-2">
        <Car className="text-gray-400" />
        <input
          type="text"
          value={carPlate}
          onChange={(e) => setCarPlate(e.target.value)}
          placeholder="Car Number Plate"
          required
          className="flex-1 p-2 border rounded-md"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
      >
        Vacate Space
      </button>
    </form>
  );
};

export default VacateForm;