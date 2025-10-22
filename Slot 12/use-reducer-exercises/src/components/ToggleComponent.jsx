import React, { useReducer } from 'react';
import { Button, Card, Badge } from 'react-bootstrap';

// 1. Khởi tạo trạng thái ban đầu
const initialState = { 
  isOn: false,
  toggleCount: 0 
};

// 2. Định nghĩa hàm reducer
function toggleReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      return { 
        isOn: !state.isOn,
        toggleCount: state.toggleCount + 1
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function ToggleComponent() {
  // 3. Sử dụng useReducer để quản lý trạng thái
  const [state, dispatch] = useReducer(toggleReducer, initialState);

  // Action handlers
  const toggle = () => dispatch({ type: 'TOGGLE' });
  const reset = () => dispatch({ type: 'RESET' });

  return (
    <Card className="p-4">
      <Card.Body>
        <h2 className="mb-4">Bật/Tắt Trạng Thái</h2>
        
        <div className="text-center mb-4">
          <div 
            className={`p-4 rounded ${state.isOn ? 'bg-success' : 'bg-secondary'}`}
            style={{ 
              width: '200px', 
              height: '100px', 
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '18px',
              fontWeight: 'bold'
            }}
          >
            {state.isOn ? 'BẬT' : 'TẮT'}
          </div>
        </div>

        <div className="text-center mb-3">
          <Badge variant="info" className="p-2">
            Số lần chuyển đổi: {state.toggleCount}
          </Badge>
        </div>

        <div className="text-center">
          <Button 
            variant={state.isOn ? "warning" : "success"}
            size="lg"
            className="me-3"
            onClick={toggle}
          >
            {state.isOn ? 'Tắt' : 'Bật'}
          </Button>
          
          <Button 
            variant="danger"
            size="lg"
            onClick={reset}
            disabled={state.toggleCount === 0}
          >
            Reset
          </Button>
        </div>

        <div className="mt-3 text-center">
          <small className="text-muted">
            Trạng thái hiện tại: <strong>{state.isOn ? 'BẬT' : 'TẮT'}</strong>
          </small>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ToggleComponent;