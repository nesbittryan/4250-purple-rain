import { StyleSheet } from 'react-native';
import { Colours } from './Colours'

const Style = StyleSheet.create({
  full_container: {
    alignItems:'center',
    display:'flex', 
    flexDirection:'column', 
    height:'100%', 
    justifyContent:'space-between', 
  },
  normal_text: {
    fontSize: 20,
    color: Colours.darker_blue
  },
  row_container: {
      display: 'flex',
      flexDirection: 'row',
      textAlignVertical: 'center',
      justifyContent: 'space-between',
      width: '95%'
  },
})
export { Style }