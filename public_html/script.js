const quizData = [
  {
    question: 'What is the biggest city in Catalonia?',
    options: ['Tarragona', 'Girona', 'Barcelona', 'Zaragoza'],
    answer: 'Barcelona'
  },
  {
    question: 'What is the typical food of Catalonia?',
    options: ['Bread with tomato', 'Chesee', 'Paella', 'Seafood'],
    answer: 'Bread with tomato'
  },
  {
    question: 'How many official languages are there in Catalonia?',
    options: ['1', '6', '3', '5'],
    answer: '3'
  },
  {
    question: 'Where is the Sagrada Familia located?',
    options: ['Mataro', 'Sabadell', 'Badalona', 'Barcelona'],
    answer: 'Barcelona'
  },
  {
    question: 'Which city in Catalonia has a museum dedicated to cinema?',
    options: [
      'Figueras',
      'Girona',
      'Terrasa',
      'Sitges'
    ],
    answer: 'Girona'
  },
  {
    question: 'Where does Sheri drink come from?',
    options: ['France', 'Italy', 'Germany', 'Spain'],
    answer: 'Spain'
  },
  {
    question: 'Who painted the picture "Kiss"?',
    options: [
      'Pablo Picasso',
      'Vincent van Gogh',
      'Juan Miro',
      'Salvador Dali'
    ],
    answer: 'Pablo Picasso'
  },
  {
    question: 'Who designed the Chupa Chups logo?',
    options: ['Salvador Dali', 'Diego Velasquez', 'El Greco', 'Francisco José de Goya'],
    answer: 'Salvador Dali'
  },
  {
    question: 'What is the oldest city in europe?',
    options: [
      'Lion',
      'Cadiz',
      'Paris',
      'Madrid'
    ],
    answer: 'Cadiz'
  },
  {
    question: 'Who is the first Spanish actor to win an Oscar?',
    options: ['Javier Bardem', 'Mario Casas', 'Antonio Banderas', 'Penelope Cruz'],
    answer: 'Javier Bardem'
  }
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();