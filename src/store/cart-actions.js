import { cartActions } from './cart-slice';
import { uiActions } from './ui-slice';

export const fetchData = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch(
        'https://redux-http-a01a6-default-rtdb.firebaseio.com/cartItems.json'
      );
      const data = await res.json();
      return data;
    };
    try {
      const cartData = await fetchHandler();

      dispatch(cartActions.replaceData(cartData));
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: 'Sending request to fetch data failed',
          type: 'error',
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    //Send state as Sending request
    dispatch(
      uiActions.showNotification({
        open: true,
        message: 'Sending request',
        type: 'warning',
      })
    );
    const sendRequest = async () => {
      const res = await fetch(
        'https://redux-http-a01a6-default-rtdb.firebaseio.com/cartItems.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );

      const data = await res.json();
      //Send state as Request is succesful
      dispatch(
        uiActions.showNotification({
          open: true,
          message: 'Sent request to Database successfully',
          type: 'success',
        })
      );
    };
    try {
      await sendRequest();
    } catch (err) {
      //send state as Error
      dispatch(
        uiActions.showNotification({
          open: true,
          message: 'Sending request failed',
          type: 'error',
        })
      );
    }
  };
};
