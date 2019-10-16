import React from 'react';
import { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { default_style } from '../../styles/views';
import { onLogOut } from '../../Auth'

const logOut = (navigation) => {
  onLogOut()
  navigation.popToTop()
}
export default class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
        headerTitle: 'Dashboard',
        headerLeft: (
            <Button title="Log Out" onPress={ () => logOut(navigation) }/>
        )
    }
  }
  
  constructor(props: any) {
    super(props)
  }


  render() {
    return (
      <View>
        <Text>Home page { JSON.stringify(this.props.navigation.getParam('email', 'UNKNOWN'))}</Text>
        <Button title="Register New Property" onPress={ () => { navigation.navigate("RegisterProperty") }}></Button>
      </View>
    );
  }
}