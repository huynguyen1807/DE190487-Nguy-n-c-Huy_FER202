import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import movieApi from '../api/movieAPI';

const ViewDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const [movieResponse, genresResponse] = await Promise.all([
          movieApi.get(`/movies/${id}`),
          movieApi.get('/genres')
        ]);
        
        setMovie(movieResponse.data);
        const foundGenre = genresResponse.data.find(g => g.id === movieResponse.data.genreId);
        setGenre(foundGenre);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <Container className="mt-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container className="mt-4">
        <div className="text-center">
          <h4>Không tìm thấy phim</h4>
          <Button variant="primary" onClick={() => navigate('/movies')}>
            Về danh sách phim
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Button 
            variant="outline-primary" 
            onClick={() => navigate('/movies')}
            className="mb-4"
          >
            <i className="fas fa-arrow-left me-2"></i>
            Back to list
          </Button>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Card>
            <Card.Img 
              variant="top" 
              src={movie.poster || 'https://via.placeholder.com/300x450/cccccc/666666?text=No+Image'} 
              alt={movie.title}
              style={{ height: '500px', objectFit: 'cover' }}
            />
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Header>
              <h2 className="mb-0">{movie.title}</h2>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <h5>Mô tả:</h5>
                <p>{movie.description || 'Chưa có mô tả'}</p>
              </div>

              <Row className="mb-3">
                <Col sm={6}>
                  <strong>Thể loại:</strong>
                  <br />
                  <Badge bg="primary" className="mt-1">
                    {genre ? genre.name : 'Không xác định'}
                  </Badge>
                </Col>
                <Col sm={6}>
                  <strong>Năm phát hành:</strong>
                  <br />
                  <span className="text-muted">{movie.year}</span>
                </Col>
              </Row>

              <Row className="mb-3">
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
                <h6>Thông tin chi tiết</h6>
                <p className="mb-0 text-muted">
                  Đây là trang xem chi tiết cho bộ phim "{movie.title}". 
                  Bạn có thể xem tất cả thông tin về bộ phim này.
                </p>
              </div>
            </Card.Body>
            <Card.Footer>
              <Button 
                variant="primary" 
                onClick={() => navigate('/movies')}
              >
                <i className="fas fa-list me-2"></i>
                Quay lại danh sách
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewDetailsPage;