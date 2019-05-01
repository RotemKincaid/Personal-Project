const initialState = {
  comment: []
};

const SET_COMMENT = "SET_COMMENT";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_COMMENT:
      return { ...state, comment: action.payload };

    default:
      return state;
  }
}

export function setComment(comment) {
  return {
    type: SET_COMMENT,
    payload: comment
  };
}
