import React from 'react';
import { Component } from 'react';
import { TouchableOpacity, View, FlatList, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import { Property } from '../../common/models/Property';
import PropertyButton from '../../common/components/PropertyButton'
import { APIService } from '../../service/APIService';
import { User } from '../../common/models/user';
import { ListItem } from 'react-native-elements'
import { HeaderTitle } from 'react-navigation-stack';


export default class HomeScreen extends Component<{navigation: Navigator,wentBack: boolean}, { properties: Property[]  }>  {
  static navigationOptions = {
    headerTitle: 'Properties',
    tabBarLabel: 'Properties',
    tabBarIcon: ({ }) => {
      Icon.loadFont();
      return<Icon name="home" size={33} color="#554971" />
    },
  };
  properties:Property[] = new Array()
  user: User | any

  constructor(props: any) {
    super(props)
    const {navigation} =  this.props //wentBack = navigation.getParam('wentBack', 'whatever default value - should be false');
    this.fetchData = this.fetchData.bind(this)
    this.state = {
      properties: new Array,
    }
   
  }
  fetchData(){

    APIService.getPropertiesByUserId(this.user.id).then((propertyList: any)  => {
      this.setState({properties: propertyList})
      console.log(this.state.properties)
      this.forceUpdate();
    })
  }
  componentDidMount() {
    this.user = this.props.navigation.dangerouslyGetParent().getParam("user")
    this.fetchData()
  }

  render() {
    return (
      <View>
        <PropertyList
          properties={this.state.properties}
          navigation={this.props.navigation}/>
        <AddNewPropertyButton
          navigation={this.props.navigation}
          fetchData = {this.fetchData}/>
      </View>
    );
  }
}

class AddNewPropertyButton extends React.Component {

  render() {
    return (
      <Button title="Register New Property" onPress={ () => { this.props.navigation.navigate("Register", {onGoBack: () => this.props.fetchData() }) }}></Button>
    )
  }
}

class PropertyList extends React.Component<{properties: Property[]},{}> {
  constructor(props: any) {
    super(props)
  }

  render() {
    const properties = this.props.properties;
    return (
      <FlatList
        style={{
          maxHeight: "90%"
        }}
        data={properties}
        renderItem={({item}) =>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("View", {
              property: item
            })}
          >
            <ListItem
              title={item.address}
              subtitle={item.description}
              leftAvatar={{rounded: false, source: {uri: 'https://i.imgur.com/uZpj0B6.jpg'}}}
            />
          </TouchableOpacity>
        }
        keyExtractor={item=>item.id}
      />
    )
  }
}