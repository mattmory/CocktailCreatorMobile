import React, { Component } from "react";
import { ImageBackground, View, Text, StatusBar, StyleSheet } from "react-native";

import startMainTabs from "../MainTabs/";


//Redux
import { connect } from 'react-redux'
import { setIngredients } from "../../store/actions/";

import API from "../../util/API";


class IngredientLoad extends Component {
  state = {
    ingredientsLoaded: false,
    ingredients: []
  }

  componentDidMount() {
    this.loadIngredients();
  }

  loadIngredients = () => {
    API.loadIngredients()
      .then(res => {
        this.props.setIngredients(res);
        this.setState(
          {
            ingredientsLoaded: true
          }
        )
      })
  }

  ingredientsLoaded = () => {
    startMainTabs();
  }


  render() {
    if (this.state.ingredientsLoaded) {
      this.ingredientsLoaded();
    }
    return (
      <View>
        <View sytle={styles.mainContainer}>
          <StatusBar hidden />
          <ImageBackground
            style={styles.imageBackground}
            source={require("../../assets/Images/LoadingSplash.jpg")}>
            <View style={styles.logoView}>
              <Text style={styles.logoBold}>cocktail</Text><Text style={styles.logoNonbold}>creator</Text>
            </View>
            <View style={styles.loadingView}>
              <Text style={styles.loadingText}>Loading Ingredients</Text>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%"
  },
  imageBackground: {
    width: "100%",
    height: "100%"
  },
  logoView: {
    height: "15%",
    width: "95%",
    flexDirection: "row"
  },
  logoBold: {
    fontFamily: "Merriweather-Bold",
    fontSize: 40,
    alignSelf: "center"
  },
  logoNonbold: {
    fontFamily: "Merriweather-Regular",
    fontSize: 40,
    alignSelf: "center"
  },
  loadingView: {
    flexDirection: "row",
    height: "85%",
    width: "95%"
  },
  loadingText: {
    alignSelf: "flex-end",
    fontFamily: "Merriweather-Regular",
    fontSize: 20
  }
})

mapDispatchToProps = (dispatch) => {
  return {
    setIngredients: (ingredients => dispatch(setIngredients(ingredients)))
  };
};

export default connect(null, mapDispatchToProps)(IngredientLoad);