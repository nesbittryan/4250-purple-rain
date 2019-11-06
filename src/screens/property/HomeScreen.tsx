import React from 'react';
import { Component } from 'react';
import { TouchableOpacity, View, FlatList, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Text } from 'react-native-elements';
import { Property } from '../../common/models/Property';
import PropertyButton from '../../common/components/PropertyButton'
import { APIService } from '../../service/APIService';
import { User } from '../../common/models/user';
import { ListItem } from 'react-native-elements'
import { MainApp } from '../../res/Styles';
import { Colours } from '../../res/Colours';


export default class HomeScreen extends Component<{navigation: Navigator, wentBack: boolean}, { properties: Property[]  }>  {

  properties:Property[] = new Array()
  user: User | any

  constructor(props: any) {
    super(props)
    this.fetchData = this.fetchData.bind(this)
    this.state = {
      properties: new Array,
    }
  }

  fetchData(){

    APIService.getPropertiesByUserId(this.user.id).then((propertyList: any)  => {
      this.setState({properties: propertyList})
      this.forceUpdate();
    })
  }

  componentDidMount() {
    if (this.user == null)
      this.user = this.props.navigation.dangerouslyGetParent().getParam("user")

    this.fetchData()
  }

  render() {
    return (
      <View style={{backgroundColor:Colours.accent_blue}}>
        <Text style={{ borderBottomWidth:1,textAlign:'center',fontSize:20, color:Colours.accent_green, marginBottom:'3%', marginTop:'12%'}}>Properties</Text>
        <View style={{ borderTopWidth:1, borderColor:Colours.darker_blue, backgroundColor:Colours.white, width:'100%'}}>
          <View style={{height: '85.5%', width:'100%'}}>
            <PropertyList
              properties={this.state.properties}
              refreshList={this.fetchData}
              navigation={this.props.navigation}/>  
          </View>
          <Button 
            style={{marginHorizontal:'5%', marginTop:'2%'}}
            title="Register New Property" 
            onPress={ () => { this.props.navigation.navigate("Register", {refreshList: this.fetchData }) }}></Button>
        </View>
      </View>
    );
  }
}

class PropertyList extends React.Component<{navigation: Navigator,properties: Property[], refreshList:()=>void},{}> {
  
  constructor(props: any) {
    super(props)
  }

  render() {
    const properties = this.props.properties;
    return (
      <FlatList
        style={{
          borderBottomColor: Colours.darker_blue, borderBottomWidth:1
        }}
        data={properties}
        renderItem={({item}) =>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("View", {
              property: item,
              refreshList: this.props.refreshList
            })}
          >
            <ListItem
              titleStyle={{fontWeight:'bold'}}
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