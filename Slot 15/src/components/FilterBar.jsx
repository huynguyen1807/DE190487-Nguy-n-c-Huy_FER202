import React, { useState, useContext } from 'react';
import { Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const FilterBar = () => {
  const { movies, genres, filteredMovies } = useMovieState();
  const { setFilteredMovies } = useMovieDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const applyFilters = () => {
    let filtered = [...movies];

    // Search by title
    if (searchTerm) {
      filtered = filtered.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by genre
    if (selectedGenre) {
      filtered = filtered.filter(movie => movie.genreId === parseInt(selectedGenre));
    }

    // Filter by duration
    if (durationFilter) {
      switch (durationFilter) {
        case 'short':
          filtered = filtered.filter(movie => movie.duration < 100);
          break;
        case 'medium':
          filtered = filtered.filter(movie => movie.duration >= 100 && movie.duration <= 150);
          break;
        case 'long':
          filtered = filtered.filter(movie => movie.duration > 150);
          break;
        default:
          break;
      }
    }

    // Sort by title
    if (sortOrder) {
      filtered.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      });
    }

    setFilteredMovies(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGenre('');
    setDurationFilter('');
    setSortOrder('');
    setFilteredMovies(movies);
  };

  return (
    <div className="filter-bar mb-4 p-3 border rounded">
      <Row className="g-3">
        {/* Search */}
        <Col md={3}>
          <Form.Group>
            <Form.Label>Tìm kiếm phim</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Nhập tên phim..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline-secondary" onClick={applyFilters}>
                <i className="fas fa-search"></i>
              </Button>
            </InputGroup>
          </Form.Group>
        </Col>

        {/* Genre Filter */}
        <Col md={2}>
          <Form.Group>
            <Form.Label>Thể loại</Form.Label>
            <Form.Select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="">Tất cả</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Duration Filter */}
        <Col md={2}>
          <Form.Group>
            <Form.Label>Thời lượng</Form.Label>
            <Form.Select
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value)}
            >
              <option value="">Tất cả</option>
              <option value="short">Ngắn (&lt; 100 phút)</option>
              <option value="medium">Trung bình (100-150 phút)</option>
              <option value="long">Dài (&gt; 150 phút)</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Sort */}
        <Col md={2}>
          <Form.Group>
            <Form.Label>Sắp xếp</Form.Label>
            <Form.Select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Mặc định</option>
              <option value="asc">Tên A-Z</option>
              <option value="desc">Tên Z-A</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Action Buttons */}
        <Col md={3} className="d-flex align-items-end">
          <Button variant="primary" onClick={applyFilters} className="me-2">
            Áp dụng
          </Button>
          <Button variant="outline-secondary" onClick={clearFilters}>
            Xóa bộ lọc
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default FilterBar;