import { createAction } from '../../../helper/redux-helper';
import { api } from '../../../api';

const SET_FEEDBACKS = 'feedbackDuck/SET_FEEDBACKS';
const ADD_FEEDBACK = 'feedbackDuck/ADD_FEEDBACK';

export const setFeedbacks = createAction(SET_FEEDBACKS);
export const addFeedback = createAction(ADD_FEEDBACK);

const initialState = {
    feedbacks: [{ feedback_detail: {} }],
};

const FeedbackDuck = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_FEEDBACKS:
            return { ...state, feedbacks: [...payload] };
        case ADD_FEEDBACK:
            return { ...state, feedbacks: [...state.feedbacks, payload] }
        default:
            return state;
    }
};

export default FeedbackDuck;
