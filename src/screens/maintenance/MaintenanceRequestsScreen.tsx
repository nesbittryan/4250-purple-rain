import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native"
import { Button, Overlay, Input, ListItem, Text } from "react-native-elements";
import { AxiosResponse } from "axios";
import { getMaintenanceRequestsByProperty, createMaintenanceRequest } from '../../service/APIService'
import UserContext from "../../context/UserContext";
import { MaintenanceRequest } from "../../common/models/maintenanceRequest";
import ButtonlessHeader from "../../common/components/ButtonlessHeader";
import { Style } from "../../res/Styles";

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
                this.setState({ isCreatingRequest: false, newRequestDescription: '' })
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
                        acknowledgedDate: (request.acknowledged_date == null) ? '' : request.acknowledged_date.substring(0,10),
                        cancelledDate: (request.cancelled_date == null) ? '' : request.cancelled_date.substring(0,10),
                        createdDate: (request.created_date == null) ? '' : request.created_date.substring(0,10),
                        estimatedResolvedDate: (request.estimated_complete_date == null) ? '' : request.estimated_complete_date.substring(0,10),
                        resolvedDate: (request.complete_date == null) ? '' : request.complete_date.substring(0,10),
                    })
                })

                this.setState({ maintenanceRequests: maintenanceRequest })
            }
        })
    }

    render() {
        return (
            <View style={Style.full_container}>
                
                <ButtonlessHeader text="Maintenance Requests"/>
                
                <FlatList
                    style={{width:'100%'}}
                    onRefresh={ () => { this.fetchData() }}
                    refreshing={false}
                    data={this.state.maintenanceRequests}
                    renderItem={({item}) =>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("ViewMaintenanceRequest", {
                                isLandlord: this.state.isUserLandlord,
                                request: item,
                                refreshList: this.fetchData,
                                userId: this.userId
                            })}>
                            <ListItem
                                titleStyle={{fontWeight:'bold'}} title={item.description}
                                subtitle={item.createdDate} />
                        </TouchableOpacity>
                    }
                    keyExtractor={item => item.id}/>
                
                <View style={{width:'95%'}}>
                    { !this.state.isUserLandlord && 
                        <Button
                            style={{marginBottom:'1%'}} title="Create New Request"
                            onPress={ () => { this.setState({ isCreatingRequest: true}) }} />
                    }
                    <Button 
                        style={{marginBottom:'2%'}} type="outline" title="Back"
                        onPress={ () => { this.props.navigation.goBack()}} />
                </View>

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
            </View>
        )
    }
}

MaintenanceRequestScreen.contextType = UserContext;