import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    View,
} from 'react-native';

/**
 * A simple component which acts as a loading screen
 */
export default class AuthLoadingScreen extends React.Component {
    componentDidMount() {
    }

    // Render any loading content that you like here
    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}