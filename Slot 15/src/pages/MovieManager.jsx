import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { MovieProvider } from '../contexts/MovieContext';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';
import { useAuthState } from '../contexts/AuthContext';
import MovieForm from '../components/MovieForm';
import MovieTable from '../components/MovieTable';
import FilterBar from '../components/FilterBar';

const MovieManagerContent = () => {
  const { showModal, movies } = useMovieState();
  const { dispatch } = useMovieDispatch();
  const { user } = useAuthState();

  const handleOpenModal = () => {
    dispatch({ type: 'RESET_FORM' });
    dispatch({ type: 'OPEN_MODAL' });
  };

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h2>🎬 Quản lý Phim</h2>
            {user && user.role === 'admin' && (
              <Button variant="success" onClick={handleOpenModal}>
                <i className="fas fa-plus me-2"></i>
                Thêm phim mới
              </Button>
            )}
          </div>
        </Col>
      </Row>

      {/* FilterBar Component */}
      <Row className="mb-4">
        <Col>
          <FilterBar />
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="mb-3">
            <small className="text-muted">
              Tổng số phim: <strong>{movies.length}</strong>
              {user && (
                <>
                  {' | '}
                  Vai trò: <strong>{user.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}</strong>
                </>
              )}
            </small>
          </div>
          <MovieTable />
        </Col>
      </Row>

      <MovieForm show={showModal} />
    </Container>
  );
};

const MovieManager = () => (
  <MovieProvider>
    <MovieManagerContent />
  </MovieProvider>
);

export default MovieManager;
