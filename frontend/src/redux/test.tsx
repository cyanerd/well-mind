import {createSlice} from '@reduxjs/toolkit';
import {shuffleArray} from '../helper';
import questions from '../questions.json';
import {RootState} from './store';

export const test = createSlice({
  name: 'test',
  initialState: {
    scheme: 0,
    answers: {},
    questions: shuffleArray(questions), //.splice(0, 5),
    currentAnswer: null,
    step: 1,
    mode: 'intro'
  },
  reducers: {
    setAnswer: (state, {payload}) => {
      // @ts-ignore
      state.answers[state.step] = {value: payload, section: state.questions[state.step - 1].section};
    },
    setCurrentAnswer: (state, {payload}) => {
      state.currentAnswer = payload;
    },
    setMode: (state, {payload}) => {
      state.mode = payload;
    },
    setScheme: (state, {payload}) => {
      state.scheme = payload;
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
  currentQuestion: (state: RootState) => state.test.questions[state.test.step - 1]
}

export const {startTest, setMode, nextStep, previousStep, setAnswer, setCurrentAnswer, setScheme} = test.actions;
export default test.reducer;