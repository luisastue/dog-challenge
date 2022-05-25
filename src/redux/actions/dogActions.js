import dogApi from '../../helpers/dogApi';
import * as Constants from '../constants';

const getDogsRequest = (request) => ({
    type: Constants.GET_DOGS_REQUEST,
    payload: request,
});

const getRandomDogsSuccess = (response) => ({
    type: Constants.GET_RANDOM_DOGS_SUCCESS,
    payload: response,
});

const getDogsByBreedSuccess = (response) => ({
    type: Constants.GET_DOGS_BY_BREED_SUCCESS,
    payload: response,
});

const getDogsFailure = (error) => ({
    type: Constants.GET_DOGS_FAILURE,
    payload: error,
});

/**
 * sends a get Request to dog api to get 10 random dogs dogs
 * @dispatches {@link getDogsRequest} on get request start with
 * @dispatches {@link getRandomDogsSuccess} on get success with response payload
 * @dispatches {@link getDogsFailure} on get failure with error payload
 */
export const getRandomDogs = (nrOfDogs) => (dispatch, getState) => {
    const url = '/breeds/image/random/'+nrOfDogs
    dispatch(getDogsRequest(url));

    dogApi()
        .get(url)
        .catch((error) => {
            console.warn('error getting dogs');
            dispatch(getDogsFailure(error));
        })
        .then((response) => {
            dispatch(getRandomDogsSuccess(response.data.message));
        });
};

export const getDogsByBreed = (path, nrOfDogs) => (dispatch, getState) => {
    const url = `/breed/${path}/images/random/${nrOfDogs}`
    dispatch(getDogsRequest(url));

    dogApi()
        .get(url)
        .catch((error) => {
            console.warn('error getting dogs');
            dispatch(getDogsFailure(error));
        })
        .then((response) => {
            dispatch(getDogsByBreedSuccess({
                dogs: response.data.message,
                path: path
            }));
        });
};

export const setFilters = (newFilters) => (dispatch, getState) => {
    const currentFilters = getState().dogState.filters
    console.log("current", currentFilters)
    console.log("new", newFilters)
    const filtersToFetch = Object.keys(newFilters).filter(filter => !currentFilters.includes(filter))
    console.log("to fetch", filtersToFetch)
    
    dispatch({
        type: Constants.SET_FILTERS,
        payload: Object.keys(newFilters),
    })
    filtersToFetch.forEach(filter => dispatch(getDogsByBreed(filter, 10)))
};
