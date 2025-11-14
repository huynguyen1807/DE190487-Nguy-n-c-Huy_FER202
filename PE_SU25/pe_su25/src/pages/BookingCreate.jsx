import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getUsers, getMovies, createBooking, updateMovieBooked, getMovieById } from '../services/api';

const BookingCreate = () => {
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [formData, setFormData] = useState({
    userId: '',
    movieId: '',
    showTime: '',
    seats: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchMovies();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const fetchMovies = async () => {
    try {
      const data = await getMovies();
      setMovies(data);
    } catch (error) {
      console.error('Error loading movies:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields are filled
    if (!formData.userId || !formData.movieId || !formData.showTime || !formData.seats) {
      setError('All fields are required and seats must be at least 1.');
      return;
    }

    // Validate seats > 0
    if (parseInt(formData.seats) <= 0) {
      setError('All fields are required and seats must be at least 1.');
      return;
    }

    try {
      // Create booking
      const bookingData = {
        userId: parseInt(formData.userId),
        movieId: parseInt(formData.movieId),
        showTime: formData.showTime,
        seats: parseInt(formData.seats)
      };
      
      await createBooking(bookingData);

      // Update movie booked count
      const movie = await getMovieById(formData.movieId);
      const newBookedCount = movie.booked + 1;
      await updateMovieBooked(formData.movieId, newBookedCount);

      // Show success message
      setSuccess(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/movies');
        window.location.reload();
      }, 2000);

    } catch (error) {
      console.error('Error creating booking:', error);
      setError('Failed to create booking. Please try again.');
    }
  };

  const getSelectedUserName = () => {
    const user = users.find(u => u.id === formData.userId);
    return user ? user.name : '';
  };

  const getSelectedMovieTitle = () => {
    const movie = movies.find(m => m.id === formData.movieId);
    return movie ? movie.title : '';
  };

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">Create Booking</h1>

      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      {success && (
        <Alert variant="info">
          <strong>localhost:3000 says</strong><br />
          Booking successful
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Row className="align-items-center">
          <Col md={2}>
            <Form.Group>
              <Form.Select
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                required
              >
                <option value="">Select User</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={2}>
            <Form.Group>
              <Form.Select
                name="movieId"
                value={formData.movieId}
                onChange={handleChange}
                required
              >
                <option value="">Select Movie</option>
                {movies.map(movie => (
                  <option key={movie.id} value={movie.id}>
                    {movie.title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group>
              <Form.Control
                type="datetime-local"
                name="showTime"
                value={formData.showTime}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group>
              <Form.Control
                type="number"
                name="seats"
                placeholder="Seats"
                value={formData.seats}
                onChange={handleChange}
                min="1"
                required
              />
            </Form.Group>
          </Col>

          <Col md={2}>
            <Button variant="success" type="submit" className="w-100">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Display selected values for preview */}
      {(formData.userId || formData.movieId) && (
        <div className="mt-4">
          <Row>
            <Col md={2}>
              {formData.userId && (
                <div className="border p-2">
                  {getSelectedUserName()}
                </div>
              )}
            </Col>
            <Col md={2}>
              {formData.movieId && (
                <div className="border p-2">
                  {getSelectedMovieTitle()}
                </div>
              )}
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
};

export default BookingCreate;
