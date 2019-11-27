import React from 'react'
import { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import { ListItem, Button, colors } from 'react-native-elements'
import { Contact } from '../../common/models/contact';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { getRelatedUsers, getPropertiesByUserId, getTenantsInProperty } from '../../service/APIService';
import UserContext from '../../context/UserContext';
import Dialog from "react-native-dialog";
import BroadcastService from '../../service/BroadcastService';
import { Style } from '../../res/Styles';
import { Colours } from '../../res/Colours';
import { User } from '../../common/models/user';

export default class ViewMessagesScreen extends Component {

  contacts: Contact[] = new Array()
  user: any

  readonly state = {
    refresh: true,
    dialogVisible: false,
    broadcast: "",
    selectedIndexs: new Array(),
    properties: new Array(),
  }

  constructor(props:  any, context: any) {
    super(props, context)

    this.user = this.context

    this.getUsers()
    this.getProperties()

    this.showDialog = this.showDialog.bind(this)
    this.hideDialog = this.hideDialog.bind(this)
    this.updateIndexs = this.updateIndexs.bind(this)
    this.getTenantsIds = this.getTenantsIds.bind(this)
    this.broadcast = this.broadcast.bind(this)
  }

  showDialog() {
    this.setState({ dialogVisible: true })
  }

  hideDialog() {
    this.setState({ dialogVisible: false, selectedIndexs: [] })
  }

  handleStateChange = async (name: string, input: string) => {
    this.setState(() => ({ [name]: input }));
  }

  arrayRemove(arr: any, value: any) {
    return arr.filter(function(ele: any){
        return ele != value;
    });
 }

  updateIndexs (selectedIndex: any) {
    let selectedIndexs = []
    if(this.state.selectedIndexs.includes(selectedIndex)) {
      selectedIndexs = this.arrayRemove(this.state.selectedIndexs, selectedIndex)
    } else {
      selectedIndexs = this.state.selectedIndexs
      selectedIndexs.push(selectedIndex)
    }
    this.setState({selectedIndexs})
  }

  getUsers = async() => {
    const response = await getRelatedUsers(this.user.id)

    response.data.forEach((user: any) => {
      // Magic property transformations
      user.property.address = user.property.street_address;

      this.contacts.push(new Contact({
        name: user.first_name + ' ' + user.last_name,
        id: user.id.toString(),
        relationship: user.relation,
        property: user.property,
      }))
    })

    this.setState({ refresh: !this.state.refresh })
  }

  getProperties() {
    getPropertiesByUserId(this.user.id).then((propertyList: any)  => {
      this.setState({properties: propertyList})
      this.forceUpdate()
    })
  }

  asyncForEach = async(array: any, callback: any) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  getTenantsIds = async(indexs: []) => {
    let contactIds: String [] = new Array()
    let contacts: User[] = new Array()

    await this.asyncForEach(indexs, async(index) => {
      let contactList = await getTenantsInProperty(index.toString())
      contactList.forEach((contact: any) => {
        contacts.push(contact)
      })
    })

    contacts.forEach(contact => {
      contactIds.push(contact.id)
    })

    return contactIds
  }

  sanitizeIds(contactIds: any) {
    return new Set(contactIds)
  }

  broadcast = async() => {
    if(this.state.broadcast == "" || this.state.selectedIndexs == undefined || this.state.selectedIndexs.length == 0) {
      return
    }

    let contactIds = await this.getTenantsIds(this.state.selectedIndexs)

    contactIds = this.sanitizeIds(contactIds)

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

  getStyle(id: any) {
    if(this.isSelected(id)){
      return styles.selected
    } else {
      return styles.list
    }
  }

  renderItem = data =>
    <TouchableOpacity
      style={[styles.list, this.getStyle(data.id)]}
      onPress={() => this.updateIndexs(data.id)}
    >
      <Image source={{ uri: 'https://placeimg.com/180/180/any' }}
        style={{ width: 40, height: 40, margin: 6 }}
      />
      <Text style={styles.lightText}>{data.address + '\n' + data.description}</Text>
    </TouchableOpacity>

  isSelected(id: any) {
    return this.state.selectedIndexs.includes(id)
  }

  render() {
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
                subtitle={`${item.relationship} at ${item.property.address}, ${item.property.city}`}
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
              <FlatList
                data={this.state.properties}
                renderItem={({item}) =>
                  this.renderItem(item)
                }
                extraData={this.state.selectedIndexs}
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

const styles = StyleSheet.create({
  list: {
    margin: 3,
    flexDirection: "row",
    backgroundColor: "#A9A9A9",
    justifyContent: "flex-start",
    alignItems: "center",
    zIndex: -1,
    borderRadius: 5,
  },
  lightText: {
    color: "#f7f7f7",
    width: 200,
    paddingLeft: 15,
    fontSize: 16
   },
  selected: {backgroundColor: Colours.accent_blue},
});

ViewMessagesScreen.contextType = UserContext;
