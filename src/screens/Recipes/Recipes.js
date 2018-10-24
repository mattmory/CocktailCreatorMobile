import React, { Component } from 'react';
//import { View, Text, StyleSheet } from 'react-native';

import API from "../../util/API";

import DrinkList from "../../components/DrinkList";

class Recipes extends Component {
  state = {
    drinksLoaded: false
  };

  allDrinks = [];

  componentDidMount() {
    this.loadAllDrinks();
  };

  loadAllDrinks = () => {

    API.loadAllDrinks()
      .then(res => {
        allDrinks=res;
        this.setState({
          drinksLoaded: true
        })
          })
};

drinkSelectedHandler = (id) => {
  const selDrink = allDrinks.find(drink => {
    return id === drink.id;
  })
  this.props.navigator.push({
    screen: "cocktailCreator.DrinkDetailsScreen",
    title: selDrink.name,
    passProps : {drinkId: selDrink.id, missing: false},
    backButtonTitle: "",
    navigatorStyle: {
      navBarTextFontFamily: "Merriweather-Regular"
    }
  })
}

render() {
  let fullList = null;
  if (this.state.drinksLoaded) {
    fullList = <DrinkList drinks={allDrinks} selectedHandler={this.drinkSelectedHandler} />
  }
  return (
    fullList
  )
}
}

export default Recipes;
