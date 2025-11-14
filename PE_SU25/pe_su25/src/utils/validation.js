// Validation utility functions

export const validateBookingForm = (formData) => {
  const errors = {};

  if (!formData.userId) {
    errors.userId = 'User is required';
  }

  if (!formData.movieId) {
    errors.movieId = 'Movie is required';
  }

  if (!formData.showTime) {
    errors.showTime = 'Show time is required';
  }

  if (!formData.seats || parseInt(formData.seats) <= 0) {
    errors.seats = 'Seats must be at least 1';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateRequired = (value) => {
  return value && value.toString().trim() !== '';
};

export const validateMinValue = (value, min) => {
  return Number(value) >= min;
};
