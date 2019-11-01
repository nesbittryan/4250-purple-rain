import { StyleSheet } from 'react-native';
import { AppColours } from './AppColours'
 
const MainApp = StyleSheet.create({
    container: {
      alignItems: "center",
      flex: 1,
      justifyContent: "center",
    },
    checkbox: {
      height:30,
      width:30
    },
    flatList: {
      
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
    picker: {
      flex: 1
    },
    button: {
      margin: "0.5%",
    },
    input: {
      margin: "0.5%"
    }
  })

export { MainApp }