const createReducer = (name) => {
  return (state = {}, action) => {
    if(action.response && action.response[name]) {
      return {...state, ...action.response[name]}
    }
    return state;
  }
}

export default createReducer