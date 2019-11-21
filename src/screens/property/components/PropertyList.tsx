import * as React from 'react'
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ListItem } from "react-native-elements";

import { Property } from "../../../common/models/property";
import { Colours } from "../../../res/Colours";

const url = 'https://maps.googleapis.com/maps/api/streetview?size=300x200&location='
const key = '&key=AIzaSyCO4E3Yhrq01Y56FCm_bbj2dhF73PyzJiE'

export default class PropertyList extends React.Component<{navigation: Navigator,properties: Property[], refreshList:()=>void},{}> {
  
    render() {
      const properties = this.props.properties;
      return (
        <FlatList
          onRefresh={ () => { this.props.refreshList() }}
          refreshing={false}
          style={{
            backgroundColor:Colours.light_blue,
            width:'100%'
          }}
          data={properties}
          renderItem={({item}) =>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("View", {
                property: item,
                refreshList: this.props.refreshList
              })}>
              <ListItem
                titleStyle={{fontWeight:'bold'}}
                title={item.address}
                subtitle={item.description}
                leftAvatar={{rounded: false, source: {uri: url + item.address + ', ' + item.city + ', ' + item.state + ', ' + item.country + key }}}
              />
            </TouchableOpacity>
          }
          keyExtractor={item=>item.id}
        />
      )
    }
  }