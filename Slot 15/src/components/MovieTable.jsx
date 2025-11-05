import React, { useState } from 'react';
import { Table, Button, Image, Modal, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';
import { useAuthState } from '../contexts/AuthContext';
import MovieDetails from './MovieDetails';

const MovieTable = () => {
  const state = useMovieState();
  const { user } = useAuthState();
  const { dispatch, confirmDelete } = useMovieDispatch();
  const { movies, filteredMovies, genres, loading, movieToDelete, showDeleteModal } = state;
  const [showDetails, setShowDetails] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

  // Use filteredMovies if available, otherwise use movies
  const displayMovies = filteredMovies && filteredMovies.length >= 0 ? filteredMovies : movies;

  const genreMap = genres.reduce((map, genre) => {
    map[genre.id] = genre.name;
    return map;
  }, {});

  const handleEditClick = (movie) => {
    dispatch({ type: 'OPEN_EDIT_MODAL', payload: movie });
  };

  const handleDeleteClick = (movie) => {
    dispatch({ type: 'OPEN_DELETE_MODAL', payload: movie });
  };

  const handleViewDetails = (movie) => {
    setSelectedMovie(movie);
    setShowDetails(true);
  };

  const handleViewDetailsPage = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <>
      {loading && displayMovies.length === 0 ? (
        <div className="text-center my-4">
          <Spinner animation="border" role="status" variant="primary" className="me-2" />
          <Alert variant="info" className="mt-3">Đang tải dữ liệu phim...</Alert>
        </div>
      ) : (
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              <th>Poster</th>
              <th>ID</th>
              <th>Tên Phim</th>
              <th>Danh mục</th>
              <th>Thời lượng (phút)</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {displayMovies.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  Không có phim nào được tìm thấy
                </td>
              </tr>
            ) : (
              displayMovies.map((movie) => {
                const genreName = genreMap[movie.genreId] || 'Unknown';
                return (
                  <tr key={movie.id}>
                    <td><Image src={movie.poster} alt={movie.title} style={{ width: '50px', height: '50px', objectFit: 'cover' }} rounded /></td>
                    <td>#{movie.id}</td>
                    <td>
                      <strong>{movie.title}</strong>
                      <br />
                      <small className="text-muted">({movie.year})</small>
                    </td>
                    <td>{genreName}</td>
                    <td>{movie.duration} phút</td>
                    <td>
                      <div className="btn-group-vertical" role="group">
                        <Button 
                          variant="info" 
                          size="sm" 
                          onClick={() => handleViewDetails(movie)}
                          className="mb-1"
                        >
                          <i className="fas fa-eye me-1"></i>
                          View Details
                        </Button>
                        
                        <Button 
                          variant="outline-info" 
                          size="sm" 
                          onClick={() => handleViewDetailsPage(movie.id)}
                          className="mb-1"
                        >
                          <i className="fas fa-external-link-alt me-1"></i>
                          View Page
                        </Button>
                        
                        {user?.role === 'admin' && (
                          <>
                            <Button 
                              variant="primary" 
                              size="sm" 
                              onClick={() => handleEditClick(movie)} 
                              className="mb-1"
                            >
                              <i className="fas fa-edit me-1"></i>
                              Sửa
                            </Button>
                            <Button 
                              variant="danger" 
                              size="sm" 
                              onClick={() => handleDeleteClick(movie)}
                            >
                              <i className="fas fa-trash me-1"></i>
                              Xóa
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      )}

      <Modal show={showDeleteModal} onHide={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận Xóa Phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa phim "{movieToDelete?.title}" (ID: {movieToDelete?.id}) không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>Hủy bỏ</Button>
          <Button variant="danger" onClick={() => confirmDelete(movieToDelete.id)}>Xác nhận Xóa</Button>
        </Modal.Footer>
      </Modal>

      <MovieDetails 
        show={showDetails}
        handleClose={() => setShowDetails(false)}
        movie={selectedMovie}
      />
    </>
  );
};

export default MovieTable;
