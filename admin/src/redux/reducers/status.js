import { FETCH_STATUS } from "../constants/actionTypes";
export default (status = [], action) => {
  switch (action.type) {
    case FETCH_STATUS:
      return action.payload;
      break;
    default:
      return status;
  }
};
