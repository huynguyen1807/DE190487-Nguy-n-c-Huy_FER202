// src/pages/HomePage.jsx
import React, { useState, useMemo } from "react";
import { Container } from "react-bootstrap";
import HomeCarousel from "../components/Carousel/HomeCarousel";
import Filter from "../components/Filter/Filter";
import MovieCard from "../components/Movie/MovieCard";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { movies } from "../data/movies";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [sortOption, setSortOption] = useState('title-asc');

  // Filter and sort movies
  const filteredAndSortedMovies = useMemo(() => {
    let filtered = movies.filter(movie => {
      // Search filter
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           movie.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Year filter
      let matchesYear = true;
      switch (yearFilter) {
        case 'before-2000':
          matchesYear = movie.year < 2000;
          break;
        case '2001-2015':
          matchesYear = movie.year >= 2001 && movie.year <= 2015;
          break;
        case 'after-2015':
          matchesYear = movie.year > 2015;
          break;
        default:
          matchesYear = true;
      }

      return matchesSearch && matchesYear;
    });

    // Sort movies
    filtered.sort((a, b) => {
      switch (sortOption) {
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'year-asc':
          return a.year - b.year;
        case 'year-desc':
          return b.year - a.year;
        case 'duration-asc':
          return a.duration - b.duration;
        case 'duration-desc':
          return b.duration - a.duration;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, yearFilter, sortOption]);

  return (
    <div>
      <HomeCarousel />
      <Container className="my-4">
        <Filter 
          onSearchChange={setSearchTerm}
          onYearFilterChange={setYearFilter}
          onSortChange={setSortOption}
        />
        
        <div className="mt-4">
          <h4>Featured Movies Collections ({filteredAndSortedMovies.length} movies)</h4>
          <Row xs={1} md={2} lg={3} className="g-4 mt-2"> 
            {filteredAndSortedMovies.map((movie) => (
              <Col key={movie.id}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
}