import {
    TRAINING_TYPES,
    SUB_TRAINING_TYPES,
    SKILLS_TYPES
} from '../types';

const initialState = {
    trainingTypes: [],
    skills: [],
    subCategories: []
};

const trainingReducer = (state = initialState, action) => {
    switch (action.type) {

        case TRAINING_TYPES:
            console.log("action : ", action);
            return {
                ...state,
                trainingTypes: action.trainingTypes
            };
        case SUB_TRAINING_TYPES:
            console.log("action : ", action);
            return {
                ...state,
                subCategories: action.subCategories
            };
        case SKILLS_TYPES:
            console.log("action : ", action);
            return {
                ...state,
                skills: action.skills
            }
        default:
            return state;
    }
};

export default trainingReducer;
