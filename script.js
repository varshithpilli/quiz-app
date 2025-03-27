const questions = [
  {
    question: "What is the capital of France?",
    answers: ["London", "Berlin", "Paris", "Madrid"],
    correct: 2
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: 1
  },
  {
    question: "What is the largest mammal in the world?",
    answers: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
    correct: 1
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correct: 2
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: ["Ag", "Fe", "Au", "Cu"],
    correct: 2
  },
  {
    question: "Which is the longest river in the world?",
    answers: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
    correct: 1
  },
  {
    question: "How many bones are there in the adult human body?",
    answers: ["206", "215", "189", "250"],
    correct: 0
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answers: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"],
    correct: 0
  },
  {
    question: "What is the square root of 144?",
    answers: ["10", "12", "14", "16"],
    correct: 1
  },
  {
    question: "Which ocean is the largest by surface area?",
    answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correct: 3
  },
  {
    question: "What is the smallest country in the world by area?",
    answers: ["Monaco", "Vatican City", "Liechtenstein", "San Marino"],
    correct: 1
  },
  {
    question: "Which gas do plants primarily use for photosynthesis?",
    answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correct: 1
  },
  {
    question: "What is the hardest natural substance on Earth?",
    answers: ["Gold", "Iron", "Diamond", "Platinum"],
    correct: 2
  },
  {
    question: "Who discovered gravity after observing a falling apple?",
    answers: ["Galileo Galilei", "Albert Einstein", "Isaac Newton", "Nikola Tesla"],
    correct: 2
  },
  {
    question: "What is the national flower of Japan?",
    answers: ["Lotus", "Cherry Blossom", "Rose", "Sunflower"],
    correct: 1
  },
  {
    question: "How many continents are there on Earth?",
    answers: ["5", "6", "7", "8"],
    correct: 2
  },
  {
    question: "Which is the closest star to Earth?",
    answers: ["Sirius", "Alpha Centauri", "Proxima Centauri", "The Sun"],
    correct: 3
  },
  {
    question: "Who was the first person to walk on the moon?",
    answers: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Michael Collins"],
    correct: 0
  },
  {
    question: "Which instrument has 88 keys?",
    answers: ["Guitar", "Violin", "Piano", "Flute"],
    correct: 2
  }
];


let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft;

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const finalScoreElement = document.getElementById('final-score');

startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', startQuiz);

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  startScreen.classList.add('hidden');
  endScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  scoreElement.textContent = `Score: ${score}`;
  showQuestion();
}

function showQuestion() {
  if (currentQuestion >= questions.length) {
    endQuiz();
    return;
  }

  const question = questions[currentQuestion];
  questionElement.textContent = question.question;
  answersElement.innerHTML = '';

  question.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.className = 'answer-btn';
    button.textContent = answer;
    button.addEventListener('click', () => checkAnswer(index));
    answersElement.appendChild(button);
  });

  startTimer();
}

function startTimer() {
  timeLeft = 15;
  timerElement.textContent = `Time: ${timeLeft}s`;
  
  if (timer) clearInterval(timer);
  
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time: ${timeLeft}s`;
    
    if (timeLeft <= 0) {
      clearInterval(timer);
      moveToNextQuestion();
    }
  }, 1000);
}

function checkAnswer(selectedIndex) {
  clearInterval(timer);
  const correct = questions[currentQuestion].correct;
  const buttons = answersElement.getElementsByClassName('answer-btn');
  
  buttons[correct].classList.add('correct');
  
  if (selectedIndex === correct) {
    score += 100;
    scoreElement.textContent = `Score: ${score}`;
  } else {
    buttons[selectedIndex].classList.add('incorrect');
  }

  Array.from(buttons).forEach(button => {
    button.disabled = true;
  });

  setTimeout(moveToNextQuestion, 1500);
}

function moveToNextQuestion() {
  currentQuestion++;
  showQuestion();
}

function endQuiz() {
  quizScreen.classList.add('hidden');
  endScreen.classList.remove('hidden');
  finalScoreElement.textContent = score;
  clearInterval(timer);
}