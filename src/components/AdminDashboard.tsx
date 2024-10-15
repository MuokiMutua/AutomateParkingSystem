import React, { useState } from 'react';

interface AdminDashboardProps {
  parkingSpaces: number;
  bookings: Array<{ slot: number; name: string; email: string; carPlate: string }>;
  onAddParkingSpaces: (spaces: number) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ parkingSpaces, bookings, onAddParkingSpaces }) => {
  const [newSpaces, setNewSpaces] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const spacesToAdd = parseInt(newSpaces);
    if (!isNaN(spacesToAdd) && spacesToAdd > 0) {
      onAddParkingSpaces(spacesToAdd);
      setNewSpaces('');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add Parking Spaces</h2>
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="number"
            value={newSpaces}
            onChange={(e) => setNewSpaces(e.target.value)}
            min="1"
            className="flex-1 p-2 border rounded-md"
            placeholder="Number of spaces"
          />
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Add Spaces
          </button>
        </form>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Parking Overview</h2>
        <p>Total Spaces: {parkingSpaces}</p>
        <p>Occupied Spaces: {bookings.length}</p>
        <p>Available Spaces: {parkingSpaces - bookings.length}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Current Bookings</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Slot</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Car Plate</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.slot}>
                <td className="border p-2">{booking.slot}</td>
                <td className="border p-2">{booking.name}</td>
                <td className="border p-2">{booking.email}</td>
                <td className="border p-2">{booking.carPlate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
