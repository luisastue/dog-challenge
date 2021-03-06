import * as Constants from '../constants';
import { createReducer } from '@reduxjs/toolkit'

const initialState = {
    breeds: [],
    subBreeds: {},
    loading: false,
    error: null
};

const breedReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(Constants.GET_BREEDS_REQUEST, (state, action) => {
            state.loading = true
        })
        .addCase(Constants.GET_BREEDS_SUCCESS, (state, action) => {
            let breedSubBreedList = {}
            Object.keys(action.payload).map((breed, index) => {
                breedSubBreedList[breed] = {
                    breed: breed,
                    subBreed: null,
                    name: breed.charAt(0).toUpperCase() + breed.slice(1),
                    path: breed,
                }
                action.payload[breed].map((subBreed) => {
                    const path = breed + "/" + subBreed
                    breedSubBreedList[path] = {
                        breed: breed,
                        subBreed: subBreed,
                        name: subBreed.charAt(0).toUpperCase() + subBreed.slice(1) + " " + breed.charAt(0).toUpperCase() + breed.slice(1),
                        path: path
                    }
                })
            })
            state.breeds = breedSubBreedList
            state.subBreeds = action.payload;
            state.loading = false;
        })
        .addCase(Constants.GET_BREEDS_FAILURE, (state, action) => {
            state.error = action.payload
            state.loading = false
        })
})


export default breedReducer;
