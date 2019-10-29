import React from 'react'
import { View } from 'react-native';
import { Button } from 'react-native-elements';

import { MainApp } from '../../styles/Styles'

export default class HomeScreen extends React.Component {

    constructor(props: any) {
        super(props)
        const property =  this.props.navigation.getParam('property', 'error')
    }
    
    render() {
        return (
            <View style={ MainApp.container}>
                <View style={ MainApp.form }>
                    <Button title="New Payment"></Button>
                </View>
            </View>
        )
    }
}