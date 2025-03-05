import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useSelector } from 'react-redux';

const CustomButton = ({label, type, icon, onPress, onLongPress, additionnalStyle, isSmall}) => {
  const [isLongText, setIsLongText] = useState(false);
  const isTablet = useSelector((state) => state.screen.isTablet);

  useEffect(()=>{
    if(label.length >= 15){
      setIsLongText(true)
    }
  }, [label])

  return (
  <TouchableOpacity 
    style={[
      styles.container, 
      type == "green-full" && styles.greenFullContainer, 
      type == "white-outline" && styles.whiteOutlineContainer,
      type == "red-full" && styles.redFullContainer,
      isTablet && styles.containerTablet,
      isSmall && styles.smallContainer,
      additionnalStyle
    ]}
    onPress={onPress}
    onLongPress={onLongPress}
  >
    {icon && (
      <View>
        <FontAwesomeIcon icon={icon} size={30} color={type == "white-outline" ? "#1DB954" : "#000000"} />
      </View>
    )}
    <View style={[
      styles.txtContainer, 
      icon && styles.txtContainerPadding
    ]}>
      <Text style={[
        styles.txtButton, 
        type == "green-full" && styles.greenFullTxt, 
        type == "white-outline" && styles.whiteOutlineTxt,
        isLongText && styles.txtButtonLongText,
        isSmall && styles.smallTxt
      ]}
      >
        {label}
      </Text>
    </View>
  </TouchableOpacity>
  )
}

const styles = {
  container:{
    flexDirection:'row',
    width:'100%',
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:30,
    paddingHorizontal:30
  },
  containerTablet:{
    height:60,
  },
  smallContainer:{
    height:40,
    paddingHorizontal:10
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
    fontSize:18
  },
  txtButtonLongText:{
    fontSize:16
  },
  smallTxt:{
    fontSize:14
  },
  smallTxt:{
    fontSize:14
  },
  greenFullContainer:{
    backgroundColor:'#1DB954',
  },
  redFullContainer:{
    backgroundColor:'#FF0000',
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