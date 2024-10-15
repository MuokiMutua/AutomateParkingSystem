import  { useState } from 'react';
import ParkingForm from './components/ParkingForm';
import ParkingStatus from './components/ParkingStatus';
import AdminDashboard from './components/AdminDashboard';
import VacateForm from './components/VacateForm';

function App() {
  const [parkingStatus, setParkingStatus] = useState<string | null>(null);
  const [parkingSpaces, setParkingSpaces] = useState<number>(0);
  const [bookings, setBookings] = useState<Array<{ slot: number; name: string; email: string; carPlate: string }>>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const handleParkingSubmit = async (data: { name: string; email: string; carPlate: string }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (bookings.length >= parkingSpaces) {
        setParkingStatus('Sorry, all parking spaces are occupied.');
        return;
      }

      const availableSlots = Array.from({ length: parkingSpaces }, (_, i) => i + 1)
        .filter(slot => !bookings.some(booking => booking.slot === slot));
      
      const slotId = availableSlots[Math.floor(Math.random() * availableSlots.length)];
      
      const newBooking = { slot: slotId, name: data.name, email: data.email, carPlate: data.carPlate };
      setBookings([...bookings, newBooking]);
      setParkingStatus(`Parking slot ${slotId} reserved for ${data.carPlate}`);

      // Send confirmation email
      await sendConfirmationEmail(newBooking);
    } catch (error) {
      console.error('Error reserving parking:', error);
      setParkingStatus('Error reserving parking. Please try again.');
    }
  };

  const sendConfirmationEmail = async (booking: { slot: number; name: string; email: string; carPlate: string }) => {
    // In a real application, you would call your backend API to send an email
    console.log(`Sending confirmation email to ${booking.email} for slot ${booking.slot}`);
    // Simulating email sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Email sent successfully');
  };

  const handleAddParkingSpaces = (spaces: number) => {
    setParkingSpaces(prevSpaces => prevSpaces + spaces);
  };

  const handleVacateSpace = (carPlate: string) => {
    const bookingIndex = bookings.findIndex(booking => booking.carPlate === carPlate);
    if (bookingIndex !== -1) {
      const updatedBookings = [...bookings];
      updatedBookings.splice(bookingIndex, 1);
      setBookings(updatedBookings);
      setParkingStatus(`Parking space for ${carPlate} has been vacated.`);
    } else {
      setParkingStatus(`No booking found for ${carPlate}.`);
    }
  };

  const toggleAdminView = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
    <button
      onClick={toggleAdminView}
        className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        {isAdmin ? 'User View' : 'Admin View'}
      </button>
      {isAdmin ? (
        <AdminDashboard
          parkingSpaces={parkingSpaces}
          bookings={bookings}
          onAddParkingSpaces={handleAddParkingSpaces}
        />
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Automated Parking System</h1>
          <ParkingForm onSubmit={handleParkingSubmit} />
          <VacateForm onVacate={handleVacateSpace} />
          {parkingStatus && <ParkingStatus status={parkingStatus} />}
        </div>
      )}
    </div>
  );
}

export default App;