import { CREATE_INBOX, FETCH_INBOX } from "../constants/actionTypes";

export default (inbox = [], action) => {
  switch (action.type) {
    case FETCH_INBOX:
      return action.payload;

    case CREATE_INBOX:
      return [...inbox, action.payload];

      //   case FETCH_PRODUCTS_ID:
      //     return [action.payload];

      break;
    default:
      return inbox;
  }
};
