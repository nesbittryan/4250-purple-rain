import React from 'react';
import { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { default_style } from '../../styles/views';
import { AuthService } from '../../service/AuthService'
import { Property } from '../../common/models/Property';
import PropertyButton from '../../common/components/PropertyButton'
import { APIService } from '../../service/APIService';

const logOut = (navigation) => {
  if (AuthService.logout())
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

  properties:Property[] = new Array()
  
  constructor(props: any) {
    super(props)
    let userId = "1"
    let p = APIService.getPropertiesByUserId(userId)
    
    if (p.code == 200 && p.data.length > 0) {
      p.data.forEach((element: Property) => {
        this.properties.push(element)
      });
    }
  }

  render() {
    return (
      <View>
        <Text>Home page { JSON.stringify(this.props.navigation.getParam('email', 'UNKNOWN'))}</Text>
        <FlatList 
          data={ this.properties } 
          renderItem={({item}) => <PropertyButton property={ item }></PropertyButton> }>
        </FlatList>
        <Button title="Register New Property" onPress={ () => { this.props.navigation.navigate("RegisterProperty") }}></Button>
      </View>
    );
  }
}