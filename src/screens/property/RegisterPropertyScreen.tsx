import * as React from 'react';
import { Text, View, Picker } from 'react-native';
import { Input, Button, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont()

import { PropertyInterface } from '../../common/models/Property';

import { MainApp, Style } from '../../res/Styles';
import { createProperty } from '../../service/APIService';
import UserContext from '../../context/UserContext';
import ButtonlessHeader from '../../common/components/ButtonlessHeader';

interface State {
  property: PropertyInterface
  isLandlord: boolean
  userId: string
}

export default class RegisterPropertyScreen extends React.Component<{navigation: Navigator, refreshList:()=>void},{}> {
  static navigationOptions = {
    headerTitle: 'Register Property',
  };
  userId: string
  
  readonly state: State = {
      property:  {
        address: "",
        city: "",
        country: "",
        description: "",
        id: "-1",
        maxOccupancy: 1,
        state:""
      },
      isLandlord: true,
  }

  constructor(props: any) {
    super(props);
    this.handlePropertyChange = this.handlePropertyChange.bind(this);
    this.handleRegisterProperty = this.handleRegisterProperty.bind(this);
  }

  componentDidMount() {
    const {user} = this.context;
    this.userId = user.id;
  }

  handlePropertyChange(name: string, input: any) {
    var prop = this.state.property
    if ("address" == name)
      prop.address = input
    if ("city" == name)
      prop.city = input
    if ("country" == name)
      prop.country = input
    if ("description" == name)
      prop.description = input
    if ("state" == name)
      prop.state = input
    if ("maxOccupancy" == name)
      prop.maxOccupancy = input

    this.setState({ property: prop})
  }

  handleRegisterProperty() {
    createProperty(this.state.property, this.state.isLandlord, this.userId)
    .then(() => {
      let refresh = this.props.navigation.getParam('refreshList', null)
      refresh()
    })
    
    this.props.navigation.goBack();
  }

  handleStateChange(name: string, input: boolean) {
    this.setState(() => ({ [name]: input }));
  }

  render() {
    return (
      <View style={Style.full_container}>
        <ButtonlessHeader text="Register Property"></ButtonlessHeader>
          <Input
            value={ this.state.property.address }
            onChangeText={(txt) => this.handlePropertyChange("address", txt)}
            placeholder="address"
            returnKeyType="next"/>
          <Input
            value={ this.state.property.city }
            onChangeText={(txt) => this.handlePropertyChange("city", txt)}
            placeholder="city"
            returnKeyType="next"/>
          <Input
            value={ this.state.property.state }
            onChangeText={(txt) => this.handlePropertyChange("state", txt)}
            placeholder="state"
            returnKeyType="next"/>
          <Input
            value={ this.state.property.country }
            onChangeText={(txt) => this.handlePropertyChange("country", txt)}
            placeholder="country"
            returnKeyType="next"/>
          <Input
            value={ this.state.property.description }
            onChangeText={(txt) => this.handlePropertyChange("description", txt)}
            placeholder="description"
            returnKeyType="next"/>
          <CheckBox
            title="Are you the landlord?" containerStyle={{width:'95%'}}
            onPress={ () => this.setState({ isLandlord: !this.state.isLandlord }) }
            checked={ this.state.isLandlord}></CheckBox>
          <Text style={[Style.normal_text,{ alignSelf:'flex-start', marginLeft:'5%'}]}>Max Occupancy:</Text>
          <Picker
            style={{width:'95%'}}
            selectedValue={ this.state.property.maxOccupancy}
            onValueChange={(num) => this.handlePropertyChange("maxOccupancy", num)}>
              <Picker.Item label="1" value="1"></Picker.Item>
              <Picker.Item label="2" value="2"></Picker.Item>
              <Picker.Item label="3" value="3"></Picker.Item>
              <Picker.Item label="4" value="4"></Picker.Item>
              <Picker.Item label="5" value="5"></Picker.Item>
              <Picker.Item label="6" value="6"></Picker.Item>
              <Picker.Item label="7" value="7"></Picker.Item>
              <Picker.Item label="8" value="8"></Picker.Item>
              <Picker.Item label="9" value="9"></Picker.Item>
              <Picker.Item label="10" value="10"></Picker.Item>
          </Picker>
          <View style={{width:'95%'}}>
            <Button 
              style={{marginVertical:'2%'}}  title="Register Property"
              onPress={ this.handleRegisterProperty } />
            <Button 
              style={{marginBottom:'2%'}} type="outline" title="Back"
              onPress={ () => this.props.navigation.popToTop() } />
          </View>
        </View>
    );
  }
}

RegisterPropertyScreen.contextType = UserContext;
