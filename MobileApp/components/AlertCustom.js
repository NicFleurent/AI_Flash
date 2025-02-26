import { View, Text, Modal, TextInput, Button } from 'react-native'
import React from 'react'

const AlertCustom = ({ isVisible, onCancel }) => {
  return (
    <View>
      <Modal visible={isVisible} transparent={true} onRequestClose={onCancel}>
        <View style={styles.centre}>
          <View style={styles.modal}>
            <Text style={styles.titre}>Connexion</Text>
            <TextInput style={styles.input} placeholder="Email" />
            <TextInput style={styles.input} secureTextEntry placeholder="Mot de passe" />
            <Button title="Se connecter" onPress={onCancel} />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = {
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white'
  },
  centre: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
  modal: {
    margin: 15,
    backgroundColor: "darkcyan",
    borderRadius: 5,
    padding: 25,
    alignItems: "start",
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2, },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titre:{
    marginBottom: 15, textAlign:"center",
    color:"white",
    fontSize: 20,
  },
  input:{
    marginBottom: 15,
    borderWidth:1,
    borderColor:"white",
    backgroundColor:"white"
  }
    
    
}


export default AlertCustom