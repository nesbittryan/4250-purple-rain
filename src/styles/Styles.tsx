import { StyleSheet } from 'react-native';

const MainApp = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    checkbox: {
      height:30,
      width:30
    },
    horizontal_container: {
      alignContent: "center",
      alignSelf: "center",
      flex: 1,
      flexDirection: 'row',
    },
    logo: {
      flex: 1,
      width: "80%",
      resizeMode: "contain",
      alignSelf: "center",
    },
    form: {
      flex: 1,
      justifyContent: "center",
      width: "80%",
    },
    button: {
      margin: "0.5%"
    },
    input: {
      margin: "0.5%"
    }
  })

export { MainApp }