import React from 'react';
import { Component } from 'react';
import { Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { default_style } from '../../styles/views';


export default class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
        headerTitle: 'Dashboard',
        headerLeft: (
            <Button title="Log Out" onPress={ () => { this.logOut(navigation) } }/>
        )
    }
  }
  
  constructor(props: any) {
    super(props)
  }

  logOut(navigation) {
    console.log("Logging out")
    navigation.popToTop()
  }


  render() {
    const { navigation } = this.props;
    return (
      <View>
        <Text>Home page {JSON.stringify(navigation.getParam('email', 'UNKNOWN'))}</Text>
        <Button title="Register New Property" onPress={ () => { this.props.navigation.navigate("RegisterProperty") }}></Button>
      </View>
    );
  }
}