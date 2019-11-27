import React from 'react';
import { Component } from 'react';
import { View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Property } from '../../common/models/Property';
import { getPropertiesByUserId } from '../../service/APIService';
import { User } from '../../common/models/user';
import ButtonlessHeader from '../../common/components/ButtonlessHeader';
import { Style } from '../../res/Styles';
import PropertyList from './components/PropertyList';
import { ListItem } from 'react-native-elements'
import { Colours } from '../../res/Colours';
import UserContext from '../../context/UserContext';

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
    console.log(this.user)
    await this.fetchData()
  }

  render() {
    return (
      <View style={Style.full_container}>
                  
        <ButtonlessHeader text="My Properties"/>

        <PropertyList
          properties={this.state.properties}
          refreshList={this.fetchData}
          navigation={this.props.navigation}/>
        
        <Icon raised reverse name='plus' type='font-awesome' color={Colours.accent_green} 
            containerStyle={{position: 'absolute', right:'0%', bottom:'5%'}} 
            onPress={ () => { this.props.navigation.navigate("Register", {refreshList: this.fetchData }) }}/>
      </View>
    );
  }
}

HomeScreen.contextType = UserContext;