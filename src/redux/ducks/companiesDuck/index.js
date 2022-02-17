import { createAction } from '../../../helper/redux-helper';

const SET_COMPANIES = 'companiesDuck/SET_COMPANIES';
const ADD_COMPANY = 'eventDuck/ADD_COMPANY';

export const setCompanies = createAction(SET_COMPANIES);
export const addCompany = createAction(ADD_COMPANY);

const initialState = {
    companies: [{ companies_detail: {} }],
};

const CompaniesDuck = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_COMPANIES:
            return { ...state, companies: [...payload] };
        case ADD_COMPANY:
            return { ...state, companies: [...state.companies, payload] };
        default:
            return state;
    }
};

export default CompaniesDuck;
