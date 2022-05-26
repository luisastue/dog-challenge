import * as Constants from '../constants';
import { createReducer } from '@reduxjs/toolkit'
import { getBreedFromImage } from '../../helpers/dataAnalyzer';

const initialState = {
    dogsByBreed: {},
    randomDogs: [],
    filters: [],
    loading: false,
    error: null
};

const getDogObject = (dogImage) => {
    let {breed, subBreed, path} = getBreedFromImage(dogImage);
    return {
        image: dogImage,
        breed: breed,
        subBreed: subBreed,
        path: path,
        id: dogImage.slice(dogImage.lastIndexOf('/')+1),
    }
}

const dogReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(Constants.GET_DOGS_REQUEST, (state, action) => {
            state.loading = true
        })
        .addCase(Constants.GET_DOGS_BY_BREED_SUCCESS, (state, action) => {
            state.dogsByBreed[action.payload.path] = action.payload.dogs.map((dogImage, index) => {
                return getDogObject(dogImage)
            })
            state.loading = false

        })
        .addCase(Constants.GET_RANDOM_DOGS_SUCCESS, (state, action) => {
            state.randomDogs = action.payload.map((dogImage, index) => {
                let dog = getDogObject(dogImage)
                return {...dog, isRandom: true}
            })
            state.loading = false
        })
        .addCase(Constants.GET_DOGS_FAILURE, (state, action) => {
            state.error = action.payload
            state.loading = false
        })
        .addCase(Constants.SET_FILTERS, (state, action) => {
            const newFilters = Object.keys(action.payload)
            state.filters.forEach(breed => {
                if(!newFilters.includes(breed)) delete state.dogsByBreed[breed]
            })
            state.filters = newFilters
        })
})


export default dogReducer;
