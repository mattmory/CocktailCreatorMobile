import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import API from "../../util/API";
import DrinkList from "../../components/DrinkList/";

//Redux
import { connect } from 'react-redux'

class Search extends Component {
  state = {
    query: "",
    selectedIng: [],
    ready: false,
    canMake: [],
    canAlmostMake: []
  }

  findIng(query) {
    if (query === '') {
      return [];
    }
    const regex = new RegExp(`${query.trim()}`, 'i');
    return this.props.ingredients.filter(ing => ing.name.search(regex) >= 0);
  }

  ingredientSelectedHandler = (ing) => {
    if (typeof this.state.selectedIng.find(ingredient => ing.id === ingredient.id) !== "undefined") {
      this.setState({ query: "" })
      return;
    };
    this.setState(prevState => {
      return {
        ...prevState,
        query: "",
        selectedIng: prevState.selectedIng.concat(ing)
      }
    }, () => this.loadDrinks())
  }

  ingredientDeletedHandler = (ing) => {
    const updatedArray = this.state.selectedIng.filter(ingredient => {
      if (ing.id !== ingredient.id) {
        return ing;
      }
    });
    this.setState(prevState => {
      return {
        ...prevState,
        selectedIng: updatedArray
      }
    }, () => this.loadDrinks())
  }

  loadDrinks = () => {
    let ingArray = this.state.selectedIng.map(ing => { return ing.id })
    API.getDrinksByIngs(ingArray.join("&"))
      .then(res => {

        let canMakeArray = res.drinks.filter(drink => { return drink.missingIngCount === 0; });
        let canAlmostMakeArray = res.drinks.filter(drink => { return drink.missingIngCount !== 0; });

        canMakeArray.sort(function (a, b) {
          return a.name.localeCompare(b.name);
        });
        canAlmostMakeArray.sort(function (a, b) {
          return a.missingIngCount -
            b.missingIngCount || a.name.localeCompare(b.name);
        });

        this.setState(prevState => {
          return {
            ...prevState,
            canMake: canMakeArray,
            canAlmostMake: canAlmostMakeArray
          }
        })
      })
      .catch(err => console.log(err));
  }


  drinkSelectedHandler = (id,missing,missingIng) => {
    const selDrink = allDrinks.find(drink => {
      return id === drink.id;
    })
    this.props.navigator.push({
      screen: "cocktailCreator.DrinkDetailsScreen",
      title: selDrink.name,
      passProps : {
        drinkId: selDrink.id,
        missing: missing,
        missingIng: missingIng
      },
      backButtonTitle: "",
      navigatorStyle: {
        navBarTextFontFamily: "Merriweather-Regular"
      }
    })
  }

  canMake = () => {
    if (this.state.canMake.length > 0) {
        return <DrinkList drinks={this.state.canMake} selectedHandler={this.drinkSelectedHandler} />
    }
    else {
      return null
    }
  };

  canAlmostMake = () => {
    if (this.state.canAlmostMake.length > 0) {
        return <DrinkList missing drinks={this.state.canAlmostMake} selectedHandler={this.drinkSelectedHandler} />
    }
    else {
      return null
    }
  }


  render() {
    const query = this.state.query;
    const ings = this.findIng(query);
    return (
      <View style={styles.container} >
        <View style={styles.typeaheadView}>
          <Autocomplete
            data={ings}
            defaultValue={this.state.query}
            onChangeText={text => this.setState({ query: text })}
            inputContainerStyle={{ borderColor: "#000000", borderWidth: 0, borderBottomWidth: 2 }}
            renderItem={item => (
              <TouchableOpacity key={item.id} onPress={() => this.ingredientSelectedHandler(item)}>
                <Text key={item.id}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.selectedIngView}>
          {this.state.selectedIng.length > 0 ? this.state.selectedIng.map(ing => {
            return (
              <TouchableOpacity style={styles.selectedIngTouch} key={ing.id} onPress={() => this.ingredientDeletedHandler(ing)}>
                <Text style={styles.selectedIngText} key={ing.id}>{ing.name}</Text>
              </TouchableOpacity>
            )
          })
            : <Text style={styles.noIngText}>Add some ingredients.</Text>
          }
        </View>
        <View style={styles.toggleView}>
          <TouchableOpacity onPress={() => this.setState({ ready: !this.state.ready })} style={styles.selectedToggleTouch}>
            <View style={this.state.ready ? styles.selectedToggle : styles.unselectedToggle}>
              <Text style={this.state.ready ? styles.selectedToggleText : styles.unselectedToggleText}>Ready to Enjoy ({this.state.canMake.length})</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ ready: !this.state.ready })} style={styles.selectedToggleTouch}>
            <View style={this.state.ready ? styles.unselectedToggle : styles.selectedToggle}>
              <Text style={this.state.ready ? styles.unselectedToggleText : styles.selectedToggleText}>Almost There ({this.state.canAlmostMake.length})</Text>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.resultsView}>
          {this.state.ready ?
            this.canMake() :
            this.canAlmostMake()
          }
        </ScrollView>
      </View>
    )
  }
}

mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients.ingredients
  };
};

export default connect(mapStateToProps, null)(Search);

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flex: 1,
    alignItems: "center"
  },
  typeaheadView: {
    height: "8%",
    width: "95%",
    zIndex: 1
  },
  selectedIngView: {
    zIndex: 0,
    height: "12%",
    width: "95%",
    flexDirection: "row",
    flexWrap: "wrap",
    flexGrow: 1,
    zIndex: 0
  },
  selectedIngTouch: {
    //  alignSelf: "flex-start"
    zIndex: 0
  },
  selectedIngText: {
    marginRight: 5,
    marginBottom: 2,
    padding: 3,
    backgroundColor: "#F0F0F0",
    fontFamily: "Comfortaa-Bold",
    zIndex: 0
  },
  noIngText: {
    fontFamily: "Comfortaa-Bold"
  },
  resultsView: {
    height: "80%",
    width: "95%",
    zIndex: 0
  },
  toggleView: {
    flexDirection: "row",
    width: "95%",
    alignItems: "center"
  },
  selectedToggle: {
    borderColor: "#68160e",
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    alignItems: "center"
  },
  selectedToggleTouch: {
    width: "50%"
  },
  selectedToggleText: {
    fontFamily: "Comfortaa-Bold",
    color: "#68160e"
  },
  unselectedToggle: {
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
 //   width: "50%",
    alignItems: "center"
  },
  unselectedToggleText: {
    fontFamily: "Comfortaa-Bold",
    color: "#000000"
  }
})