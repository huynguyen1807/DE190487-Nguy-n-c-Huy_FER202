import MovieCard from '../components/Movie/MovieCard.jsx';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {movies, allGenres} from '../data/movies.js';
  
export default function MoviePage() {
  return (
    <Container className="my-4">
      <h2 className='mb-3'>My Movies</h2> 
      <Row xs={1} md={2} lg={3} className="g-4"> 
        {movies.map((movie) => (
          <Col key={movie.id}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>  
    </Container>
  );
}