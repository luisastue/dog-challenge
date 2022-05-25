import * as Constants from '../constants';
import { createReducer } from '@reduxjs/toolkit'
import { getBreedFromImage } from '../../helpers/dataAnalyzer';

const initialState = {
    memoryDogs: [],
    gameIsRunning: false,
    revealedDogs: [],
    loading: false,
    error: null
};

const gameReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(Constants.START_GAME, (state, action) => {
            let dogs = action.payload.map((dog, index) => {
                return {
                    ...dog,
                    id: index,
                    isInGame: true,
                }
            })
            console.log(dogs)
            dogs = dogs.concat(dogs);
            //shuffle the array
            dogs = dogs.sort(() => Math.random() - 0.5)
            state.memoryDogs = dogs
            state.gameIsRunning = true;
        })

        .addCase(Constants.END_GAME, (state) => {
            state.memoryDogs = []
            state.revealedDogs = []
            state.gameIsRunning = false;
        })
        
        .addCase(Constants.REMOVE_DOG_PAIR, (state, action) => {
            let removed = {}
            state.memoryDogs = state.memoryDogs.map((dog)=> {
                if (dog.id === action.payload) {
                    removed = {
                        ...dog,
                        isInGame: false,
                    } 
                    return removed
                } else return dog
            })
            state.revealedDogs = [...state.revealedDogs, removed]
        })
})


export default gameReducer;
