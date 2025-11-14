import React from 'react';
import { Card } from 'react-bootstrap';

const MovieCard = ({ movie }) => {
  return (
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
  );
};

export default MovieCard;
