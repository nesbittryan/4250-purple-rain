import { StyleSheet } from 'react-native';

const MainApp = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
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