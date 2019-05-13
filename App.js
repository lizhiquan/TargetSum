import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Game: GameScreen
  },
  {
    initialRouteName: 'Home'
  }
);

export default createAppContainer(AppNavigator);
