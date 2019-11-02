import React from 'react'
import AppNavigator from './src/navigation/MainNavigator'
import { ThemeProvider } from 'react-native-elements'
import { Colours } from './src/res/Colours';

const theme = {
    colors: {
      primary: Colours.accent_blue,
      secondary: Colours.accent_green,
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
