import * as Constants from '../constants';
import { createReducer } from '@reduxjs/toolkit'

const initialState = {
    memoryDogs: [],
    loading: false,
    error: null
};

const dogReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(Constants.GET_DOG_REQUEST, (state, action) => {
            state.loading = true
        })
        .addCase(Constants.GET_DOG_SUCCESS, (state, action) => {
            let dogs = action.payload.map((dogImage, index) => ({
                image: dogImage, 
                id: index,
                isInGame: true,
            }))
            console.log(dogs)
            dogs = dogs.concat(dogs);
            console.log(dogs)
            //shuffle the array
            dogs = dogs.sort(() => Math.random() - 0.5)
            console.log(dogs)
            state.memoryDogs = dogs
            state.loading = false
        })
        .addCase(Constants.GET_DOG_FAILURE, (state, action) => {
            state.error = action.payload
            state.loading = false
        })
        .addCase(Constants.REMOVE_DOG_PAIR, (state, action) => {
            state.memoryDogs = state.memoryDogs.map(dog => {
                if(dog.id == action.payload) {
                    console.log()
                    return {
                        ...dog, 
                        isInGame: false,
                    }
                } else return dog
            })
        })
})


export default dogReducer;
