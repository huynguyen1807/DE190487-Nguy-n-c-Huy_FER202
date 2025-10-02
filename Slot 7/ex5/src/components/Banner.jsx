export default function Banner() {
    return (
        <div className="bg-gradient" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center text-white py-5">
                        <h1 className="display-3 fw-bold mb-3">Welcome to EX3!</h1>
                        <p className="lead mb-4">Dự án React thứ 3 với Bootstrap integration hoàn chỉnh</p>
                        <div className="d-flex justify-content-center gap-3">
                            <button className="btn btn-light btn-lg">Get Started</button>
                            <button className="btn btn-outline-light btn-lg">Learn More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}