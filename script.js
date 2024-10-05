
// Access the RESULTS_MAP from content.js
// The quiz answers are stored here
const currentAnswer = {
    'one': '',
    'two': '',
    'three': ''
};

// Function to handle unchecking a previously selected option
function changeToUnchecked(questionName) {
    const id = currentAnswer[questionName];
    const selector = "[data-choice-id='" + id + "']";
    const items = document.querySelectorAll(selector);

    for (let item of items) {
        if (item.dataset.questionId === questionName) {
            const image = item.querySelector('.checkbox');
            image.src = 'images/unchecked.png';
            item.style.backgroundColor = '#f4f4f4';
        }
    }
}

// Function to reduce opacity of unselected items in the same question
function changeOpacity(question, selectedItem) {
    const items = document.querySelectorAll(`[data-question-id='${question}']`);

    for (let item of items) {
        if (item !== selectedItem) {
            item.style.opacity = '0.6';
        }
    }
}

// Refresh the page to restart the quiz
function refreshWeb() {
    document.location.href = "index.html";
}

// Lock the answers once all three questions have been answered
function lockToAnswer() {
    if (currentAnswer['one'] && currentAnswer['two'] && currentAnswer['three']) {
        // Disable event listeners after the user finishes the quiz
        const items = document.querySelectorAll('.choice-grid div');
        for (let item of items) {
            item.removeEventListener('click', changeToChecked);
        }

        // Display the result based on the answers
        const output = document.querySelector('.result');
        const outputTitle = document.querySelector('#result-title');
        const outputContent = document.querySelector('#result-contents');

        // Determine the result based on user selections
        if (currentAnswer['two'] === currentAnswer['three']) {
            outputTitle.innerHTML = "You got: " + RESULTS_MAP[currentAnswer['two']].title;
            outputContent.innerHTML = RESULTS_MAP[currentAnswer['two']].contents;
        } else {
            outputTitle.innerHTML = "You got: " + RESULTS_MAP[currentAnswer['one']].title;
            outputContent.innerHTML = RESULTS_MAP[currentAnswer['one']].contents;
        }

        // Show the result section
        output.style.display = 'block';

        // Add an event listener for the restart button
        const restartBtn = document.querySelector('#restart-quiz');
        restartBtn.addEventListener('click', refreshWeb);
    }
}

// Change the item to the checked state when selected
function changeToChecked(event) {
    const item = event.currentTarget;
    const image = item.querySelector('.checkbox');
    image.src = 'images/checked.png';
    item.style.backgroundColor = '#cfe3ff';
    item.style.opacity = '1';

    const questionId = item.dataset.questionId;

    // Uncheck the previous selection if any
    if (currentAnswer[questionId]) {
        changeToUnchecked(questionId);
    }

    // Save the current answer and lock the choices once all questions are answered
    currentAnswer[questionId] = item.dataset.choiceId;
    changeOpacity(questionId, item);
    lockToAnswer();
}

// Main function to initialize event listeners on each quiz option
function initializeQuiz() {
    const items = document.querySelectorAll('.choice-grid div');
    
    for (let item of items) {
        item.addEventListener('click', changeToChecked);
    }
}

// Start the quiz functionality
initializeQuiz();