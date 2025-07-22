import React, { useEffect, useState } from 'react';
import api from './api'; // Axios instance
// Example: api = axios.create({ baseURL: 'http://localhost:5000' });

const FlightBooking = ({ userId }) => {
  const [flights, setFlights] = useState([]);
  const [seats, setSeats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await api.get('/api/flights');
        setFlights(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching flights:', err);
        setLoading(false);
      }
    };
    fetchFlights();
  }, []);

  const handleSeatsChange = (flightId, value) => {
    setSeats({ ...seats, [flightId]: parseInt(value) || 1 });
  };

  const handleBook = async (flightId) => {
    try {
      const seatsToBook = seats[flightId] || 1;
      const res = await api.post('/api/bookings', {
        userId,
        flightId,
        seatsBooked: seatsToBook
      });
      alert('✅ Flight booked successfully!');
    } catch (err) {
      alert('❌ Booking failed. Please try again.');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-xl">Loading flights...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Book a Flight</h1>
      {flights.length === 0 ? (
        <p className="text-center text-gray-500">No flights available.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {flights.map((flight) => (
            <div
              key={flight._id}
              className="bg-white shadow rounded-lg p-5 border hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-indigo-700 mb-2">
                {flight.flightNumber} – {flight.airline}
              </h2>
              <p className="text-gray-600">
                <strong>From:</strong> {flight.source} <br />
                <strong>To:</strong> {flight.destination} <br />
                <strong>Departure:</strong>{' '}
                {new Date(flight.departureTime).toLocaleString()} <br />
                <strong>Arrival:</strong>{' '}
                {new Date(flight.arrivalTime).toLocaleString()} <br />
                <strong>Price:</strong> ₹{flight.price} <br />
                <strong>Seats Available:</strong> {flight.seatsAvailable}
              </p>

              <div className="mt-4 flex items-center space-x-3">
                <input
                  type="number"
                  min="1"
                  max={flight.seatsAvailable}
                  value={seats[flight._id] || 1}
                  onChange={(e) => handleSeatsChange(flight._id, e.target.value)}
                  className="w-20 px-2 py-1 border rounded"
                />
                <button
                  onClick={() => handleBook(flight._id)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlightBooking;
