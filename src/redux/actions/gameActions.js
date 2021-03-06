import * as Constants from '../constants';

export const startGame = (dogs) => (dispatch) => {
    dispatch({
        type: Constants.START_GAME,
        payload: dogs,
    });
};
export const endGame = () => (dispatch) => {
    dispatch({
        type: Constants.END_GAME,
    });
};

export const removeDogPair = (id) => (dispatch) => {
    dispatch({
        type: Constants.REMOVE_DOG_PAIR,
        payload: id
    })
}
