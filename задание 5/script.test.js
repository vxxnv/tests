const { createPoll, vote, polls } = require('./script');

describe('Тесты приложения опросов', () => {
  beforeEach(() => {
    polls.length = 0;
  });

  it('должен создавать новый опрос', () => {
    createPoll('Какой твой любимый цвет?', ['Красный', 'Синий']);
    expect(polls.length).toBe(1);
    expect(polls[0].question).toBe('Какой твой любимый цвет?');
    expect(polls[0].options.length).toBe(2);
    expect(polls[0].options[0].text).toBe('Красный');
    expect(polls[0].options[0].votes).toBe(0);
  });

  it('должен голосовать за вариант в опросе', () => {
    createPoll('Какой твой любимый цвет?', ['Красный', 'Синий']);
    const pollId = polls[0].id;
    vote(pollId, 0);
    expect(polls[0].options[0].votes).toBe(1);
  });

  it('не должен голосовать, если опроса не существует', () => {
    vote('nonexistent-id', 0);
    expect(polls.length).toBe(0); 
  });


  it('не должен голосовать, если индекс варианта вне диапазона', () => {
    createPoll('Вопрос', ['Вариант 1']);
    const pollId = polls[0].id;
    vote(pollId, 1);
    expect(polls[0].options[0].votes).toBe(0); 
  });


  it('должен обрабатывать несколько опросов и голосов', () => {
    createPoll('Вопрос 1', ['Вариант A', 'Вариант B']);
    createPoll('Вопрос 2', ['Вариант X', 'Вариант Y']);

    vote(polls[0].id, 0);
    vote(polls[0].id, 0);
    vote(polls[1].id, 1);

    expect(polls[0].options[0].votes).toBe(2);
    expect(polls[0].options[1].votes).toBe(0);
    expect(polls[1].options[0].votes).toBe(0);
    expect(polls[1].options[1].votes).toBe(1);
  });
});