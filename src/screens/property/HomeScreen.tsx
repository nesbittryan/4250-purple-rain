import React from 'react';
import { Component } from 'react';
import { TouchableOpacity, View, FlatList } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { Property } from '../../common/models/Property';
import { getPropertiesByUserId } from '../../service/APIService';
import { User } from '../../common/models/user';
import { ListItem } from 'react-native-elements'
import { Colours } from '../../res/Colours';
import UserContext from '../../context/UserContext';
import ButtonlessHeader from '../../common/components/ButtonlessHeader';
import { Style } from '../../res/Styles';

export default class HomeScreen extends Component<{navigation: Navigator, wentBack: boolean}, { properties: Property[]  }>  {

  properties:Property[] = new Array()
  user: User | any

  constructor(props: any) {
    super(props)
    this.state = {
      properties: new Array,
    }
  }

  fetchData = async () => {
    await getPropertiesByUserId(this.user.id).then((propertyList: any) => {
      this.setState({ properties: propertyList })
      this.forceUpdate();
    });
  }

  async componentDidMount() {
    const {user} = this.context;
    this.user = user;
    await this.fetchData()
  }

  render() {
    return (
      <View style={Style.full_container}>
                  
        <ButtonlessHeader text="My Properties"/>
        <View style={{width:'100%'}}>
          <PropertyList
            properties={this.state.properties}
            refreshList={this.fetchData}
            navigation={this.props.navigation}/>
        </View>
        
        
        <View style={{width:'95%'}}>
          <Button 
            style={{marginBottom:'2%'}}
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
        onRefresh={ () => { this.props.refreshList() }}
        refreshing={false}
        style={{
          backgroundColor:Colours.light_blue
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

HomeScreen.contextType = UserContext;