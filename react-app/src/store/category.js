const GET_CATEGORY = "channel/GET_CATEGORY";

const get_category = (data) => ({
  type: GET_CATEGORY,
  payload: data,
});

//GET all categories
export const allCategories = () => async (dispatch) => {
  const response = await fetch("/api/categories/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log("All Categories: ", data);
  dispatch(get_category(data));
  return;
};



const categoryReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_CATEGORY:
      newState = { ...state };
      action.payload["categories"].forEach((category) => {
        newState[category.id] = category;
      });
      return newState;
    default:
      return state;
  }
};

export default categoryReducer;
