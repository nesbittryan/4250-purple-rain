import React from "react";
import { View } from "react-native";
import { Text, Button, Input, Icon } from "react-native-elements";
import DateTimePicker from '@react-native-community/datetimepicker';

import { Style } from "../../res/Styles";
import { MaintenanceRequest } from "../../common/models/maintenanceRequest";
import ButtonlessHeader from "../../common/components/ButtonlessHeader";
import { Colours } from "../../res/Colours";
import { markMaintenanceRequestCancelled, markMaintenanceRequestAcknowledged, updateMaintenanceRequest, markMaintenanceRequestCompleted } from "../../service/APIService";

interface State {
    estDate: Date
    newDescription: string
    newResponse: string

    isLandlord: boolean
    request: MaintenanceRequest
    userId: string
}

export default class ViewMaintenanceRequest extends React.Component  {
    
    readonly state: State = {
        estDate: new Date(),
        newDescription: this.props.navigation.state.params.request.description,
        newResponse: this.props.navigation.state.params.request.response,
        
        isLandlord: this.props.navigation.state.params.isLandlord,
        request: this.props.navigation.state.params.request,
        userId: this.props.navigation.state.params.userId,
    }

    constructor(props: any) {
        super(props)
        this.handleAcknowledgeRequest = this.handleAcknowledgeRequest.bind(this)
        this.handleCancelRequest = this.handleCancelRequest.bind(this)
        this.handleCompleteRequest = this.handleCompleteRequest.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    handleAcknowledgeRequest() {
        markMaintenanceRequestAcknowledged(this.state.request.id)
        .then((response: any) => {
            if(response != undefined && response.status == 200) {
                if (this.state.newResponse != '') {
                    this.handleUpdate()
                } else {
                    this.props.navigation.state.params.refreshList()
                    this.props.navigation.goBack()
                    alert("Request was successfully Acknowledged")
                }
            }
        })
    }

    handleCancelRequest() {
        markMaintenanceRequestCancelled(this.state.request.id)
        .then((response: any) => {
            if(response != undefined && response.status == 200) {
                this.props.navigation.state.params.refreshList()
                this.props.navigation.goBack()
                alert("Request was successfully Cancelled")
            }
        })
    }

    handleCompleteRequest() {
        markMaintenanceRequestCompleted(this.state.request.id)
        .then((response: any) => {
            if(response != undefined && response.status == 200) {
                this.props.navigation.state.params.refreshList()
                this.props.navigation.goBack()
                alert("Request was successfully completed")
            }
        })
    }

    handleUpdate() {
        updateMaintenanceRequest(this.state.request.id, this.state.newResponse, (this.state.isLandlord) ? '' : this.state.estDate.toISOString(), this.state.newDescription)
        .then((response: any) => {
            if(response != undefined && response.status == 200) {
                this.props.navigation.state.params.refreshList()
                this.props.navigation.goBack()
                alert("Request was successfully Updated")
            } else {
                alert("Invalid request, check date")
            }
        }) 
    }

    render() {
        return(
            <View style={Style.full_container}>
                <ButtonlessHeader text={this.state.request.status.toLocaleUpperCase() + " Maintenance Request"}/>
                <Input label="Tenant's Issue" value={this.state.newDescription} disabled={this.state.isLandlord}
                    onChangeText={(txt) => this.setState({ newDescription: txt})}></Input>
                <Input
                    label="Landlord's Response" value={this.state.newResponse} disabled={!this.state.isLandlord}
                    onChangeText={(txt) => this.setState({ newResponse: txt})}></Input>

                <View style={{width:'95%'}}>
                    <Text>{"Created on: " + this.state.request.createdDate}</Text>
                    <Text>{"Acknowledged on: " + this.state.request.acknowledgedDate}</Text>
                    <Text>{"Est. Complete on: " + this.state.request.estimatedResolvedDate}</Text>
                    <Text>{"Completed on: " + this.state.request.resolvedDate}</Text>
                    <Text>{"Cancelled on: " + this.state.request.cancelledDate}</Text>
                </View>

                {
                    this.state.isLandlord &&
                    <View style={{width:'95%'}}>

                    <DateTimePicker
                        onChange={ (event, val) => { this.setState({ estDate: val })}}
                        value={this.state.estDate}
                        mode="date"/>
                    
                    <Button disabled={this.state.request.status != 'requested'}
                        buttonStyle={{backgroundColor:Colours.accent_blue}}
                        style={{marginBottom:'2%'}} title='Acknowledge Request'
                        onPress={ this.handleAcknowledgeRequest }
                    />
                    <Button disabled={this.state.request.status != 'acknowledged'}
                        buttonStyle={{backgroundColor:Colours.accent_green}}
                        style={{marginBottom:'2%'}} title='Complete Request'
                        onPress={ this.handleCompleteRequest }
                    />
                    <Button style={{marginBottom:'2%'}} title='Back' type='outline'
                    onPress={ () => this.props.navigation.goBack() }
                    />
                </View>
                }

                {
                    !this.state.isLandlord &&
                    <View style={{width:'95%'}}>
                        <Button disabled={this.state.request.status != 'requested'}
                            buttonStyle={{backgroundColor:Colours.accent_green}}
                            style={{marginBottom:'2%'}} title='Update Request'
                            onPress={ this.handleUpdate }
                        />
                        <Button disabled={this.state.request.status != 'requested'}
                            buttonStyle={{backgroundColor:Colours.light_red}}
                            style={{marginBottom:'2%'}} title='Cancel Request'
                            onPress={ this.handleCancelRequest }
                        />
                        <Button style={{marginBottom:'2%'}} title='Back' type='outline'
                        onPress={ () => this.props.navigation.goBack() }
                        />
                    </View>
                }
                
            </View>
        )
    }
}