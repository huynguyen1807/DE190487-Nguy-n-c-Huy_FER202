import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

const FilterBar = ({ 
  genres, 
  years, 
  selectedGenre, 
  selectedYear, 
  searchTitle, 
  onGenreChange, 
  onYearChange, 
  onSearchChange,
  onBookTicket 
}) => {
  return (
    <Row className="mb-4">
      <Col md={3}>
        <Form.Select 
          value={selectedGenre} 
          onChange={(e) => onGenreChange(e.target.value)}
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
          onChange={(e) => onYearChange(e.target.value)}
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
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </Col>
      <Col md={2}>
        <Button 
          variant="success" 
          className="w-100"
          onClick={onBookTicket}
        >
          Book Ticket
        </Button>
      </Col>
    </Row>
  );
};

export default FilterBar;
