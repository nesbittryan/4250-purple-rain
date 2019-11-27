import React from "react";
import { Component } from "react";
import { Button, Input } from 'react-native-elements';
import { Text, View, ImageBackground, Picker, FlatList, TextInput } from "react-native";
import { StyleSheet } from 'react-native';
import { User } from "../../common/models/user";
import { getTenantsInProperty, addTenantToPropertyByEmail, createDocument, getLandlordsTenantsDocuments, getUsersDocuments, getLandlordByPropertyId } from "../../service/APIService";
import DocumentPicker from 'react-native-document-picker';
import { addDocument, getDocument } from '../../service/S3';
var RNFS = require('react-native-fs');


import {DocumentDirectoryPath,ExternalDirectoryPath, ExternalStorageDirectoryPath} from 'react-native-fs'
import UserContext from "../../context/UserContext";
import { Document} from "../../common/models/document";
import { AxiosResponse } from "axios";
import DocumentListItem from "./components/DocumentListItem";
import LandlordOptionsScreen from "./LandlordOptionsScreen";
interface State {
    userDocuments: Document[],
    landlordDocuments: Document[],
    newDocumentName: string
  }

export default class DocumentsScreen extends Component<{propertyId: string}> {
  readonly state: State = {
    userDocuments: [],
    landlordDocuments: [],
    newDocumentName: ""
  }
  propertyId = ""
  userId = ""
  isLandlord = false
  constructor(props: any) {
    super(props)
    this.propertyId =  this.props.navigation.getParam('propertyId', 'error')
    this.isLandlord = this.props.navigation.getParam('isLandlord', false)
    console.log("is landlord: " + this.isLandlord)
  }

  componentDidMount() {

    const { user } = this.context;
    this.userId = user.id;
    this.fetchData()
  }
  async pickFile(){
    try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.images],
        });
        
        const exportedFileContent = await RNFS.readFile(res.uri, 'base64')
        
        addDocument(this.userId, this.propertyId, this.state.newDocumentName, exportedFileContent);
        let url = `https://purple-rain-documents.s3.amazonaws.com/${this.userId}-${this.propertyId}/${this.state.newDocumentName}`
        createDocument(this.userId, this.propertyId,  url, this.state.newDocumentName)
        alert("Your document has been uploaded!")
        this.fetchData()
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
          throw err;
        }
      }
  }
  

  fetchData() {
    if(this.isLandlord == true) 
    {
      getLandlordsTenantsDocuments(this.userId).then((response: AxiosResponse<any> | undefined)=>{
        if(response === undefined) {
          return
        } else if (response.status === 200) { 
          var LLDocuments: Document[] = new Array()

          response.data.forEach((request: any) => {
            if(request.property_id == this.propertyId) {
              request.document.forEach((document: any) => {
                LLDocuments.push({
                  name: document.document_name,
                  propertyId: document.property_id,
                  userId: document.user_id,
                  url: document.document_url,
                  id: document.id
                })
              })
            }  
          })
          this.setState({ userDocuments: LLDocuments })
        }
      })
      getUsersDocuments(this.userId).then((response: AxiosResponse<any> | undefined)=>{
        if(response === undefined) {
          return
        } else if (response.status === 200) { 
          var UDocuments: Document[] = new Array()
          response.data.forEach((document: any) => {
            if(document.property_id == this.propertyId) {
              UDocuments.push({
                name: document.document_name,
                propertyId: document.property_id,
                userId: document.user_id,
                url: document.document_url,
                id: document.id
              })
            }  
          })
          this.setState({ landlordDocuments: UDocuments })
        }
      })
    }
    else 
    {
      console.log("user ID: " + this.userId)
      getUsersDocuments(this.userId).then((response: AxiosResponse<any> | undefined)=>{
        if(response === undefined) {
          return
        } else if (response.status === 200) { 
          var UDocuments: Document[] = new Array()
          response.data.forEach((document: any) => {
            if(document.property_id == this.propertyId) {
              UDocuments.push({
                name: document.document_name,
                propertyId: document.property_id,
                userId: document.user_id,
                url: document.document_url,
                id: document.id
              })
            }  
          })
          this.setState({ userDocuments: UDocuments })
        }
      })
      
      getLandlordByPropertyId(this.propertyId).then((landlords)=>{
        var LLDocuments: Document[] = new Array()
        landlords.forEach((LL: any)=>{
          getUsersDocuments(LL).then((response: any)=>{
            if(response === undefined) {
              return
            } else if (response.status === 200) { 
              response.data.forEach((document:any)=> {
                if(document.property_id == this.propertyId) {
                  
                  LLDocuments.push({
                    name: document.document_name,
                    propertyId: document.property_id,
                    userId: document.user_id,
                    url: document.document_url,
                    id: document.id
                  })
                  this.setState({ landlordDocuments: LLDocuments })
                }  
              })
            }
          })
        })
      })
    }
  }

  handleStateChange(name: string, input: string) {
    this.setState(() => ({ [name]: input }));
  }

  render() {
    return (
      <View style={DocumentsScreenStyles.container}>
        <View style={DocumentsScreenStyles.form}>
          <Text style={DocumentsScreenStyles.heading}>Documents</Text>
          <Input 
            label="Document Name"
            value={this.state.newDocumentName}
            onChangeText={(txt) => this.setState({ newDocumentName: txt.replace(/\s/g, '')})}></Input>
          
          <Button style={{margin: '0.5%', marginTop:'1%', alignSelf: "stretch"}} type="outline" title="Upload" onPress={ () => { this.pickFile() } } />   
          { this.isLandlord &&
          <View style={DocumentsScreenStyles.insideForm}>
            <Text style={DocumentsScreenStyles.subHeading}>Tenant Files</Text>
            <LandlordTenantDocList
              documentList={this.state.userDocuments}
              fetchData={this.fetchData.bind(this)}
            >
            </LandlordTenantDocList> 
            <Text style={DocumentsScreenStyles.subHeading}>My Files</Text>
            <LandlordTenantDocList
              documentList={this.state.landlordDocuments}
              fetchData={this.fetchData.bind(this)}
            >
            </LandlordTenantDocList> 
          </View>
          }
          { !this.isLandlord && 
            <View style={DocumentsScreenStyles.insideForm}>
              <Text style={DocumentsScreenStyles.subHeading}>Landlord Files</Text>
              <LandlordTenantDocList
                documentList={this.state.landlordDocuments}
                fetchData={this.fetchData.bind(this)}
              >
              </LandlordTenantDocList>
              <Text style={DocumentsScreenStyles.subHeading}>My Documents</Text>
              <LandlordTenantDocList
              documentList={this.state.userDocuments}
              fetchData={this.fetchData.bind(this)}
              >
              </LandlordTenantDocList>
            </View>
          }
          <Button style={{margin: '0.5%', marginTop:'1%', alignSelf: "stretch"}} type="outline" title="Back" onPress={ () => { this.props.navigation.goBack() } } />   
        </View>
      </View>
    );
  }
}

class LandlordTenantDocList extends Component<{documentList: Document[],fetchData: () => void}> {
  render() {
    return (
      
        <FlatList
          data={ this.props.documentList }
          style={{
            alignSelf: "stretch",
            
          }}
          renderItem={({item}) => <DocumentListItem document={ item }  fetchData={this.props.fetchData}></DocumentListItem> }>
        </FlatList>  
      
       
    )
  }
}



const DocumentsScreenStyles = StyleSheet.create({
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
    paddingTop: 15
  },
  insideForm: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "98%",
    margin:"auto",
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
  },
  subHeading: {
    fontSize: 15,
    marginTop:5,
    textDecorationLine: "underline",
  }
})
DocumentsScreen.contextType = UserContext;