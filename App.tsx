import React from 'react'
import { ThemeProvider } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage'
import decodeJWT from 'jwt-decode';


import AppNavigator from './src/navigation/MainNavigator'
import { Colours } from './src/res/Colours';
import { UserProvider } from './src/context/UserContext';
import AuthLoadingScreen from './src/screens/auth-loading/AuthLoadingScreen';


const theme = {
    colors: {
      primary: Colours.accent_blue,
      secondary: Colours.accent_green,
    }
}

export const getCurrentUser = async () => {
  const token = await AsyncStorage.getItem('token');
  if (!token) {
    return false;
  }

  return decodeJWT(token).identity;
}


export default class App extends React.Component {

  constructor(props:any) {
    super(props);
    this.state = { 
      user: undefined,
      update: (user) => {
        this.setState(state => state.user = user);
      }
    }
  }

  async componentDidMount() {
    const user = await getCurrentUser()
    this.setState({user})
  }

  render() {
    const {user} = this.state;
    // Render a loading screen until the user is loaded.
    return user===undefined ? 
      <AuthLoadingScreen /> : (
      <UserProvider value={this.state}>
        <ThemeProvider theme={theme}>
          <AppNavigator />
        </ThemeProvider>
      </UserProvider>
    );
  }
}
