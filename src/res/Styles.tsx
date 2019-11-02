import { StyleSheet } from 'react-native';
import { Colours } from './Colours'
 
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
    datePicker: {

    },
    flatList: {
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      height: '85%',
      marginTop: '10%',
      justifyContent: 'space-between',
      width: "90%",
    },
    horizontal_container: {
      display: 'flex',
      flex: 3,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      margin: "2%"
    },
    input: {
      margin: "10%",
      alignSelf: 'center'
    },
    picker: {
      flex: 1,
      margin: "5%"
    },
    subtitle: {
      fontSize: 18,
    },
    title: {
      color: Colours.darker_green,
      fontSize: 28,
      fontWeight: '400',
    },
    tooltip: {
      color: Colours.darker_green,
      fontSize: 12,
      fontWeight: '200',
      fontStyle: 'italic',
      textAlign: 'center',
      textAlignVertical: 'center',
    }
  })

export { MainApp }