import React, { useContext } from 'react';
import { Modal, Button, Row, Col, Badge } from 'react-bootstrap';
import { useMovieState } from '../contexts/MovieContext';

const MovieDetails = ({ show, handleClose, movie }) => {
  const { genres } = useMovieState();

  if (!movie) return null;

  const getGenreName = (genreId) => {
    const genre = genres.find(g => g.id === genreId);
    return genre ? genre.name : 'Không xác định';
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="fas fa-film me-2"></i>
          Chi tiết phim
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={4}>
            <img 
              src={movie.poster || 'https://via.placeholder.com/300x450/cccccc/666666?text=No+Image'} 
              alt={movie.title}
              className="img-fluid rounded shadow"
              style={{ width: '100%', height: 'auto' }}
            />
          </Col>
          <Col md={8}>
            <h4 className="mb-3">{movie.title}</h4>
            
            <div className="mb-3">
              <strong>Mô tả:</strong>
              <p className="mt-1">{movie.description || 'Chưa có mô tả'}</p>
            </div>

            <Row className="mb-2">
              <Col sm={6}>
                <strong>Thể loại:</strong>
                <br />
                <Badge bg="primary" className="mt-1">
                  {getGenreName(movie.genreId)}
                </Badge>
              </Col>
              <Col sm={6}>
                <strong>Năm phát hành:</strong>
                <br />
                <span className="text-muted">{movie.year}</span>
              </Col>
            </Row>

            <Row className="mb-2">
              <Col sm={6}>
                <strong>Quốc gia:</strong>
                <br />
                <span className="text-muted">{movie.country}</span>
              </Col>
              <Col sm={6}>
                <strong>Thời lượng:</strong>
                <br />
                <span className="text-muted">{movie.duration} phút</span>
              </Col>
            </Row>

            <div className="mt-4 p-3 bg-light rounded">
              <Row>
                <Col>
                  <small className="text-muted">
                    <i className="fas fa-info-circle me-1"></i>
                    Thông tin chi tiết về bộ phim "{movie.title}"
                  </small>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          <i className="fas fa-times me-2"></i>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MovieDetails;