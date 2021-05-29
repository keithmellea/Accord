const GET_CATEGORY = "channel/GET_CATEGORY";

const get_category = (data) => ({
  type: GET_CATEGORY,
  payload: data,
});

//GET all categories
export const allCategories = (server_id) => async (dispatch) => {
  const response = await fetch("/api/categories");
  const resChannels = await fetch(`/api/channels/server/${server_id}`)
  //we use the data to update the store.
  //so what if I use the double for loop to update the store more dynamically
  const data = await response.json();
  const dataChannels = await resChannels.json();

  const serverCategories = () => {
    let serverCats = [];
    console.log("------dataChannels: ", dataChannels)
    console.log("--------DATACat: ", data)
    for (let i = 0; i < dataChannels["channels"].length; i++) {
      let channel = dataChannels["channels"][i];
      for (let j = 0; j < data["categories"].length; j++) {
        let category = data['categories'][j];
        if (channel.category_id === category.id) {
          serverCats.push(category);
        }
      }
    }
      return serverCats;
  };
  let serverCats = serverCategories();
  console.log("==============serverCats: ", serverCats)
  dispatch(get_category(serverCats));
  return;
};



const categoryReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_CATEGORY:
      newState = {};
      // action.payload["categories"].forEach((category) => {
      //   newState[category.id] = category;
      // });
      action.payload.forEach((category) => {
          newState[category.id] = category;
        });
      return newState;
    default:
      return state;
  }
};

export default categoryReducer;
