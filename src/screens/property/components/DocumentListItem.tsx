import React, { Component } from "react";
import { TouchableHighlight, View, Text,Image, TouchableOpacity } from "react-native";
import { Property } from "../../../common/models/property";
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { User } from "../../../common/models/user";
import { StyleSheet } from 'react-native';
import { Document} from "../../../common/models/document";
import { Colours } from "../../../res/Colours";
import { getDocument } from "../../../service/S3";
import { ExternalStorageDirectoryPath } from "react-native-fs";
import { AxiosResponse } from "axios";
import UserContext from "../../../context/UserContext";
import { deleteDocument } from "../../../service/APIService";
var RNFS = require('react-native-fs');

Icon.loadFont()
interface State {
  
}

export default class DocumentListItem extends Component {
  readonly state: State = {
    
  }
  //userId: string
  //propertyId: string
  doc: Document
  fetchData: () => void
  constructor(props: any) {
    super(props)
    //this.setState({document: props.document})
    this.doc = props.document
    this.fetchData = props.fetchData
    console.log(this.doc.userId)
  }

  componentDidMount() {  
   
  }
  downloadFile() {
    console.log(this.doc)
    getDocument(this.doc.userId, this.doc.propertyId, this.doc.name).then((response: AxiosResponse<any> | undefined)=>{
      if(response === undefined) {
        return
      } else if (response.status === 200) { 
        //console.log(response.data) 
        let path = ExternalStorageDirectoryPath + "/" + this.doc.name
        //console.log(path)
        RNFS.writeFile(path, response.data, 'base64')
        .then((success:any) => {
          console.log('FILE WRITTEN!');
          alert("File has been downloaded to device")
        })
        .catch((err:any) => {
          console.log(err.message);
        });
      }
      //console.log("here")
    })
  } 
  
  deleteFile(){
    deleteDocument(this.doc.id).then((response)=>{
      if(response === undefined) {
        return
      } else if (response.status === 200) { 
        //console.log(response.data)
        alert("File has been deleted from the system")
        console.log('FILE DELETED!');
        this.fetchData()
      }
    })
  } 
  

  render() {
    return (
      <View style={DocumentListItemStyles.container}>
        <View style={DocumentListItemStyles.item}>
          <Text style={{fontSize: 10, alignSelf:"center"}}>{this.doc.name}</Text>
          <View style={DocumentListItemStyles.buttonContainer}>
            <TouchableOpacity
              onPress={this.downloadFile.bind(this)}
              style={DocumentListItemStyles.buttonBackground}
            >
              <Icon name="download" size={15} color={Colours.accent_green} />
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={this.deleteFile.bind(this)}
              style={DocumentListItemStyles.buttonBackground}
            >
             <Icon name="trash" size={15} color={Colours.accent_green} />

          </TouchableOpacity>
        </View>
        </View>
      </View>
    )
  }
}


const DocumentListItemStyles = StyleSheet.create({
  item: {
    width: "50%",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  buttonBackground:{ 
    width: 30,
    marginLeft: 5,
    backgroundColor: "#1B80AE",
    alignItems: "center",
    justifyContent: "center",
    height: 40
  },
  buttonText:{
    color: "#ffffff"
  },
  container: {
    flexDirection: "row",
    borderWidth:5,
    borderColor:'transparent',
    width:'100%',
  },
  button:{
    width: "50%",
    alignSelf: 'stretch',
  },
  buttonContainer: {
    
    flexDirection: "row",
    justifyContent: "space-evenly"
  }
})