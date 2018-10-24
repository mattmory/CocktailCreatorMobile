import { Navigation } from 'react-native-navigation';


const startTabs = () => {
      Navigation.startTabBasedApp({
        tabs: [
          {
            screen: "cocktailCreator.SearchScreen",
            title: "Search",
            icon: require("../../assets/Images/searchIcon.png"),
            navigatorStyle: {
              navBarTextFontFamily: "Merriweather-Regular",
              navBarHidden: true
            }
          },
          {
            screen: "cocktailCreator.RecipeScreen",
            title: "all recipes",
            icon: require("../../assets/Images/drinkIcon.png"),
            navigatorStyle: {
              navBarTextFontFamily: "Merriweather-Regular"
            }
          }
        ]
      })
  };
  
export default startTabs;
