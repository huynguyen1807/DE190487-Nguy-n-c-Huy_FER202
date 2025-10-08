import React, { useState } from 'react';
import { Card, Col, Badge, Button, Modal, Toast, ToastContainer } from 'react-bootstrap';

const MovieCard = ({ movie }) => {
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);

    // Rút gọn description (tối đa 100 ký tự)
    const truncateDescription = (text, maxLength = 100) => {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    };

    // Thêm vào favorites và lưu localStorage
    const addToFavourites = () => {
        try {
            // Lấy danh sách favorites hiện tại từ localStorage
            const existingFavourites = JSON.parse(localStorage.getItem('favourites') || '[]');
            
            // Kiểm tra xem phim đã có trong favorites chưa
            const isAlreadyFavourite = existingFavourites.some(fav => fav.id === movie.id);
            
            if (!isAlreadyFavourite) {
                // Thêm phim mới vào danh sách
                const updatedFavourites = [...existingFavourites, movie];
                localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
                setShowToast(true);
            } else {
                // Nếu đã có trong favorites, có thể hiển thị thông báo khác
                alert('Movie is already in favourites!');
            }
        } catch (error) {
            console.error('Error saving to favourites:', error);
        }
    };

    // Mở modal chi tiết
    const viewDetails = () => {
        setShowModal(true);
    };

    return (
        <>
            <Col xs={12} md={6} lg={4} className="mb-4">
                <Card className="h-100 shadow-sm movie-card" style={{ transition: 'transform 0.2s' }}>
                    <div className="movie-card-image" style={{ height: '300px', overflow: 'hidden' }}>
                        <Card.Img 
                            variant="top" 
                            src={movie.poster} 
                            alt={`${movie.title} poster`}
                            style={{ 
                                height: '100%', 
                                objectFit: 'cover',
                                transition: 'transform 0.2s'
                            }}
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/300x450/cccccc/666666?text=No+Image';
                            }}
                        />
                    </div>
                    <Card.Body className="d-flex flex-column">
                        <div className="mb-2">
                            <Badge bg="primary" className="me-2">{movie.genre}</Badge>
                            <small className="text-muted">{movie.year} • {movie.country}</small>
                        </div>
                        
                        <Card.Title className="h5 mb-2">{movie.title}</Card.Title>
                        
                        <Card.Text className="text-muted mb-2">
                            {truncateDescription(movie.description)}
                        </Card.Text>
                        
                        <div className="mb-3">
                            <small className="text-muted">
                                <i className="fas fa-clock me-1"></i>
                                {movie.duration} phút
                            </small>
                        </div>
                        
                        <div className="mt-auto">
                            <div className="d-grid gap-2">
                                <Button 
                                    variant="outline-success" 
                                    size="sm"
                                    onClick={addToFavourites}
                                >
                                    <i className="fas fa-heart me-1"></i>
                                    Add to Favourites
                                </Button>
                                <Button 
                                    variant="primary" 
                                    size="sm"
                                    onClick={viewDetails}
                                >
                                    <i className="fas fa-info-circle me-1"></i>
                                    View Details
                                </Button>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>

            {/* Modal chi tiết phim */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{movie.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-4">
                            <img 
                                src={movie.poster} 
                                alt={`${movie.title} poster`}
                                className="img-fluid rounded"
                                style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/300x450/cccccc/666666?text=No+Image';
                                }}
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="mb-3">
                                <Badge bg="primary" className="me-2">{movie.genre}</Badge>
                                <span className="text-muted">{movie.year} • {movie.country} • {movie.duration} phút</span>
                            </div>
                            
                            <h6>Mô tả:</h6>
                            <p className="text-muted mb-3">{movie.fullDescription}</p>
                            
                            <h6>Suất chiếu:</h6>
                            <div className="mb-3">
                                {movie.showtimes.map((time, index) => (
                                    <Badge 
                                        key={index} 
                                        bg="secondary" 
                                        className="me-2 mb-1"
                                        style={{ fontSize: '0.9rem', padding: '0.5rem 0.8rem' }}
                                    >
                                        {time}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success" onClick={addToFavourites}>
                        <i className="fas fa-heart me-1"></i>
                        Add to Favourites
                    </Button>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Toast notification */}
            <ToastContainer position="top-end" className="p-3">
                <Toast 
                    show={showToast} 
                    onClose={() => setShowToast(false)} 
                    delay={3000} 
                    autohide
                    bg="success"
                >
                    <Toast.Header>
                        <strong className="me-auto">
                            <i className="fas fa-check-circle me-1"></i>
                            Success
                        </strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">
                        Added to favourites!
                    </Toast.Body>
                </Toast>
            </ToastContainer>

            <style jsx>{`
                .movie-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
                }
                
                .movie-card:hover .movie-card-image img {
                    transform: scale(1.05);
                }
                
                .movie-card {
                    border: none;
                    border-radius: 12px;
                    overflow: hidden;
                }
                
                .movie-card-image {
                    border-radius: 12px 12px 0 0;
                }
            `}</style>
        </>
    );
};

export default MovieCard;