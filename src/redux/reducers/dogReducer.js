import * as Constants from '../constants';
import { createReducer } from '@reduxjs/toolkit'
import { getBreedFromImage, getBreedFromPath } from '../../helpers/dataAnalyzer';

const initialState = {
    dogsByBreed: {},
    randomDogs: [],
    filters: [],
    loading: false,
    error: null
};

const dogReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(Constants.GET_DOGS_REQUEST, (state, action) => {
            state.loading = true
        })
        .addCase(Constants.GET_DOGS_BY_BREED_SUCCESS, (state, action) => {
            const {breed, subBreed} = getBreedFromPath(action.payload.path);
            state.dogsByBreed[action.payload.path] = action.payload.dogs.map((dogImage, index) => {
                return {
                    image: dogImage,
                    breed: breed,
                    subBreed: subBreed,
                    path: action.payload.path,
                }
            })
            state.loading = false

        })
        .addCase(Constants.GET_RANDOM_DOGS_SUCCESS, (state, action) => {
            state.randomDogs = action.payload.map((dogImage, index) => {
                let {breed, subBreed, path} = getBreedFromImage(dogImage);
                return {
                    image: dogImage,
                    breed: breed,
                    subBreed: subBreed,
                    path: path,
                }
            })
            state.loading = false
        })
        .addCase(Constants.GET_DOGS_FAILURE, (state, action) => {
            state.error = action.payload
            state.loading = false
        })
        .addCase(Constants.SET_FILTERS, (state, action) => {
            const newFilters = Object.keys(action.payload)
            state.filters.map(breed => {
                if(!newFilters.includes(breed)) delete state.dogsByBreed[breed]
            })
            state.filters = newFilters
        })
})


export default dogReducer;
