import React from "react";
import { View,Text, FlatList } from "react-native"
import { Button, Overlay, Input } from "react-native-elements";

import { getMaintenanceRequestsByProperty, createMaintenanceRequest } from '../../service/APIService'
import MRListItem from "./MRListItem";
import { Colours } from "../../res/Colours";
import { MaintenanceRequest } from "../../common/models/maintenanceRequest";
import UserContext from "../../context/UserContext";
import { AxiosResponse } from "axios";

interface State {
    isCreatingRequest: boolean
    isUserLandlord: boolean
    maintenanceRequests: MaintenanceRequest[]
    newRequestDescription: string
    propertyId: string
}

export default class MaintenanceRequestScreen extends React.Component<{navigation: any},{}>  {
    
    readonly state: State = {
        isCreatingRequest: false,
        isUserLandlord: this.props.navigation.state.params.isUserLandlord,
        maintenanceRequests: new Array(),
        newRequestDescription: '',
        propertyId: this.props.navigation.state.params.propertyId
    }

    userId = ''
    
    constructor(props: any) {
        super(props)
        this.handleCreateNewRequest = this.handleCreateNewRequest.bind(this)
        this.fetchData = this.fetchData.bind(this)
    }

    componentDidMount() {
        const { user } = this.context;
        this.userId = user.id;
        this.fetchData()
    }

    handleCreateNewRequest() {
        createMaintenanceRequest(this.state.propertyId, this.userId, this.state.newRequestDescription)
        .then((response: AxiosResponse<any> | undefined) => {
            if (response == undefined || response.status != 200) {
                alert("Unable to create maintenance request. Please try again")
            } else {
                this.fetchData()
                this.setState({ isCreatingRequest: false })
            }
        })
    }

    fetchData() {
        getMaintenanceRequestsByProperty(this.state.propertyId)
        .then((response: AxiosResponse<any> | undefined) => {
            if(response === undefined) {
                return
            } else if (response.status === 200) { 
                var maintenanceRequest: MaintenanceRequest[] = new Array()

                response.data.forEach((request: any) => {
                    maintenanceRequest.push({
                        creator: request.created_by,
                        description: request.description,
                        id: request.id,
                        property: request.property_id,
                        response: request.action,
                        status: request.status,
                        acknowledgedDate: request.acknowledged_date,
                        cancelledDate: request.cancelled_date,
                        createdDate: request.created_date,
                        estimatedResolvedDate: request.estimated_complete_date,
                        resolvedDate: request.complete_date
                    })
                })

                this.setState({ maintenanceRequests: maintenanceRequest })
            }
        })
    }

    render() {
        return (
            <View style={{backgroundColor:Colours.accent_blue}}>
                <Overlay isVisible={this.state.isCreatingRequest}>
                    <View>
                        <Input 
                            label="Description"
                            value={this.state.newRequestDescription}
                            onChangeText={(txt) => this.setState({ newRequestDescription: txt})}></Input>
                        <Button
                            containerStyle={{marginTop:'5%'}}
                            title="Create"
                            onPress={() => this.handleCreateNewRequest()}></Button>
                        <Button 
                            containerStyle={{marginTop:'2%'}}
                            type="outline"
                            title="Cancel"
                            onPress={() => { this.setState({ isCreatingRequest: false, newRequestDescription: ''})}}></Button>
                    </View>
                </Overlay>
                <Text style={{textAlign:'center',fontSize:20, color:Colours.accent_green, marginBottom:'3%', marginTop:'12%'}}>Maintenance Request</Text>
                <View style={{backgroundColor:Colours.white, width:'100%', display:'flex', 
                    flexDirection:'column', justifyContent:'center', paddingHorizontal:'5%', paddingTop:'2%'}}>
                    <FlatList
                        style={{borderColor:'red', borderWidth:1}}
                        onRefresh={ () => {}}
                        refreshing={false}
                        data={this.state.maintenanceRequests}
                        renderItem={({ item, index }) => (<MRListItem index={index} maintenanceRequest={item} onCallBack={this.fetchData}/>)}
                        keyExtractor={item => item.id}/>
                    { !this.state.isUserLandlord && 
                        <Button
                            title="Create New Request"
                            onPress={ () => { this.setState({ isCreatingRequest: true}) }} />
                    }
                    <Button
                        style={{marginTop: '1%'}} type="outline" title="Back"
                        onPress={ () => { this.props.navigation.goBack()}} />
                </View>
            </View>
        )
    }
}

MaintenanceRequestScreen.contextType = UserContext;