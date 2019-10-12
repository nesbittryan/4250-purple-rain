import { StyleSheet } from 'react-native';

const default_style = StyleSheet.create({
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
  })

export { default_style }