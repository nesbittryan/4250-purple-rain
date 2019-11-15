import React from 'react'
import { Component } from 'react';
import { View, TouchableOpacity} from 'react-native';
import { ListItem, Button, colors, ButtonGroup } from 'react-native-elements'
import { Contact } from '../../common/models/contact';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { getRelatedUsers, getPropertiesByUserId } from '../../service/APIService';
import UserContext from '../../context/UserContext';
import Dialog from "react-native-dialog";
import { Property } from '../../common/models/property';


export default class ViewMessagesScreen extends Component {

  contacts: Contact[] = new Array()
  user: any

  constructor(props:  any) {
    super(props)
    this.user = this.props.navigation.dangerouslyGetParent().getParam("user")
    
    this.getUsers()
    this.getProperties()
  }

  readonly state = {
    refresh: true,
    dialogVisible: false,
    broadcast: "",
    selectedIndex: 0,
    properties: new Array()
  }

  componentDidMount() {
    const {user} = this.context;
    this.user = this.props.navigation.dangerouslyGetParent().getParam("user")

    this.getUsers()
    this.showDialog = this.showDialog.bind(this)
    this.hideDialog = this.hideDialog.bind(this)
    this.updateIndex = this.updateIndex.bind(this)
  }

  showDialog() {
    this.setState({ dialogVisible: true })
  }

  hideDialog() {
    this.setState({ dialogVisible: false })
    alert(this.state.broadcast)
  }

  handleStateChange = async (name: string, input: string) => {
    this.setState(() => ({ [name]: input }));
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  getUsers = async() => {
    const response = await getRelatedUsers(this.user.id)

    response.data.forEach((user: any) => {
      this.contacts.push(new Contact({
        name: user.first_name + ' ' + user.last_name,
        id: user.id.toString(),
        relationship: user.relation,
      }))
    })

    this.setState({ refresh: !this.state.refresh })
  }

  getProperties() {
    getPropertiesByUserId(this.user.id).then((propertyList: any)  => {
      let propertyDescriptions = []
      propertyList.forEach(property => {
        propertyDescriptions.push(property.description)
      });
      this.setState({properties: propertyDescriptions})
      this.forceUpdate();
      console.log("\n \n \n \nADAMLOG::::" + JSON.stringify(propertyDescriptions))
    })
  }

  render() {
    const { selectedIndex } = this.state
    return (
      <View>
        <FlatList
          data={this.contacts}
          extraData={this.state.refresh}
          renderItem={({item}) =>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Conversation", {
                contact: item,
              })}
            >
              <ListItem
                title={item.name}
                subtitle={item.relationship}
                leftAvatar={{source: {uri: 'https://placeimg.com/180/180/animals'}}}
              />
            </TouchableOpacity>
          }
          keyExtractor={item=>item.id}
        />
        <Button
          title="BROADCAST"
          onPress={ this.showDialog }
        />
        <View>
          <Dialog.Container visible={this.state.dialogVisible}>
              <Dialog.Title>Send Broadcast</Dialog.Title>
              <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={this.state.properties}
                containerStyle={{height: 50}}
              />
              <TextInput
                style={{height: 80, margin: 5, backgroundColor: colors.grey5, borderRadius:5}}
                onChangeText={(txt) => this.handleStateChange("broadcast", txt)}
                multiline={true}
                numberOfLines={5}
                value={this.state.broadcast}
                textAlignVertical= 'top'
              />
              <Dialog.Button label="OK" onPress={this.hideDialog} />
          </Dialog.Container>
        </View>
      </View>
    )
  }
}

ViewMessagesScreen.contextType = UserContext;
