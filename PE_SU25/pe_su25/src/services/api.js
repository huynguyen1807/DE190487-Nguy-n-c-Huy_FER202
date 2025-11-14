import axios from 'axios';

const API_URL = 'http://localhost:9999';

// Get all movies
export const getMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}/movies`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

// Get all users
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Create a new booking
export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${API_URL}/bookings`, bookingData);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

// Update movie booked count
export const updateMovieBooked = async (movieId, bookedCount) => {
  try {
    const response = await axios.patch(`${API_URL}/movies/${movieId}`, {
      booked: bookedCount
    });
    return response.data;
  } catch (error) {
    console.error('Error updating movie booked count:', error);
    throw error;
  }
};

// Get a single movie by ID
export const getMovieById = async (movieId) => {
  try {
    const response = await axios.get(`${API_URL}/movies/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie:', error);
    throw error;
  }
};
