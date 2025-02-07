import Ionicons from "react-native-vector-icons/Ionicons";
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({label, type, icon, onPress, onLongPress, additionnalStyle}) => {
  return (
  <TouchableOpacity 
    style={[
      styles.container, 
      type == "green-full" && styles.greenFullContainer, 
      type == "white-outline" && styles.whiteOutlineContainer,additionnalStyle
    ]}
    onPress={onPress}
    onLongPress={onLongPress}
  >
    {icon && (
      <View>
        <Ionicons name="add" size={30} color={type == "green-full" ? "#000000" : "#1DB954"} />
      </View>
    )}
    <View style={[
      styles.txtContainer, 
      icon && styles.txtContainerPadding
    ]}>
      <Text style={[styles.txtButton, type == "green-full" && styles.greenFullTxt, type == "white-outline" && styles.whiteOutlineTxt]}>{label}</Text>
    </View>
  </TouchableOpacity>
  )
}

const styles = {
  container:{
    flexDirection:'row',
    width:'100%',
    height:60,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:30,
    paddingHorizontal:30
  },
  txtContainer:{
    width:'100%',
    alignItems:'center'
  },
  txtContainerPadding:{
    paddingEnd:30
  },
  txtButton:{
    fontWeight:'bold',
    fontSize:20
  },
  greenFullContainer:{
    backgroundColor:'#1DB954',
  },
  greenFullTxt:{
    color:'black',
  },
  whiteOutlineContainer:{
    borderColor:'#ffffff',
    borderWidth: 2,
  },
  whiteOutlineTxt:{
    color:'white',
  },
}

export default CustomButton