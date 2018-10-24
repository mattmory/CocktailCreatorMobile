import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

// Redux Configuration
import configureStore from './src/store/configureStore';
const store = configureStore();


// Screen Import and Definition
import IngredientLoadScreen from "./src/screens/IngredientLoad/";
Navigation.registerComponent("cocktailCreator.IngredientLoadScreen", () => IngredientLoadScreen, store, Provider);

import SearchScreen from "./src/screens/Search/";
Navigation.registerComponent("cocktailCreator.SearchScreen", () => SearchScreen, store, Provider);

import RecipeScreen from "./src/screens/Recipes/";
Navigation.registerComponent("cocktailCreator.RecipeScreen", () => RecipeScreen);

import DrinkDetailsScreen from "./src/screens/DrinkDetails/";
Navigation.registerComponent("cocktailCreator.DrinkDetailsScreen", () => DrinkDetailsScreen);

// Start Application
Navigation.startSingleScreenApp({
  screen: {
    screen: "cocktailCreator.IngredientLoadScreen",
    title: "Loading Ingredients",
    navigatorStyle: {
      navBarHidden: true
    }
  }
})
