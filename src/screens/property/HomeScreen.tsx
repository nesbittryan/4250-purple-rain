import React from 'react';
import { Component } from 'react';
import { View, FlatList, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import { Property } from '../../common/models/Property';
import PropertyButton from '../../common/components/PropertyButton'
import { APIService } from '../../service/APIService';
import { User } from '../../common/models/user';


export default class HomeScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Properties',
    tabBarIcon: ({ }) => {
      Icon.loadFont();
      return<Icon name="home" size={33} color="#554971" />
    }
  }
  properties:Property[] = new Array()
  user: User | any

  constructor(props: any) {
    super(props)
    
  }

  componentDidMount() {
    //console.log(this.user.id)
    AsyncStorage.getItem("user")
      .then((response: any) => {
        this.user = JSON.parse(response)
      }).then(() => {
        APIService.getPropertiesByUserId(this.user.id).then((propertyList: any)  => {
          this.properties = propertyList
          this.forceUpdate();
        })
      })
      
  }

  render() {
    return (
      <View>
        <Button title="Register New Property" onPress={ () => { this.props.navigation.navigate("Register") }}></Button>
        <FlatList
          data={ this.properties }
          style={{
            
          }}
          renderItem={({item}) => <PropertyButton property={ item } navigation={this.props.navigation} ></PropertyButton> }>
        </FlatList>
      </View>
    );
  }
}