
let polls = [];

function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function createPoll(question, options) {
  const poll = {
    id: generateId(),
    question: question,
    options: options.map(option => ({ text: option, votes: 0 })),
  };
  polls.push(poll);
  renderPolls();
}


function vote(pollId, optionIndex) {
  const poll = polls.find(poll => poll.id === pollId);
  if (poll) {
    poll.options[optionIndex].votes++;
    renderPolls();
  }
}


function renderPolls() {
  const pollList = document.getElementById('poll-list');
  pollList.innerHTML = '';

  polls.forEach(poll => {
    const pollItem = document.createElement('li');
    pollItem.innerHTML = `
      <h3>${poll.question}</h3>
      <div class="poll-options">
        ${poll.options.map((option, index) => `
          <button data-poll-id="${poll.id}" data-option-index="${index}">${option.text} (${option.votes} votes)</button>
        `).join('')}
      </div>
    `;
    pollList.appendChild(pollItem);
  });

  
  const voteButtons = document.querySelectorAll('.poll-options button');
  voteButtons.forEach(button => {
    button.addEventListener('click', () => {
      const pollId = button.dataset.pollId;
      const optionIndex = parseInt(button.dataset.optionIndex);
      vote(pollId, optionIndex);
    });
  });
}


document.getElementById('create-poll-button').addEventListener('click', () => {
  const question = document.getElementById('poll-question').value;
  const option1 = document.getElementById('poll-option-1').value;
  const option2 = document.getElementById('poll-option-2').value;
  if (question && option1 && option2) {
    createPoll(question, [option1, option2]);
    document.getElementById('poll-question').value = '';
    document.getElementById('poll-option-1').value = '';
    document.getElementById('poll-option-2').value = '';
  } else {
    alert('Пожалуйста, заполните все поля.');
  }
});

renderPolls();

module.exports = {
  createPoll,
  vote,
  polls,
};