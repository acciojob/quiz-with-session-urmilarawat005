//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Retrieve saved user answers from session storage, or initialize to an empty array
let userAnswers = JSON.parse(sessionStorage.getItem('progress')) || [];

// Function to render the questions and choices
function renderQuestions() {
  const questionsElement = document.getElementById("questions");
  questionsElement.innerHTML = ""; // Clear previous content

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");

    // Display the question text
    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionElement.appendChild(questionText);

    // Render choices for each question
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // Preselect the answer if it's saved in sessionStorage
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }

      const choiceLabel = document.createElement("label");
      choiceLabel.textContent = choice;
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceLabel);
      questionElement.appendChild(document.createElement("br")); // Line break between choices
    }

    questionsElement.appendChild(questionElement);
  }
}

// Function to save user answers to sessionStorage
function saveProgress() {
  const answers = [];

  // Store selected answers for each question
  for (let i = 0; i < questions.length; i++) {
    const selectedOption = document.querySelector(`input[name="question-${i}"]:checked`);
    answers[i] = selectedOption ? selectedOption.value : null; // Save the selected answer
  }

  sessionStorage.setItem('progress', JSON.stringify(answers)); // Save to sessionStorage
  userAnswers = answers; // Update local variable to reflect current state
}

// Function to calculate the user's score
function calculateScore() {
  let score = 0;

  // Compare user's answers with the correct answers
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++; // Increase score if the answer is correct
    }
  }

  return score;
}

// Function to handle quiz submission
function handleSubmit() {
  saveProgress(); // Save progress before submitting
  const score = calculateScore();
  document.getElementById("score").innerText = `Your score is ${score} out of 5.`; // Display score

  // Save score to localStorage for future reference
  localStorage.setItem('score', score);
}

// Display last stored score (if any) when the page is loaded
function displayLastScore() {
  const lastScore = localStorage.getItem('score');
  if (lastScore) {
    document.getElementById("score").innerText = `Your last score was: ${lastScore} out of 5.`;
  }
}

// Initialize the quiz when the page loads
window.onload = function () {
  renderQuestions(); // Display the quiz questions
  displayLastScore(); // Display the last saved score
};

// Event listener for the submit button
document.getElementById("submit").addEventListener("click", handleSubmit);

// Event listener to save progress whenever the user changes their selection
document.addEventListener("change", saveProgress);


