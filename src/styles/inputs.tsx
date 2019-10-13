import { StyleSheet } from 'react-native';

const error_style = StyleSheet.create({
    form: {
        borderWidth: 1,
        borderColor: "#cc0000"
    }
})

const valid_style = StyleSheet.create({
    form: {
        borderWidth: 1,
        borderColor: "#00cc00"
    }
})

export { error_style, valid_style }