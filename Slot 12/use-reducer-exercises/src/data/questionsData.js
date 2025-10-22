// questionsData.js - Dữ liệu câu hỏi cho quiz
export const questionsData = [
  {
    id: 1,
    question: "What is the capital of Australia?",
    options: ["Sydney", "Canberra", "Melbourne", "Perth"],
    answer: "Canberra",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
    category: "Science",
    difficulty: "Easy"
  },
  {
    id: 3,
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Pacific Ocean",
      "Arctic Ocean",
    ],
    answer: "Pacific Ocean",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    id: 4,
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    answer: "Au",
    category: "Science",
    difficulty: "Medium"
  },
  {
    id: 5,
    question: "Which year did World War II end?",
    options: ["1944", "1945", "1946", "1947"],
    answer: "1945",
    category: "History",
    difficulty: "Medium"
  },
  {
    id: 6,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    answer: "Leonardo da Vinci",
    category: "Art",
    difficulty: "Easy"
  },
  {
    id: 7,
    question: "What is the speed of light in vacuum?",
    options: ["299,792,458 m/s", "300,000,000 m/s", "299,000,000 m/s", "298,792,458 m/s"],
    answer: "299,792,458 m/s",
    category: "Physics",
    difficulty: "Hard"
  },
  {
    id: 8,
    question: "Which programming language was created by Brendan Eich?",
    options: ["Python", "Java", "JavaScript", "C++"],
    answer: "JavaScript",
    category: "Technology",
    difficulty: "Medium"
  },
  {
    id: 9,
    question: "What is the smallest country in the world?",
    options: ["Monaco", "Nauru", "Vatican City", "San Marino"],
    answer: "Vatican City",
    category: "Geography",
    difficulty: "Medium"
  },
  {
    id: 10,
    question: "In which year was React.js first released?",
    options: ["2011", "2013", "2015", "2017"],
    answer: "2013",
    category: "Technology",
    difficulty: "Hard"
  }
];

// Hàm utility để lấy câu hỏi theo category
export const getQuestionsByCategory = (category) => {
  return questionsData.filter(q => q.category === category);
};

// Hàm utility để lấy câu hỏi theo difficulty
export const getQuestionsByDifficulty = (difficulty) => {
  return questionsData.filter(q => q.difficulty === difficulty);
};

// Hàm utility để lấy random questions
export const getRandomQuestions = (count = 5) => {
  const shuffled = [...questionsData].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Hàm utility để lấy categories duy nhất
export const getCategories = () => {
  return [...new Set(questionsData.map(q => q.category))];
};

// Hàm utility để lấy difficulties duy nhất
export const getDifficulties = () => {
  return [...new Set(questionsData.map(q => q.difficulty))];
};