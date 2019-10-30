import React from 'react'
import { View, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';

import { MainApp } from '../../styles/Styles'

export default class HomeScreen extends React.Component {

    userId: string = '' 

    constructor(props: any) {
        super(props)
        const property = this.props.navigation.getParam('property', 'error')
        AsyncStorage.getItem("user")
            .then((response: any) => {
                this.userId = JSON.parse(response).id
            })
    }
    
    render() {
        return (
            <View style={ MainApp.container}>
                <View style={ MainApp.form }>
                    <Button 
                        style={ MainApp.button }
                        title="New Payment" 
                        onPress={ () => { this.props.navigation.navigate("New", { userId: this.userId })}}></Button>
                </View>
            </View>
        )
    }
}