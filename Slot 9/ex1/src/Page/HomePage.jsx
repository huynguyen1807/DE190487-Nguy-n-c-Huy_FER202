import React from "react";
import { Container, Row } from "react-bootstrap";
import HomeCarousel from "../Components/Carousel/HomeCarousel";
import MovieCard from "../Components/MovieCard";
import { movies } from "../data/movies";

export default function HomePage() {
    return (
        <div>
            <HomeCarousel />
            
            {/* Featured Movies Collections Section */}
            <Container className="mt-5">
                <div className="text-center mb-4">
                    <h2 className="display-6 fw-bold text-primary">Featured Movies Collections</h2>
                    <p className="lead text-secondary">
                        Khám phá bộ sưu tập phim đặc sắc với những tác phẩm điện ảnh hấp dẫn nhất
                    </p>
                </div>
                
                <Row>
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </Row>
            </Container>
        </div>
    );
}