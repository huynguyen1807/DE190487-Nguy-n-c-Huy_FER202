import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import "./MovieCard.css";

export default function MovieCard({movie}) {
  const handleAddToFavourite = () => {
    // Sẽ implement sau với Toast notification
    console.log(`Added ${movie.title} to favourites`);
  };

  const handleViewDetails = () => {
    // Sẽ implement sau với Modal
    console.log(`View details for ${movie.title}`);
  };

  return (
    <Card className="movie-card h-100">
      <Card.Img variant="top" src={movie.poster} alt={movie.title} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text className="flex-grow-1">
          {movie.description}
        </Card.Text> 
        <div className="mb-2">
          <div><strong>Genre:</strong> <Badge bg="info" className="text-dark">{movie.genre}</Badge></div>
          <div><strong>Year:</strong> {movie.year}</div>
          <div><strong>Country:</strong> {movie.country}</div>
          <div><strong>Duration:</strong> {movie.duration} mins</div>
        </div>   
        <div className="mt-auto d-flex justify-content-between gap-2">
          <Button variant="primary" onClick={handleViewDetails} size="sm">
            View Details
          </Button>
          <Button variant="outline-warning" size="sm" onClick={handleAddToFavourite}>
            Add to Favourite
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}