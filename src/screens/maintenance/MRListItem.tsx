import React from "react";
import { View } from "react-native";
import { Button, Text } from 'react-native-elements'

import { MaintenanceRequest } from "../../common/models/maintenanceRequest";

export default class MRListItem extends React.Component<{ index: number, maintenanceRequest: MaintenanceRequest, onCallBack: () => void },{}> {

    render() {
        return(
            <View>
                <Text>{this.props.maintenanceRequest.description}</Text>
            </View>
        )
    }
}