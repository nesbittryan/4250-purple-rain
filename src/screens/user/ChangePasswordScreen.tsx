import React from "react";
import { View } from "react-native";
import { Button, Input, Text } from 'react-native-elements';

import { MainApp } from "../../styles/Styles";
import { APIService } from "../../service/APIService";

interface State {
    password: string,
    confirmPassword: string,
    userId: string
}

export default class ChangePasswordScreen extends React.Component {
    constructor(props: any) {
        super(props)
        this.handleStateChange = this.handleStateChange.bind(this)
        this.state.userId = this.props.navigation.getParam("user_id", "-1")
    }

    readonly state: State = {
        password: "",
        confirmPassword: "",
        userId: ""
    }

    handlePasswordChange() {
        if (this.state.password == this.state.confirmPassword && this.state.password.length > 7) {
            APIService.updateUserPassword(this.state.userId, this.state.password)
            this.props.navigation.goBack()
        }
    }

    handleStateChange(name: string, input: string) {
        this.setState(() => ({ [name]: input }));
    }

    render() {
        return (
          <View style={ MainApp.container }>
            <View style={ MainApp.form }>
              <View style= {{
                borderBottomWidth: 40,
                borderBottomColor: 'transparent' }}>
                <Text>New Password</Text>
                <Input value={ this.state.password }
                  onChangeText={(txt) => this.handleStateChange("address", txt)}
                  returnKeyType="next"/>
                <Text>Confirm New Password</Text>
                <Input value={ this.state.confirmPassword }
                  onChangeText={(txt) => this.handleStateChange("description", txt)}
                  returnKeyType="next"/>
              </View>
              <Button style={ MainApp.button } title="Confirm Change Password" onPress={ () => { this.handlePasswordChange() } } />
              <Button style={ MainApp.button } title="Cancel" onPress={ () => { this.props.navigation.goBack() } } />
            </View>
          </View>
        );
      }
}