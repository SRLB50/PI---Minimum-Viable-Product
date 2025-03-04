import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

interface ModalProps {
  handleCloseModal: React.Dispatch<React.SetStateAction<boolean>>
  
}

const Modal: React.FC<ModalProps> = ({handleCloseModal}) => {

  return (
    <View className="h-[100%] justify-center items-center">
      <View style={styles.content}>
        <Text style={styles.title}>Serviço Cadastrado com sucesso!</Text>
        
        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.button} onPress={() => handleCloseModal(false)}>
            <Text >Voltar</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}

export default Modal;

const styles = StyleSheet.create({
  container: {

    alignItems: "center",
    justifyContent: "center"
  },
  content: {
    backgroundColor: "#FFF",
    width: "85%",
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 24
  },
  
  text: {
    color: "#FFF",
    fontWeight: 700
  },
  buttonArea: {
    flexDirection: "row",
    width: "90%",
    marginTop: 8,
    alignItems: "center",
    justifyContent: "space-between"

  },
  button: {
    flex: 1,
    alignItems: "center",
    marginTop: 14,
    marginBottom: 14,
    padding: 8
  }
})