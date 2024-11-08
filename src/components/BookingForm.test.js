import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import jest-dom matchers
import BookingForm from './BookingForm';

describe('BookingForm', () => {
	const availableTimes = ['12:00 PM', '1:00 PM', '2:00 PM'];
	const onBook = jest.fn();

	beforeEach(() => {
		act(() => {
			render(<BookingForm availableTimes={availableTimes} onBook={onBook} />);
		});
	});

	test('renders form fields correctly', () => {
		expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
	});

	test('validates form fields', () => {
		act(() => {
			fireEvent.click(screen.getByText(/book table/i));
		});

		expect(screen.getByText(/name is required/i)).toBeInTheDocument();
		expect(screen.getByText(/valid email is required/i)).toBeInTheDocument();
		expect(screen.getByText(/please select a time/i)).toBeInTheDocument();
	});

	test('handles valid form submission', () => {
		act(() => {
			fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
			fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
			fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '12:00 PM' } });
		});

		act(() => {
			fireEvent.click(screen.getByText(/book table/i));
		});

		expect(onBook).toHaveBeenCalledWith({
			name: 'John Doe',
			email: 'john@example.com',
			time: '12:00 PM',
		});
		expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/valid email is required/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/please select a time/i)).not.toBeInTheDocument();
	});
});
