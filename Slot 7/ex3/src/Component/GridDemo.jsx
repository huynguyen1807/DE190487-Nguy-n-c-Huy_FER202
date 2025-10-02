export default function GridDemo() {
    const boxStyle = {
        backgroundColor: '#c0c0c0',
        border: '1px solid #999',
        padding: '15px',
        minHeight: '60px',
        display: 'flex',
        alignItems: 'center',
        color: '#333',
        fontSize: '14px',
        margin: '0'
    };

    const footerStyle = {
        backgroundColor: '#d1b3a7',
        padding: '15px',
        textAlign: 'center',
        color: '#666',
        fontSize: '18px',
        fontWeight: 'bold',
        marginTop: '0'
    };

    return (
        <div>   
        <div className="container">
            {/* First row */}
            <div className="row g-0">
                <div className="col-6">
                    <div style={boxStyle}>
                        First col
                    </div>
                </div>
                <div className="col-6">
                    <div style={boxStyle}>
                        Second col
                    </div>
                </div>
            </div>
            
            {/* Second row */}
            <div className="row g-0">
                <div className="col-4">
                    <div style={boxStyle}>
                        col
                    </div>
                </div>
                <div className="col-4">
                    <div style={boxStyle}>
                        col
                    </div>
                </div>
                <div className="col-4">
                    <div style={boxStyle}>
                        col
                    </div>
                </div>
            </div>
            
            {/* Third row */}
            <div className="row g-0">
                <div className="col-3">
                    <div style={boxStyle}>
                        col
                    </div>
                </div>
                <div className="col-3">
                    <div style={boxStyle}>
                        col
                    </div>
                </div>
                <div className="col-3">
                    <div style={boxStyle}>
                        col
                    </div>
                </div>
                <div className="col-3">
                    <div style={boxStyle}>
                        col
                    </div>
                </div>
            </div>
            
            
        </div>
        {/* Footer */}
            <div className="row" style={{ padding: '20px 0' }}>
                <div className="col-12">
                    <div style={footerStyle}>
                        Created by ABC!
                    </div>
                </div>
            </div>
        </div>
    );
}