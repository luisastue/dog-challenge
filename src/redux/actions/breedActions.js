import dogApi from '../../helpers/dogApi';
import * as Constants from '../constants';

const getBreedsRequest = (request) => ({
    type: Constants.GET_BREEDS_REQUEST,
    payload: request,
});

const getBreedsSuccess = (response) => ({
    type: Constants.GET_BREEDS_SUCCESS,
    payload: response,
});

const getBreedsFailure = (error) => ({
    type: Constants.GET_BREEDS_FAILURE,
    payload: error,
});

/**
 * sends a get Request to dog api to get all dogs
 * @dispatches {@link getBreedsRequest} on get request start with
 * @dispatches {@link getBreedsSuccess} on get success with response payload
 * @dispatches {@link getBreedsFailure} on get failure with error payload
 */
export const getAllBreeds = () => (dispatch) => {
    const url = '/breeds/list/all'
    dispatch(getBreedsRequest(url));

    dogApi()
        .get(url)
        .catch((error) => {
            console.warn('error getting breeds');
            dispatch(getBreedsFailure(error));
        })
        .then((response) => {
            dispatch(getBreedsSuccess(response.data.message));
        });
};

