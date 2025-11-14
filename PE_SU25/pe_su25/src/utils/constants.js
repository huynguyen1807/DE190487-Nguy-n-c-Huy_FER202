// Application constants

export const API_BASE_URL = 'http://localhost:9999';

export const ROUTES = {
  MOVIES: '/movies',
  BOOKING_CREATE: '/booking/create',
  HOME: '/'
};

export const ERROR_MESSAGES = {
  FETCH_FAILED: 'Failed to fetch data',
  CREATE_FAILED: 'Failed to create booking',
  REQUIRED_FIELDS: 'All fields are required and seats must be at least 1.',
  INVALID_SEATS: 'Seats must be greater than 0'
};

export const SUCCESS_MESSAGES = {
  BOOKING_CREATED: 'Booking successful'
};
