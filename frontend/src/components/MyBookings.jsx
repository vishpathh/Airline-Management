import React, { useEffect, useState } from 'react';
import api from './api';
import { useAuth } from '../context/AuthContext';

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [flights, setFlights] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState({});
  const [bookedSeatsMap, setBookedSeatsMap] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await api.get(`/api/bookings/user/${user._id}`);
      setBookings(res.data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  const fetchFlights = async () => {
    try {
      const res = await api.get('/api/flights');
      setFlights(res.data);

      const seatsData = {};
      for (let flight of res.data) {
        const bookedRes = await api.get(`/api/bookings/flight/${flight._id}`);
        seatsData[flight._id] = bookedRes.data.seatNumbers || [];
      }
      setBookedSeatsMap(seatsData);
    } catch (err) {
      console.error('Error fetching flights or booked seats:', err);
    }
  };

  useEffect(() => {
    if (!user?._id) return;
    Promise.all([fetchBookings(), fetchFlights()]).finally(() => setLoading(false));
  }, [user]);

  const handleSeatSelect = (flightId, seatNumber) => {
    setSelectedSeats({ ...selectedSeats, [flightId]: seatNumber });
  };

  const handleBooking = async (flight) => {
    const seat = selectedSeats[flight._id];
    if (!seat) {
      alert('❗ Please select a seat number');
      return;
    }

    if (bookedSeatsMap[flight._id]?.includes(seat)) {
      alert('🚫 Seat is already booked by someone else.');
      return;
    }

    try {
      await api.post('/api/bookings', {
        userId: user._id,
        flightId: flight._id,
        seatsBooked: 1,
        seatNumber: seat,
      });
      setSelectedSeats({ ...selectedSeats, [flight._id]: '' });
      await fetchBookings();
      await fetchFlights();
      alert('✅ Flight booked successfully!');
    } catch (err) {
      console.error('Error booking flight:', err);
      alert('❌ Booking failed. Please try again.');
    }
  };

  if (loading) return <div className="text-center py-10 text-lg">Loading your bookings and flights...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">My Bookings</h1>

      {/* Seat Status Legend */}
      <div className="flex justify-center space-x-4 mb-6">
        <div className="flex items-center space-x-2">
          <span className="w-4 h-4 bg-red-400 rounded"></span>
          <span className="text-sm text-gray-600">Booked</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-4 h-4 bg-green-500 rounded"></span>
          <span className="text-sm text-gray-600">Selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-4 h-4 bg-gray-200 rounded"></span>
          <span className="text-sm text-gray-600">Available</span>
        </div>
      </div>

      {/* Available Flights */}
      <section>
        <h2 className="text-2xl font-semibold text-indigo-700 mb-6 text-center">Available Flights</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {flights.map((flight) => {
            const totalSeats = flight.seatsAvailable + (bookedSeatsMap[flight._id]?.length || 0);
            const bookedSeats = bookedSeatsMap[flight._id] || [];
            const allSeats = Array.from({ length: totalSeats }, (_, i) => i + 1);

            return (
              <div key={flight._id} className="bg-white p-6 shadow-lg rounded-xl border space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-indigo-600 mb-1">{flight.flightNumber} - {flight.airline}</h3>
                  <p className="text-gray-700 text-sm">
                    <strong>From:</strong> {flight.source}<br />
                    <strong>To:</strong> {flight.destination}<br />
                    <strong>Departure:</strong> {new Date(flight.departureTime).toLocaleString()}<br />
                    <strong>Arrival:</strong> {new Date(flight.arrivalTime).toLocaleString()}<br />
                    <strong>Price:</strong> ₹{flight.price}
                  </p>
                </div>

                {/* Seat Selection */}
                <div>
                  <p className="text-sm font-medium mb-2 text-gray-700">Select a seat:</p>
                  <div className="grid grid-cols-6 gap-2 text-sm">
                    {allSeats.map((seat) => (
                      <button
                        key={seat}
                        title={`Seat ${seat}`}
                        onClick={() => handleSeatSelect(flight._id, seat)}
                        disabled={bookedSeats.includes(seat)}
                        className={`p-2 rounded border transition-all ${
                          bookedSeats.includes(seat)
                            ? 'bg-red-400 text-white cursor-not-allowed'
                            : selectedSeats[flight._id] === seat
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 hover:bg-green-100'
                        }`}
                      >
                        {seat}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleBooking(flight)}
                  className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700"
                >
                  Book Flight
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Booked Flights */}
      <section>
        <h2 className="text-2xl font-semibold text-indigo-700 mb-6 text-center">Your Bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-center text-gray-500">You haven't booked any flights yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {bookings.map((booking) => {
              const flight = booking.flightId;
              return (
                <div key={booking._id} className="bg-white p-6 shadow-lg rounded-xl border space-y-3">
                  <h3 className="text-lg font-bold text-green-700">
                    {flight.flightNumber} – {flight.airline}
                  </h3>
                  <p className="text-sm text-gray-700">
                    <strong>From:</strong> {flight.source}<br />
                    <strong>To:</strong> {flight.destination}<br />
                    <strong>Departure:</strong> {new Date(flight.departureTime).toLocaleString()}<br />
                    <strong>Arrival:</strong> {new Date(flight.arrivalTime).toLocaleString()}<br />
                    <strong>Seat No.:</strong> {booking.seatNumber}<br />
                    <strong>Booked On:</strong> {new Date(booking.bookingDate).toLocaleString()}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default MyBookings;
