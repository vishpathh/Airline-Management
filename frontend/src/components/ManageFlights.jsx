import React, { useState, useEffect } from 'react';
import api from './api';

const initialState = {
  flightNumber: '',
  airline: '',
  source: '',
  destination: '',
  departureTime: '',
  arrivalTime: '',
  price: '',
  seatsAvailable: ''
};

const ManageFlights = () => {
  const [flight, setFlight] = useState(initialState);
  const [flights, setFlights] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchFlights = async () => {
    try {
      const res = await api.get('/api/flights');
      setFlights(res.data);
    } catch (err) {
      console.error('Error fetching flights:', err);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleChange = (e) => {
    setFlight({ ...flight, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/api/flights/${editId}`, flight); // ✅ fixed here
      } else {
        await api.post('/api/flights/add', flight);
      }
      fetchFlights();
      setFlight(initialState);
      setEditId(null);
    } catch (err) {
      console.error('Error saving flight:', err);
    }
  };

  const handleEdit = (flight) => {
    setFlight({ ...flight });
    setEditId(flight._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this flight?')) {
      try {
        await api.delete(`/api/flights/${id}`); // ✅ fixed here
        fetchFlights();
      } catch (err) {
        console.error('Error deleting flight:', err);
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Flight Management</h1>

      {/* Add / Edit Flight Form */}
      <div className="bg-white shadow-md rounded p-6 mb-6 w-full max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">{editId ? 'Update Flight' : 'Add Flight'}</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {Object.entries(flight).map(([key, value]) => (
            <input
              key={key}
              name={key}
              type={
                key.toLowerCase().includes('time') ? 'datetime-local' :
                key === 'price' || key === 'seatsAvailable' ? 'number' : 'text'
              }
              placeholder={key}
              className="p-2 border rounded"
              value={value}
              onChange={handleChange}
              required
            />
          ))}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editId ? 'Update Flight' : 'Add Flight'}
          </button>
        </form>
      </div>

      {/* Flight Table */}
      <div className="bg-white shadow-md rounded p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">All Flights</h2>
        <table className="w-full text-sm text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Flight No.</th>
              <th className="p-2">Airline</th>
              <th className="p-2">From</th>
              <th className="p-2">To</th>
              <th className="p-2">Departure</th>
              <th className="p-2">Arrival</th>
              <th className="p-2">Price</th>
              <th className="p-2">Seats</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((f, i) => (
              <tr key={f._id} className="border-t">
                <td className="p-2">{i + 1}</td>
                <td className="p-2">{f.flightNumber}</td>
                <td className="p-2">{f.airline}</td>
                <td className="p-2">{f.source}</td>
                <td className="p-2">{f.destination}</td>
                <td className="p-2">{new Date(f.departureTime).toLocaleString()}</td>
                <td className="p-2">{new Date(f.arrivalTime).toLocaleString()}</td>
                <td className="p-2">₹{f.price}</td>
                <td className="p-2">{f.seatsAvailable}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(f)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(f._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {flights.length === 0 && (
              <tr>
                <td colSpan="10" className="text-center p-4 text-gray-400">
                  No flights available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageFlights;
