// App.js
import React, { useState } from 'react';
import './App.css';
import BookingForm from './components/BookingForm';

function App() {
	const [availableTimes, setAvailableTimes] = useState([
		'12:00 PM',
		'1:00 PM',
		'2:00 PM',
		'3:00 PM',
		'4:00 PM',
	]);
	const [bookingData, setBookingData] = useState(null);

	const handleBooking = (data) => {
		setBookingData(data);
		alert('Booking confirmed!');
	};

	return (
		<div className='app'>
			<header>
				<h1>Little Lemon - Table Booking</h1>
			</header>
			<main>
				<BookingForm
					availableTimes={availableTimes}
					onBook={handleBooking}
				/>
			</main>
			{bookingData && (
				<p>Booking Confirmed: {bookingData.name}</p>
			)}
		</div>
	);
}

export default App;
