import React from 'react'
import AppNavigator from './src/navigation/MainNavigator'
import { ThemeProvider } from 'react-native-elements'
import { AppColours } from './src/styles/AppColours';

const theme = {
    colors: {
      primary: AppColours.blue_purple,
      secondary: AppColours.dark_purple
    }
}

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AppNavigator />
      </ThemeProvider>
    );
  }
}
