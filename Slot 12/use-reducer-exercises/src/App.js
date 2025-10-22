import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import CounterComponent from './components/CounterComponent';
import ToggleComponent from './components/ToggleComponent';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import QuestionBank from './components/QuestionBank';
import QuestionBankAdvanced from './components/QuestionBankAdvanced';
import QuestionBankConfigurable from './components/QuestionBankConfigurable';

function App() {
  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">useReducer Hook Exercises</h1>
      <Tab.Container id="exercises-tabs" defaultActiveKey="counter">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="counter">Exercise 1: Counter</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="toggle">Exercise 2: Toggle</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="login">Exercise 3: Login Form</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="signup">Exercise 4: SignUp Form</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="quiz">Exercise 5: Quiz Basic</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="quiz-advanced">Exercise 6: Quiz Advanced</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="quiz-configurable">Bonus: Quiz Configurable</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="counter">
                <CounterComponent />
              </Tab.Pane>
              <Tab.Pane eventKey="toggle">
                <ToggleComponent />
              </Tab.Pane>
              <Tab.Pane eventKey="login">
                <LoginForm />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm />
              </Tab.Pane>
              <Tab.Pane eventKey="quiz">
                <QuestionBank />
              </Tab.Pane>
              <Tab.Pane eventKey="quiz-advanced">
                <QuestionBankAdvanced />
              </Tab.Pane>
              <Tab.Pane eventKey="quiz-configurable">
                <QuestionBankConfigurable />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default App;
