import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { FloatingLabelInput } from 'react-native-floating-label-input'
import ShowPasswordIcon from './ShowPasswordIcon';
import HidePasswordIcon from './HidePasswordIcon';

const CustomInput = ({label, value, onChangeText, keyboardType, isPassword, error, removeBottomMargin}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, removeBottomMargin && styles.removeBottomMargin]}>
      <View style={styles.floatingLabelContainer}>
        <FloatingLabelInput
          label={label}
          isPassword={isPassword}
          value={value}
          onChangeText={value => onChangeText(value)}
          containerStyles={[styles.inputContainer, isFocused && styles.inputContainerFocused, error && styles.inputContainerError]}
          customLabelStyles={{
            colorBlurred:'black',
            colorFocused:'black',
            fontSizeFocused:14
          }}
          onFocus={()=>setIsFocused(true)}
          onBlur={()=>setIsFocused(false)}
          isFocused={isFocused}
          customShowPasswordComponent={<ShowPasswordIcon/>}
          customHidePasswordComponent={<HidePasswordIcon/>}
          keyboardType={keyboardType}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

const styles = {
  container:{
    width:'100%',
    marginBottom:20
  },
  removeBottomMargin:{
    marginBottom:0
  },
  floatingLabelContainer:{
    height:70, 
  },
  inputContainer:{
    borderWidth: 2,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderColor: 'lightgrey',
    borderRadius: 8,
  },
  inputContainerFocused:{
    borderColor: '#1DB954',
  },
  inputContainerError:{
    borderColor:'red',
  },
  error:{
    color:'red',
    fontSize:16,
    marginLeft:5
  },
}

export default CustomInput