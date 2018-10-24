import React from 'react';
import { StatusBar, View, Text,FlatList, StyleSheet } from 'react-native'

import Drink from "./Drink"

const drinkList = (props) => {
  return (
    <View>
      <StatusBar hidden />
      <FlatList style={styles.listContainer}
        data={props.drinks}
        renderItem={({ item }) => (
          <Drink
          name={item.name}
          image={item.thumb_img_url ? item.thumb_img_url : item.imgUrl}         
          onPressEvent={() => props.selectedHandler(item.id,props.missing,item.missingIng)}
          missing={props.missing}
          missingIngCount={item.missingIngCount}
          />)}
        keyExtractor={item => item.id.toString()} 
        /> 
    </View>
  )
}

export default drinkList;

const styles = StyleSheet.create({
  listContainer: {
    width: "100%",
  }
});