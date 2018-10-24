import React  from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

const drink = (props) => {
  let drinkAddy = props.image;
  let missingCountString = "";
  if(props.missing) {
    if(props.missingIngCount === 1)
    {
      missingCountString = ": Missing 1 ingredient.";
    }
    else {
      missingCountString = ": Missing " + props.missingIngCount + " ingredients.";
    }
  }
  return (
    <View style={styles.mainContainer}>
    <TouchableOpacity style={styles.drinkTouchable}
    onPress={props.onPressEvent}>
    <View style={styles.drink}>
      <Image resize="cover" source={{uri: drinkAddy}} style={styles.imageStyle}/> 
      <Text>{props.name}{missingCountString}</Text>
    </View>
    </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create ({
  mainContainer: {
    flex: 1,
    alignItems: "center"
  },
  drinkTouchable: {
    width: "95%"
  },
  drink: {
    width: "100%",
    padding: 10,
    marginBottom: 5,
    backgroundColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  drinkText: {
    fontFamily: "Comfortaa-Bold"
  },
  imageStyle: {
    marginRight: 8,
    height: 30,
    width: 30
  }
});


export default drink;