import React, { useReducer } from "react";
import { Button, Container, Card, Badge, ProgressBar, Alert, Form, Row, Col } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle, FaClock, FaTrophy, FaCog, FaPlay } from "react-icons/fa";
import { 
  questionsData, 
  getRandomQuestions, 
  getQuestionsByCategory, 
  getQuestionsByDifficulty,
  getCategories,
  getDifficulties 
} from "../data/questionsData";

const initialState = {
  // Quiz configuration
  config: {
    category: 'All',
    difficulty: 'All',
    questionCount: 5,
    timePerQuestion: 10
  },
  
  // Quiz state
  questions: [],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
  showFeedback: false,
  isCorrect: false,
  timeLeft: 10,
  isAnswered: false,
  highScore: parseInt(localStorage.getItem('quizHighScore')) || 0,
  
  // UI state
  showConfig: true,
  isQuizStarted: false
};

function quizReducer(state, action) {
  switch (action.type) {
    case "UPDATE_CONFIG":
      return {
        ...state,
        config: {
          ...state.config,
          [action.field]: action.value
        }
      };

    case "START_QUIZ":
      let filteredQuestions = [...questionsData];
      
      // Filter by category
      if (state.config.category !== 'All') {
        filteredQuestions = getQuestionsByCategory(state.config.category);
      }
      
      // Filter by difficulty
      if (state.config.difficulty !== 'All') {
        filteredQuestions = filteredQuestions.filter(q => q.difficulty === state.config.difficulty);
      }
      
      // Shuffle and take required count
      const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());
      const selectedQuestions = shuffled.slice(0, Math.min(state.config.questionCount, shuffled.length));
      
      return {
        ...state,
        questions: selectedQuestions,
        showConfig: false,
        isQuizStarted: true,
        timeLeft: state.config.timePerQuestion,
        currentQuestion: 0,
        selectedOption: "",
        score: 0,
        showScore: false,
        showFeedback: false,
        isAnswered: false
      };

    case "SELECT_OPTION":
      if (state.isAnswered) return state;
      return { 
        ...state, 
        selectedOption: action.payload,
        isAnswered: true,
        showFeedback: true,
        isCorrect: action.payload === state.questions[state.currentQuestion].answer
      };

    case "NEXT_QUESTION":
      const isLastQuestion = state.currentQuestion + 1 === state.questions.length;
      const newScore = state.isCorrect ? state.score + 1 : state.score;
      const newHighScore = Math.max(newScore, state.highScore);
      
      if (isLastQuestion) {
        localStorage.setItem('quizHighScore', newHighScore.toString());
      }

      return {
        ...state,
        score: newScore,
        currentQuestion: state.currentQuestion + 1,
        selectedOption: "",
        showScore: isLastQuestion,
        showFeedback: false,
        isAnswered: false,
        timeLeft: state.config.timePerQuestion,
        highScore: newHighScore
      };

    case "RESTART_QUIZ":
      return {
        ...initialState,
        highScore: parseInt(localStorage.getItem('quizHighScore')) || 0,
      };

    case "BACK_TO_CONFIG":
      return {
        ...state,
        showConfig: true,
        isQuizStarted: false,
        showScore: false,
        currentQuestion: 0,
        score: 0,
        selectedOption: "",
        showFeedback: false,
        isAnswered: false
      };

    case "TICK_TIMER":
      if (state.timeLeft <= 1 && !state.isAnswered) {
        return {
          ...state,
          timeLeft: 0,
          isAnswered: true,
          showFeedback: true,
          isCorrect: false,
          selectedOption: "Time's up!"
        };
      }
      return {
        ...state,
        timeLeft: state.isAnswered ? state.timeLeft : state.timeLeft - 1
      };

    default:
      return state;
  }
}

function QuestionBankConfigurable() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  
  const { 
    config,
    questions, 
    currentQuestion, 
    selectedOption, 
    score, 
    showScore, 
    showFeedback, 
    isCorrect, 
    timeLeft, 
    isAnswered,
    highScore,
    showConfig,
    isQuizStarted
  } = state;

  // Timer effect
  React.useEffect(() => {
    if (isQuizStarted && !showScore && !showFeedback) {
      const timer = setInterval(() => {
        dispatch({ type: "TICK_TIMER" });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isQuizStarted, showScore, showFeedback, currentQuestion]);

  const handleConfigChange = (field, value) => {
    dispatch({ type: "UPDATE_CONFIG", field, value });
  };

  const handleStartQuiz = () => {
    dispatch({ type: "START_QUIZ" });
  };

  const handleOptionSelect = (option) => {
    if (!isAnswered) {
      dispatch({ type: "SELECT_OPTION", payload: option });
    }
  };

  const handleNextQuestion = () => {
    dispatch({ type: "NEXT_QUESTION" });
  };

  const handleRestartQuiz = () => {
    dispatch({ type: "RESTART_QUIZ" });
  };

  const handleBackToConfig = () => {
    dispatch({ type: "BACK_TO_CONFIG" });
  };

  const getTimerColor = () => {
    if (timeLeft <= 3) return "danger";
    if (timeLeft <= 5) return "warning";
    return "success";
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "Xuất sắc! 🌟";
    if (percentage >= 60) return "Tốt! 👍";
    if (percentage >= 40) return "Khá! 😊";
    return "Cần cố gắng thêm! 💪";
  };

  // Configuration Screen
  if (showConfig) {
    return (
      <Container className="mt-4">
        <Card className="p-4">
          <Card.Body>
            <h2 className="text-center mb-4">
              <FaCog className="me-2" />
              Cấu hình Quiz
            </h2>

            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Chủ đề</Form.Label>
                    <Form.Select
                      value={config.category}
                      onChange={(e) => handleConfigChange('category', e.target.value)}
                    >
                      <option value="All">Tất cả chủ đề</option>
                      {getCategories().map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Độ khó</Form.Label>
                    <Form.Select
                      value={config.difficulty}
                      onChange={(e) => handleConfigChange('difficulty', e.target.value)}
                    >
                      <option value="All">Tất cả mức độ</option>
                      {getDifficulties().map(diff => (
                        <option key={diff} value={diff}>{diff}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Số câu hỏi: {config.questionCount}</Form.Label>
                    <Form.Range
                      min="3"
                      max="10"
                      value={config.questionCount}
                      onChange={(e) => handleConfigChange('questionCount', parseInt(e.target.value))}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Thời gian/câu: {config.timePerQuestion}s</Form.Label>
                    <Form.Range
                      min="5"
                      max="30"
                      step="5"
                      value={config.timePerQuestion}
                      onChange={(e) => handleConfigChange('timePerQuestion', parseInt(e.target.value))}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>

            <Alert variant="info" className="mb-4">
              <strong>Tổng quan:</strong>
              <ul className="mb-0 mt-2">
                <li>Chủ đề: <strong>{config.category}</strong></li>
                <li>Độ khó: <strong>{config.difficulty}</strong></li>
                <li>Số câu: <strong>{config.questionCount} câu</strong></li>
                <li>Thời gian: <strong>{config.timePerQuestion}s/câu</strong></li>
                <li>Điểm cao nhất: <strong>{highScore}</strong></li>
              </ul>
            </Alert>

            <div className="text-center">
              <Button variant="success" size="lg" onClick={handleStartQuiz}>
                <FaPlay className="me-2" />
                Bắt đầu Quiz
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  // Score Screen
  if (showScore) {
    const isNewHighScore = score > (highScore - score);
    
    return (
      <Container className="mt-4">
        <Card className="p-4">
          <div className="text-center">
            <h2 className="mb-4">
              <FaTrophy className="me-2" style={{color: 'gold'}} />
              Kết Quả Quiz
            </h2>
            
            <div className="mb-4">
              <h3>Điểm số: {score} / {questions.length}</h3>
              <h4 className="text-success">{getScoreMessage()}</h4>
              
              {isNewHighScore && score > 0 && (
                <Alert variant="success" className="mt-3">
                  <FaTrophy className="me-2" />
                  Chúc mừng! Bạn đã đạt điểm cao mới!
                </Alert>
              )}
              
              <Badge bg="info" className="mt-2 p-2">
                Điểm cao nhất: {Math.max(score, highScore)} / {questions.length}
              </Badge>
            </div>

            <ProgressBar 
              now={(score / questions.length) * 100} 
              label={`${Math.round((score / questions.length) * 100)}%`}
              className="mb-4"
              variant={score >= questions.length * 0.8 ? "success" : score >= questions.length * 0.6 ? "warning" : "danger"}
            />

            <div className="d-flex gap-3 justify-content-center">
              <Button variant="primary" size="lg" onClick={handleRestartQuiz}>
                Làm lại
              </Button>
              <Button variant="outline-secondary" size="lg" onClick={handleBackToConfig}>
                Cấu hình mới
              </Button>
            </div>
          </div>
        </Card>
      </Container>
    );
  }

  // Quiz Screen
  return (
    <Container className="mt-4">
      <Card className="p-4">
        <div>
          {/* Progress and Timer */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Badge bg="secondary" className="p-2">
              Câu {currentQuestion + 1} / {questions.length}
            </Badge>
            
            <div className="d-flex align-items-center">
              <FaClock className="me-2" />
              <Badge 
                bg={getTimerColor()} 
                className="p-2"
                style={{ fontSize: '14px' }}
              >
                {timeLeft}s
              </Badge>
            </div>
          </div>

          {/* Progress Bar */}
          <ProgressBar 
            now={((currentQuestion + 1) / questions.length) * 100}
            className="mb-4"
            style={{ height: '8px' }}
          />

          {/* Question */}
          <Card className="mb-4" style={{ backgroundColor: '#f8f9fa' }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h4>
                  <Badge bg="primary" className="me-2">{currentQuestion + 1}</Badge>
                  {questions[currentQuestion]?.question}
                </h4>
                <div>
                  <Badge bg="info" className="me-1">{questions[currentQuestion]?.category}</Badge>
                  <Badge bg="warning">{questions[currentQuestion]?.difficulty}</Badge>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Options */}
          <div className="mb-4">
            {questions[currentQuestion]?.options.map((option, index) => {
              let variant = "outline-secondary";
              let disabled = isAnswered;
              
              if (isAnswered && showFeedback) {
                if (option === questions[currentQuestion].answer) {
                  variant = "success";
                } else if (option === selectedOption && !isCorrect) {
                  variant = "danger";
                }
              }

              return (
                <div key={index} className="mb-2">
                  <Button
                    variant={variant}
                    className="w-100 text-start p-3"
                    onClick={() => handleOptionSelect(option)}
                    disabled={disabled}
                    style={{ 
                      borderRadius: '10px',
                      fontSize: '16px'
                    }}
                  >
                    <strong>{String.fromCharCode(65 + index)}.</strong> {option}
                    {isAnswered && showFeedback && option === questions[currentQuestion].answer && (
                      <FaCheckCircle className="float-end text-success mt-1" />
                    )}
                    {isAnswered && showFeedback && option === selectedOption && !isCorrect && (
                      <FaTimesCircle className="float-end text-danger mt-1" />
                    )}
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <Alert variant={isCorrect ? "success" : "danger"} className="mb-4">
              <div className="d-flex align-items-center">
                {isCorrect ? (
                  <FaCheckCircle className="me-2" />
                ) : (
                  <FaTimesCircle className="me-2" />
                )}
                <div>
                  {isCorrect ? (
                    <strong>Chính xác! 🎉</strong>
                  ) : (
                    <div>
                      <strong>Sai rồi! ❌</strong>
                      {selectedOption !== "Time's up!" && (
                        <div>Đáp án đúng là: <strong>{questions[currentQuestion].answer}</strong></div>
                      )}
                      {selectedOption === "Time's up!" && (
                        <div>Hết thời gian! Đáp án đúng là: <strong>{questions[currentQuestion].answer}</strong></div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Alert>
          )}

          {/* Next Button */}
          <Button
            variant="primary"
            size="lg"
            className="w-100"
            disabled={!isAnswered}
            onClick={handleNextQuestion}
          >
            {currentQuestion === questions.length - 1
              ? "Hoàn thành Quiz"
              : "Câu tiếp theo"}
          </Button>

          {/* Score and Back Button */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <Badge bg="info" className="p-2">
              Điểm hiện tại: {score} / {currentQuestion + (isAnswered ? 1 : 0)}
            </Badge>
            <Button variant="outline-secondary" size="sm" onClick={handleBackToConfig}>
              Về cấu hình
            </Button>
          </div>
        </div>
      </Card>
    </Container>
  );
}

export default QuestionBankConfigurable;