import {
  FETCH_INBOX,
  FETCH_INBOX_ID,
  DELETE_INBOX,
} from "../constants/actionTypes";

export default (inbox = [], action) => {
  switch (action.type) {
    case FETCH_INBOX:
      return action.payload;

    case FETCH_INBOX_ID:
      return [action.payload];

    case DELETE_INBOX:
      return inbox.filter((blog) => blog._id !== action.payload._id);

      break;
    default:
      return inbox;
  }
};
