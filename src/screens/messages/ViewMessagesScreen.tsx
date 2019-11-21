import React from 'react'
import { Component } from 'react';
import { View, TouchableOpacity} from 'react-native';
import { ListItem, Button, colors, ButtonGroup } from 'react-native-elements'
import { Contact } from '../../common/models/contact';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { getRelatedUsers, getPropertiesByUserId, getTenantsInProperty } from '../../service/APIService';
import UserContext from '../../context/UserContext';
import Dialog from "react-native-dialog";
import BroadcastService from '../../service/BroadcastService';
import { Style } from '../../res/Styles';

export default class ViewMessagesScreen extends Component {

  contacts: Contact[] = new Array()
  user: any

  readonly state = {
    refresh: true,
    dialogVisible: false,
    broadcast: "",
    selectedIndex: 0,
    propertiesDescriptions: new Array(),
    properties: new Array(),
  }

  constructor(props:  any, context: any) {
    super(props, context)

    this.user = this.context

    this.getUsers()
    this.getProperties()

    this.showDialog = this.showDialog.bind(this)
    this.hideDialog = this.hideDialog.bind(this)
    this.updateIndex = this.updateIndex.bind(this)
    this.getTenantsIds = this.getTenantsIds.bind(this)
    this.broadcast = this.broadcast.bind(this)
  }

  showDialog() {
    this.setState({ dialogVisible: true })
  }

  hideDialog() {
    this.setState({ dialogVisible: false })
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
      let propertyDescriptions = ["All Properties"]
      propertyList.forEach(property => {
        propertyDescriptions.push(property.description)
      })
      this.setState({propertiesDescriptions: propertyDescriptions})
      this.setState({properties: propertyList})
      this.forceUpdate()
    })
  }

  getTenantsIds = async(index: number) => {
    let contactIds: String [] = new Array()

    if(index == 0) {
      this.contacts && this.contacts.forEach(contact => {
        contactIds.push(contact.id)
      })
    } else {
      index--
      let propertyId = this.state.properties && this.state.properties[index] && this.state.properties[index].id

      let contacts = await getTenantsInProperty(propertyId)

      contacts.forEach(contact => {
        contactIds.push(contact.id)
      })
    }

    return contactIds
  }

  broadcast = async() => {
    if(this.state.broadcast == "") {
      return
    }

    let contactIds = await this.getTenantsIds(this.state.selectedIndex)

    const message = {
      text: "BROADCAST: " + this.state.broadcast,
      user: {
        _id: this.user.id,
        name: this.user.first_name + this.user.last_name,
      }
    }

    BroadcastService.sendBroadcast(this.user.id, contactIds, message)

    await this.close()
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  close = async() => {
    this.hideDialog()

    //this sleep is need due to a bug where dialogVisible is set to false and it closes the alert as a result
    await this.sleep(500);
    alert("Broadcast successfully sent")
    this.handleStateChange("broadcast", "")
  }


  render() {
    const { selectedIndex } = this.state
    const reactNativeModalProps = {
      onBackdropPress: this.hideDialog,
    };
    return (
      <View style={Style.full_container}>
        <FlatList
          style={{width:'100%'}}
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

        <View style={{width:'95%'}}>
          <Button
            style={{marginVertical:'2%'}}
            title="Send Broadcast"
            onPress={ this.showDialog }
          />
        </View>
       
        <View>
          <Dialog.Container visible={this.state.dialogVisible} {...reactNativeModalProps}>
              <Dialog.Title>Send Broadcast</Dialog.Title>
              <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={this.state.propertiesDescriptions}
                containerStyle={{height: 50}}
              />
              <TextInput
                style={{height: 80, margin: 5, backgroundColor: colors.grey5, borderRadius:5}}
                onChangeText={(txt) => this.handleStateChange("broadcast", txt)}
                multiline={true}
                numberOfLines={5}
                value={this.state.broadcast}
                textAlignVertical='top'
              />
              <Dialog.Button label="Cancel" onPress={this.hideDialog} />
              <Dialog.Button label="Send" onPress={this.broadcast} />
          </Dialog.Container>
        </View>
      </View>
    )
  }
}

ViewMessagesScreen.contextType = UserContext;
