/* jshint esversion:9*/
import { ADD_ITEM, ADD_ITEMS, USERDATA, CURRENTITEM } from "./pantry-actions.js";
const INITIAL_STATE = {
  inventory: [],
  currentItem: {},
  userdata: {
    _id: ''
  }
};
export const pantry = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return { ...state,
        inventory: [...state.inventory, action.item]
      };

    case ADD_ITEMS:
      return { ...state,
        inventory: [...action.item]
      };

    case USERDATA:
      return { ...state,
        userdata: { ...action.item
        }
      };

    case CURRENTITEM:
      return { ...state,
        currentItem: { ...action.item
        }
      };

    default:
      return state;
  }
};