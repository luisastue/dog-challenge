import * as Constants from '../constants';
import { createReducer } from '@reduxjs/toolkit'

const initialState = {
    memoryDogs: [],
    loading: false,
    error: null
};

const dogState = createReducer(initialState, (builder) => {
    builder
        .addCase(Constants.GET_DOG_REQUEST, (state, action) => {
            state.loading = true
        })
        .addCase(Constants.GET_DOG_SUCCESS, (state, action) => {
            let dogs = action.payload;
            dogs = dogs.concat(action.payload);
            //shuffle the array
            dogs = dogs.sort(() => Math.random() - 0.5)
            state.memoryDogs = dogs
            state.loading = false
        })
        .addCase(Constants.GET_DOG_FAILURE, (state, action) => {
            state.error = action.payload
            state.loading = false
        })
})


export default dogState;
