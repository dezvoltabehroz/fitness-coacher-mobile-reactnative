import {
    TRAINING_TYPES,
    SUB_TRAINING_TYPES,
    SKILLS_TYPES
} from '../types';
import { TrainingCategoryServices } from '../../services';
import { Alert, Linking, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getSkills = () => {
    return async (dispatch) => {
        TrainingCategoryServices.getSkillsBy()
            .then((response) => {
                console.log(response.data)
                var skills = response.data.skills
                dispatch({ type: SKILLS_TYPES, skills: skills })
            })
            .catch((err) => console.log(err))
    }
};

const categories = () => {
    return (dispatch) => {
        TrainingCategoryServices.allTrainingTypes()
            .then((response) => {
                console.log(response.data.trainingTypes)
                var trainingTypes = response.data.trainingTypes
                dispatch({ type: TRAINING_TYPES, trainingTypes: trainingTypes })
            })
            .catch((err) => console.log(err))

    };
};

const subCategories = (id) => {
    return (dispatch) => {
        TrainingCategoryServices.subCategories(id)
            .then((response) => {
                console.log(response.data.subCategories)
                var subTrainingTypes = response.data.subCategories
                dispatch({ type: SUB_TRAINING_TYPES, subCategories: subTrainingTypes })
            })
            .catch((err) => console.log(err))
    }
};


export const trainingActions = {
    subCategories,
    getSkills,
    categories,
};