const GET_CATEGORY = "channel/GET_CATEGORY";

const get_category = (data) => ({
  type: GET_CATEGORY,
  payload: data,
});


export const allCategories = (server_id) => async (dispatch) => {

  const response = await fetch("/api/categories/");  //Fetch all the categories
  const resChannels = await fetch(`/api/channels/server/${server_id}`)  //Fetch all the channels based on server id
  const data = await response.json(); //All the categories
  const dataChannels = await resChannels.json();  //All the channels

  //Check if the channel Foreign Key category_id matches === to the category primary key id
  const serverCategories = () => {
    let serverCats = [];
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
  dispatch(get_category(serverCats));
  return;
};


const categoryReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_CATEGORY:
      newState = {};
      action.payload.forEach((category) => {
          newState[category.id] = category;
        });
      return newState;
    default:
      return state;
  }
};

export default categoryReducer;
