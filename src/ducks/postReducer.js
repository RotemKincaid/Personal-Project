const initialState = {
  post: []
};

const SET_POST = "SET_POST";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_POST:
      return { ...state, post: action.payload };

    default:
      return state;
  }
}

export function setPost(post) {
  return {
    type: SET_POST,
    payload: post
  };
}
