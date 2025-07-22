import React from 'react';
import { motion } from 'framer-motion';
import { FaPlaneDeparture, FaTicketAlt, FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: <FaPlaneDeparture className="text-sky-500 text-4xl" />,
    title: 'Search Flights',
    desc: 'Browse available flights by entering source, destination, and date.',
  },
  {
    icon: <FaTicketAlt className="text-emerald-500 text-4xl" />,
    title: 'Book Instantly',
    desc: 'Book your seat in just a few clicks. No waiting, no hassle.',
  },
  {
    icon: <FaTimesCircle className="text-rose-500 text-4xl" />,
    title: 'Cancel with Ease',
    desc: 'Plans changed? Cancel bookings instantly with your reference ID.',
  },
];

const testimonials = [
  {
    quote: "Super intuitive and clean! Learned CRUD with real-time feedback.",
    name: "Pawan Etukala",
    role: "Full-Stack Developer",
  },
  {
    quote: "Brilliant practice app — highly recommend for MERN stack learners.",
    name: "Sai Pavan",
    role: "Node.js Developer",
  },
  {
    quote: "Booking logic is real-world accurate. Impressed by the design too!",
    name: "Dilip N.",
    role: "Backend Engineer",
  },
];

const Home = () => {
  return (
    <div className="font-sans text-gray-900">

      {/* Hero Section */}
      <section className="relative h-[90vh] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=1470&q=80)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-5xl md:text-6xl font-extrabold text-white mb-4"
          >
            Welcome to AirEase
          </motion.h1>
          <p className="text-lg md:text-xl text-white max-w-2xl mb-8">
            Your personalized airline booking solution — fast, simple, and beginner-friendly.
          </p>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/register"
              className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-full font-medium shadow-lg transition-all"
            >
              Book a Flight
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <h2 className="text-4xl font-bold text-center mb-14">Core Features</h2>
        <div className="grid gap-10 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-200 p-8 rounded-2xl text-center shadow hover:shadow-xl transition"
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-100 via-white to-purple-100 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">What Developers Say</h2>
        <div className="flex flex-col md:flex-row justify-center gap-10 max-w-6xl mx-auto">
          {testimonials.map(({ quote, name, role }, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="bg-white/50 backdrop-blur-md border border-gray-200 p-6 rounded-xl shadow-md text-center"
            >
              <p className="text-gray-700 italic mb-4">“{quote}”</p>
              <p className="font-bold text-indigo-700">{name}</p>
              <p className="text-sm text-gray-500">{role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-20 bg-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-6"
        >
          Ready to Fly?
        </motion.h2>
        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
          Start your booking journey now. Register, search flights, and manage trips — all in one place.
        </p>
        <motion.div whileHover={{ scale: 1.07 }}>
          <Link
            to="/register"
            className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-10 py-4 rounded-full font-semibold shadow-md transition"
          >
            Register Free
          </Link>
        </motion.div>
      </section>

    </div>
  );
};

export default Home;
