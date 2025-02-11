import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FloatingLabelInput } from 'react-native-floating-label-input'

const CustomInput = ({label, value, onChangeText}) => {
  const [cont, setCont] = useState('');
  const [show, setShow] = useState(false);

  return (
    <View style={styles.container}>
      <FloatingLabelInput
        label={'label'}
        isPassword
        togglePassword={show}
        value={cont}
        onChangeText={value => setCont(value)}
        containerStyles={styles.inputContainer}
        customLabelStyles={{
          colorBlurred:'black',
          colorFocused:'black'
        }}
      />
    </View>
  )
}

const styles = {
  container:{
    height:75, 
    width:'100%',
    marginBottom:20
  },
  inputContainer:{
    borderWidth: 2,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderColor: '#1DB954',
    borderRadius: 8,
  },
}

export default CustomInput