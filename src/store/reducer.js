import { extend } from "../utils/common";
import { ActionType } from "../store/action";
import offers from "../mocks/offers";
import { getOffersChoosenByCity } from "../utils/common";

const initialState = {
  city: `Paris`,
  offersAll: offers,
  offersCity: getOffersChoosenByCity(`Paris`, offers)

};

export const reducer = (state = initialState, action) => {
  console.log(action.payload);
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        city: action.payload,
      });

    case ActionType.GET_OFFERS:
      return extend(state, {
        offersCity: action.payload,
      });

    case ActionType.RESET_OFFERS:
      return extend({}, initialState);
  }
  return state;
};