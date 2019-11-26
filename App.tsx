import React from 'react'
import { ThemeProvider } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage'
import decodeJWT from 'jwt-decode';


import AppNavigator from './src/navigation/MainNavigator'
import { Colours } from './src/res/Colours';
import { UserProvider } from './src/context/UserContext';
import AuthLoadingScreen from './src/screens/auth-loading/AuthLoadingScreen';
import {PermissionsAndroid} from 'react-native';

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


// Ask permission to access the files system 
export const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'My App Storage Permission',
        message: 'My App needs access to your storage ' +
          'so you can save your photos',
        buttonPositive: "yes"
      },
    );
    return granted;
  } catch (err) {
    console.error('Failed to request permission ', err);
    return null;
  }
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
    await requestCameraPermission()
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
