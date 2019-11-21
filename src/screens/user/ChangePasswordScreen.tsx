import React from "react";
import { View } from "react-native";
import { Button, Input, Text } from 'react-native-elements';

import { Style } from "../../res/Styles";
import { updateUserPassword } from "../../service/APIService";
import ButtonlessHeader from "../../common/components/ButtonlessHeader";

interface State {
    oldPassword: string,
    password: string,
    confirmPassword: string,
    userId: string,
    email: string
}

export default class ChangePasswordScreen extends React.Component {
    constructor(props: any) {
        super(props)
        this.handleStateChange = this.handleStateChange.bind(this)
        this.state.userId = this.props.navigation.getParam("user_id", "-1")
        this.state.email = this.props.navigation.getParam("email", "error")
    }

    readonly state: State = {
        oldPassword: "",
        password: "",
        confirmPassword: "",
        userId: "",
        email: "",
    }

    handlePasswordChange() {
      if (this.state.password == this.state.confirmPassword && this.state.password.length > 7) {
          updateUserPassword(this.state.userId,this.state.email, this.state.password, this.state.oldPassword)
          this.props.navigation.goBack()
      }
    }

    handleStateChange(name: string, input: string) {
        this.setState(() => ({ [name]: input }));
    }

    render() {
        return (
          <View style={Style.full_container}>
                
            <ButtonlessHeader text="Changing Password"/>

            <Input
              label="Old Password"
              value={ this.state.oldPassword }
              onChangeText={(txt) => this.handleStateChange("oldPassword", txt)}
              returnKeyType="next"/>

            <Input 
              label="New Password"
              value={ this.state.password }
              onChangeText={(txt) => this.handleStateChange("password", txt)}
              returnKeyType="next"/>

            <Input 
              label="Confirm New Password"
              value={ this.state.confirmPassword }
              onChangeText={(txt) => this.handleStateChange("confirmPassword", txt)}
              returnKeyType="next"/>

            <View style={{width:'95%'}}>
              <Button style={{marginBottom:'1%'}} 
                title="Confirm Change Password" onPress={ () => { this.handlePasswordChange() } } />
              <Button style={{marginBottom:'2%'}} type="outline" title="Cancel" 
                onPress={ () => { this.props.navigation.goBack() } } />
            </View>

          </View>
        );
      }
}