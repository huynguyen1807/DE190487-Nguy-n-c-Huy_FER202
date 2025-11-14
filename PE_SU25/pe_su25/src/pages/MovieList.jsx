import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getMovies } from '../services/api';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      console.log('Fetching movies from API...');
      const data = await getMovies();
      console.log('Movies received:', data);
      
      // Sort by rating descending
      const sortedMovies = data.sort((a, b) => b.rating - a.rating);
      setMovies(sortedMovies);
      setFilteredMovies(sortedMovies);

      // Extract unique genres and years
      const uniqueGenres = [...new Set(data.map(movie => movie.genre))];
      const uniqueYears = [...new Set(data.map(movie => movie.releaseYear))].sort((a, b) => b - a);
      setGenres(uniqueGenres);
      setYears(uniqueYears);
      setError(null);
    } catch (error) {
      console.error('Error loading movies:', error);
      setError('Failed to load movies. Please make sure JSON Server is running on port 9999.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    filterMovies();
  }, [selectedGenre, selectedYear, searchTitle, movies]);

  const filterMovies = () => {
    let filtered = [...movies];

    // Filter by genre
    if (selectedGenre) {
      filtered = filtered.filter(movie => movie.genre === selectedGenre);
    }

    // Filter by year
    if (selectedYear) {
      filtered = filtered.filter(movie => movie.releaseYear === parseInt(selectedYear));
    }

    // Filter by title (startsWith)
    if (searchTitle) {
      filtered = filtered.filter(movie => 
        movie.title.toLowerCase().startsWith(searchTitle.toLowerCase())
      );
    }

    setFilteredMovies(filtered);
  };

  const handleBookTicket = () => {
    navigate('/booking/create');
  };

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">Movie List</h1>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && (
        <>
          {/* Filter Section */}
          <Row className="mb-4">
        <Col md={3}>
          <Form.Select 
            value={selectedGenre} 
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Enter title to search"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Button 
            variant="success" 
            className="w-100"
            onClick={handleBookTicket}
          >
            Book Ticket
          </Button>
        </Col>
      </Row>

      {/* Movie Cards */}
      <Row>
        {filteredMovies.map(movie => (
          <Col key={movie.id} md={3} className="mb-4">
            <Card className="h-100">
              <Card.Img 
                variant="top" 
                src={`/images/${movie.poster}`} 
                alt={movie.title}
                style={{ height: '300px', objectFit: 'cover', backgroundColor: '#f0f0f0' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x450?text=' + encodeURIComponent(movie.title);
                }}
              />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                  <strong>Genre:</strong> {movie.genre}<br />
                  <strong>Release year:</strong> {movie.releaseYear}<br />
                  <strong>Duration:</strong> {movie.duration}<br />
                  <strong>Rating:</strong> {movie.rating}<br />
                  <strong>Booked:</strong> {movie.booked}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
        </>
      )}
    </Container>
  );
};

export default MovieList;
