import React from "react";
import { Component } from "react";
import { Button, Input } from 'react-native-elements';
import { Text, View, ImageBackground, Picker, FlatList, TextInput } from "react-native";
import { StyleSheet } from 'react-native';
import { User } from "../../common/models/user";
import { getTenantsInProperty, addTenantToPropertyByEmail } from "../../service/APIService";
import CoTenantListItem from "./components/CoTenantListItem";
import DocumentPicker from 'react-native-document-picker';
import { addDocument } from '../../service/S3';
var RNFS = require('react-native-fs');
var base64 = require('base-64');
import RNFetchBlob from 'rn-fetch-blob'
var RNGRP = require('react-native-get-real-path');

import {DocumentDirectoryPath,ExternalDirectoryPath, ExternalStorageDirectoryPath} from 'react-native-fs'
/*interface State {
    singleFile: string,
    multipleFile: string[]
  }*/

export default class DocumentsScreen extends Component<{propertyId: string}> {
  
  constructor(props: any) {
    super(props)
    this.state = {
        singleFile: '',
        multipleFile: [],
    }
    //console.log(this.propertyId)
  }

  componentDidMount() {
    //this.propertyId = this.props.propertyId
    //console.log(this.props.propertyId)
    this.fetchData()
  }
  async pickFile(){
    try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.images],
        });
        const data = new FormData();

        console.log("URI: " + res.uri)
        console.log("SIZE: " + res.size)
        console.log(ExternalStorageDirectoryPath)
        const exportedFileContent = await RNFS.readFile(res.uri, 'base64')
        console.log(exportedFileContent)
        addDocument("20", res.name, exportedFileContent);
        
       
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
          throw err;
        }
      }
  }

  fetchData() {
    
  }


  handleStateChange(name: string, input: string) {
    this.setState(() => ({ [name]: input }));
  }

  render() {
    return (
      <View style={LandLordOptionsStyles.container}>
        <View style={LandLordOptionsStyles.form}>
          <Text style={LandLordOptionsStyles.heading}>Documents</Text>
          <Button style={{margin: '0.5%', marginTop:'1%', alignSelf: "stretch"}} type="outline" title="Upload" onPress={ () => { this.pickFile() } } />   

          <Button style={{margin: '0.5%', marginTop:'1%', alignSelf: "stretch"}} type="outline" title="Back" onPress={ () => { this.props.navigation.goBack() } } />   
        </View>
      </View>
    );
  }
}


const LandLordOptionsStyles = StyleSheet.create({
  listContainer: {  
    alignItems: "center"
  },
  container: {
    alignItems: "flex-start",
  },
  form: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "98%",
    margin:"auto",
    paddingTop: 30
  },
  heading: {
    textAlign: "center",
    fontSize: 30,
    width: "100%",
    textDecorationLine: "underline"
  }, 
  formContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end"
  }
})