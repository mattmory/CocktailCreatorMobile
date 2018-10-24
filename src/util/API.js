//const APIAddress = "http://127.0.0.1:3001"
const APIAddress = "https://hidden-garden-38397.herokuapp.com"

export default {

  loadIngredients: function () {
    return fetch(APIAddress + "/api/ingredient")
      .then(response => response.json())
      .then(data => { return data; })
      .catch(error => {
        console.log(error);
      });
  },

  loadAllDrinks: function () {
    return fetch(APIAddress + "/api/drink")
      .then(response => response.json())
      .then(data => { return data; })
      .catch(error => {
        console.log(error);
      });
  },

  getDrinkById: function (id) {
    return fetch(APIAddress + "/api/drink/" + id)
      .then(response => response.json())
      .then(data => { return data; })
      .catch(error => {
        console.log(error);
      });
  },

  getDrinksByIngs: function (ingIds) {
    return fetch(APIAddress + "/api/drink/ing/" + ingIds)
      .then(response => response.json())
      .then(data => { return data; })
      .catch(error => {
        console.log(error);
      });
    }
  };