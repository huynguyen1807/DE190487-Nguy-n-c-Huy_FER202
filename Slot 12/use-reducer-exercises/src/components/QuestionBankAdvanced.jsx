import React, { useReducer, useEffect } from "react";
import { Button, Container, Card, Badge, ProgressBar, Alert } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle, FaClock, FaTrophy } from "react-icons/fa";
import { questionsData, getRandomQuestions } from "../data/questionsData";

const initialState = {
  questions: getRandomQuestions(5), // Lấy 5 câu hỏi ngẫu nhiên
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
  showFeedback: false,
  isCorrect: false,
  timeLeft: 10,
  isAnswered: false,
  highScore: parseInt(localStorage.getItem('quizHighScore')) || 0,
};

function quizReducer(state, action) {
  switch (action.type) {
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
        // Save high score to localStorage
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
        timeLeft: 10,
        highScore: newHighScore
      };

    case "RESTART_QUIZ":
      return {
        ...initialState,
        questions: getRandomQuestions(5), // Lấy câu hỏi ngẫu nhiên mới
        highScore: parseInt(localStorage.getItem('quizHighScore')) || 0,
      };

    case "TICK_TIMER":
      if (state.timeLeft <= 1 && !state.isAnswered) {
        // Time's up, auto-select wrong answer
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

    case "RESET_TIMER":
      return {
        ...state,
        timeLeft: 10
      };

    default:
      return state;
  }
}

// Component chính
function QuestionBankAdvanced() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { 
    questions, 
    currentQuestion, 
    selectedOption, 
    score, 
    showScore, 
    showFeedback, 
    isCorrect, 
    timeLeft, 
    isAnswered,
    highScore 
  } = state;

  // Timer effect
  useEffect(() => {
    if (!showScore && !showFeedback) {
      const timer = setInterval(() => {
        dispatch({ type: "TICK_TIMER" });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showScore, showFeedback, currentQuestion]);

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

  const isNewHighScore = score > (highScore - score);

  return (
    <Container className="mt-4">
      <Card className="p-4">
        {showScore ? (
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

            <Button variant="primary" size="lg" onClick={handleRestartQuiz}>
              Làm lại Quiz
            </Button>
          </div>
        ) : (
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
                <h4>
                  <Badge bg="primary" className="me-2">{currentQuestion + 1}</Badge>
                  {questions[currentQuestion].question}
                </h4>
              </Card.Body>
            </Card>

            {/* Options */}
            <div className="mb-4">
              {questions[currentQuestion].options.map((option, index) => {
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

            {/* Score Display */}
            <div className="text-center mt-3">
              <Badge bg="info" className="p-2">
                Điểm hiện tại: {score} / {currentQuestion + (isAnswered ? 1 : 0)}
              </Badge>
            </div>
          </div>
        )}
      </Card>
    </Container>
  );
}

export default QuestionBankAdvanced;