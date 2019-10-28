import React from 'react';
import { Component } from 'react';
import { View, FlatList, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import { Property } from '../../common/models/Property';
import PropertyButton from '../../common/components/PropertyButton'
import { APIService } from '../../service/APIService';


export default class PropertyHomeScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Properties',
    tabBarIcon: ({ }) => {
      Icon.loadFont();
      return<Icon name="home" size={33} color="#554971" />
    }
  }
  properties:Property[] = new Array()
  userId:string

  constructor(props: any) {
    super(props)
    this.userId = ""

    AsyncStorage.getItem("user")
      .then((response: any) => {
        this.userId = response.id
      })

    let propertyList = APIService.getPropertiesByUserId(this.userId).then((propertyList: any)  => {
      this.properties = propertyList
      this.forceUpdate();
    })
  }

  componentDidMount() {
    APIService.getPropertiesByUserId(this.userId).then((propertyList: any)  => {
      this.properties = propertyList
      this.forceUpdate();
    })
  }

  render() {
    return (
      <View>
        <FlatList
          data={ this.properties }
          style={{
            
          }}
          renderItem={({item}) => <PropertyButton property={ item } navigation={this.props.navigation} ></PropertyButton> }>
        </FlatList>
        <Button title="Register New Property" onPress={ () => { this.props.navigation.navigate("Register") }}></Button>
      </View>
    );
  }
}