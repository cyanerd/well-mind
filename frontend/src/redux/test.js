import {createSlice} from '@reduxjs/toolkit';
import {shuffleArray} from '../helper';
import questions from '../questions.json';

export const test = createSlice({
  name: 'test',
  initialState: {
    answers: {},
    questions: shuffleArray(questions),
    currentAnswer: null,
    step: 1,
    mode: 'intro'
  },
  reducers: {
    setAnswer: (state, {payload}) => {
      state.answers[state.step] = {value: payload, section: state.questions[state.step - 1].section};
    },
    setCurrentAnswer: (state, {payload}) => {
      state.currentAnswer = payload;
    },
    setMode: (state, {payload}) => {
      state.mode = payload;
    },
    nextStep: state => {
      if (state.step > state.questions.length - 1) return;
      state.step += 1;
    },
    previousStep: state => {
      if (state.step <= 1) return;
      state.step -= 1;
    },
    startTest: state => {
      state.answers = {};
      state.step = 1;
      state.mode = 'test';
    }
  }
});

export const getters = {
  currentQuestion: (state) => state.test.questions[state.test.step - 1]
}

export const {startTest, setMode, nextStep, previousStep, setAnswer, setCurrentAnswer} = test.actions;
export default test.reducer;