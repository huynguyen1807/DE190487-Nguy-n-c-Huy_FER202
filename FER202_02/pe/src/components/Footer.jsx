import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-secondary text-white mt-5 py-3">
            <Container>
                <div className="text-center">
                    <p className="mb-0">
                        © 2025 PersonalBudget Demo. Built with React, Reducer & JSON Server by DNH
                    </p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
