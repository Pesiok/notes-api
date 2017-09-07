import TOGGLE_MENU from '../../actions/ui/menuActions';


const menuReducer = (state = { isOpen: false }, action) => {
  switch (action.type) {
    case TOGGLE_MENU: {
      return Object.assign({}, state, { isOpen: !state.isOpen });
    }
    default: {
      return state;
    }
  }
};

export default menuReducer;
