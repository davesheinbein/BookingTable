import React, { useState } from 'react';
import '../styles/BookingForm.css';

function BookingForm({ availableTimes, onBook }) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [time, setTime] = useState('');
	const [errors, setErrors] = useState({});

	const validateForm = () => {
		const errors = {};
		if (!name) errors.name = 'Name is required';
		if (!email || !/\S+@\S+\.\S+/.test(email))
			errors.email = 'Valid email is required';
		if (!time) errors.time = 'Please select a time';
		setErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			onBook({ name, email, time });
			setName('');
			setEmail('');
			setTime('');
			setErrors({});
		}
	};

	return (
		<form onSubmit={handleSubmit} className='booking-form'>
			<label>
				Name:
				<input
					type='text'
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder='Enter your name'
				/>
				{errors.name && (
					<span className='error'>{errors.name}</span>
				)}
			</label>

			<label>
				Email:
				<input
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder='Enter your email'
				/>
				{errors.email && (
					<span className='error'>{errors.email}</span>
				)}
			</label>

			<label>
				Time:
				<select
					value={time}
					onChange={(e) => setTime(e.target.value)}
				>
					<option value=''>Select a time</option>
					{availableTimes.map((timeOption, index) => (
						<option key={index} value={timeOption}>
							{timeOption}
						</option>
					))}
				</select>
				{errors.time && (
					<span className='error'>{errors.time}</span>
				)}
			</label>

			<button type='submit'>Book Table</button>
		</form>
	);
}

export default BookingForm;
