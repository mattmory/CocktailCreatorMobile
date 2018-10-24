import React, { Component } from 'react';
import {ScrollView, View, StatusBar, Text, Image, StyleSheet } from 'react-native';

import API from "../../util/API";

class DrinkDetails extends Component {
  state = {
    drinkData: null
  };



  componentDidMount() {
    this.loadDrink();
  }

  formatMissing = (missingIng) => {
  //  let missingIng = missingIngArray.map(a => ({...a}));
   // missingIng.sort();
  //  console.log(missingIng);
  //  console.log(missingIng[0]);
  //  console.log(missingIng[1]);

    if (missingIng.length === 1) {
      return (<View><Text style={styles.textBold}>Missing Ingredient: </Text><Text style={styles.textRegular}>{missingIng[0]}.</Text></View>)
    }
    if (missingIng.length === 2) {
      return (<View><Text style={styles.textBold}>Missing Ingredients:</Text><Text style={styles.textRegular}>{missingIng[0]} and {missingIng[1]}.</Text></View>)
    }
    let missingString = "Missing Ingredients: ";
    for (let i = 0; i < missingIng.length - 1; i++) {
      missingString += missingIng[i] + ", ";
    }
    missingString = missingString.substr(0, missingString.length - 2);
    missingString += " and " + missingIng[missingIng.length - 1] + ".";
    return null;// missingString;
  }

  loadDrink = () => {
    let missingString = null;
    if (this.props.missing) {
      missingString = this.formatMissing(this.props.missingIng);
    }
    API.getDrinkById(this.props.drinkId).then(res => {
      this.setState(prevState=> {
        return{ 
          ...prevState,
          drinkData: res, 
          missingString: missingString 
        }
      });
    }).catch(err => console.log(err));
  };


  render() {
   // let drinkAddy = this.state.drinkData.thumbImg;
    let missingIng = null;
    if(this.props.missing)
    {
      missingIng = this.state.missingString;
    }

    return (
      this.state.drinkData != null ? (
      <View style={styles.mainContainer}> 
        <StatusBar false />
        <View style={styles.imageView}>
        <Image source={{ uri: this.state.drinkData.thumbImg }} style={styles.drinkImage} resizeMode="cover" />
        </View>
        <ScrollView style={styles.textView}>
        {missingIng}
        <Text style={styles.textBold}>Ingredients:</Text>
        {this.state.drinkData.contents.map((Ing, index) => (
          <Text key={index} style={styles.textRegular}>{Ing.ingredientName}: {Ing.ingredientAmount}</Text>
        ))}
        <Text style={styles.textBold}>Instructions:</Text>
        <Text style={styles.textRegular}>{this.state.drinkData.instructions}</Text>
        </ScrollView>
      </View>
      ) :  (null)
    );
  }
}

const styles= StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center"
  },
  imageView: {
    width: "95%",
    height: "40%",
    alignItems: "center"
  },
  drinkImage: {
    height: "100%",
    width: 256
  },
  textView: {
    width: "95%",
    height: "60%"
  },
  textBold: {
    fontFamily: "Comfortaa-Bold",
    fontSize: 20
  },
  textRegular: {
    fontFamily: "Comfortaa-Regular",
    fontSize: 15

  }
})

export default DrinkDetails;