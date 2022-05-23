import dogApi from '../../helpers/dogApi';
import * as Constants from '../constants';

const getDogRequest = (request) => ({
    type: Constants.GET_DOG_REQUEST,
    payload: request,
});

const getDogSuccess = (response) => ({
    type: Constants.GET_DOG_SUCCESS,
    payload: response,
});

const getDogFailure = (error) => ({
    type: Constants.GET_DOG_FAILURE,
    payload: error,
});

/**
 * sends a get Request to dog api to get all dogs
 * @dispatches {@link getDogRequest} on get request start with
 * @dispatches {@link getDogSuccess} on get success with response payload
 * @dispatches {@link getDogFailure} on get failure with error payload
 */
export const getRandomDogs = (nrOfDogs) => (dispatch, getState) => {
    const url = '/breeds/image/random/'+nrOfDogs
    dispatch(getDogRequest(url));

    dogApi()
        .get(url)
        .catch((error) => {
            console.warn('error getting dogs');
            dispatch(getDogFailure(error));
        })
        .then((response) => {
            dispatch(getDogSuccess(response.data.message));
        });
};

export const removeDogPair = (id) => (dispatch) => {
    console.log("removing ", id)
    dispatch({
        type: Constants.REMOVE_DOG_PAIR,
        payload: id
    })
}

