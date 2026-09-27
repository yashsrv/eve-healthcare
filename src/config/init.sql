-- Users Table
CREATE TABLE IF NOT EXISTS public.users (
	id SERIAL PRIMARY KEY,
	email VARCHAR(255) UNIQUE NOT NULL,
	username TEXT NOT NULL,
	created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
	last_login_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Centres Table
CREATE TABLE IF NOT EXISTS public.centres (
	id SERIAL PRIMARY KEY,
	centre_name TEXT NOT NULL,
	test_name TEXT NOT NULL,
	amount NUMERIC(10, 2) NOT NULL,
	location TEXT NOT NULL,
	created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
	updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

INSERT INTO public.centres (centre_name, test_name, amount, location)
VALUES 
('Centre 1', 'MRI Scan', 6000, 'Najafgarh, New Delhi'),
('Centre 2', 'Blood Test', 500, 'Roshanpura, New Delhi'),
('Centre 3', 'LFT', 1000, 'Deenpur, New Delhi'),
('Centre 4', 'Fibroscan', 14000, 'Durga vihar, New Delhi');

-- Bookings Table
CREATE TYPE booking_status_enum AS ENUM ('PENDING', 'CONFIRMED', 'FAILED', 'CANCELLED');

CREATE TABLE IF NOT EXISTS public.bookings (
	id SERIAL PRIMARY KEY,
	patient_name TEXT NOT NULL,
	patient_email VARCHAR(255) NOT NULL REFERENCES public.users(email),
	test_name TEXT NOT NULL,
	centre_name TEXT NOT NULL,
	appointment_time TEXT NOT NULL,
	amount NUMERIC(10, 2) NOT NULL,
	status booking_status_enum NOT NULL DEFAULT 'PENDING',
	created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
	updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Payments Table
CREATE TYPE payment_status_enum AS ENUM ('SUCCESS', 'FAILED');

CREATE TABLE IF NOT EXISTS public.payments (
	id UUID PRIMARY KEY,
	amount NUMERIC(10,2) NOT NULL,
	status payment_status_enum NOT NULL,
	booking_id INTEGER NOT NULL REFERENCES public.bookings(id),
	created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);