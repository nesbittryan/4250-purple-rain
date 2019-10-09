import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../home/HomeScreen';

const LoginNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
});

const App = createAppContainer(LoginNavigator);

export default App;