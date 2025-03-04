import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

type PropsAPI = {
  titulo: string
  valor: number,
  id: number,
  description: string
}

interface ModalProps {
  handleCloseModal: React.Dispatch<React.SetStateAction<boolean>>
  dataService: PropsAPI | undefined
}

const Modal: React.FC<ModalProps> = ({ handleCloseModal, dataService }) => {

  const [value, setValue] = useState<string>("0")

  useEffect(() => {
    const newValue = new Intl.NumberFormat('pt-bt', {
      style: "currency",
      currency: "BRL"
    }).format(dataService?.valor != undefined ? dataService?.valor : 0)

    setValue(newValue)
  }, [])

  return (
    <View className="h-[100%] justify-center items-center">
      <View style={styles.content}>
        <Text style={styles.title}>
          Serviço cadastrado com sucesso!
        </Text>

        <View>
          <Text>Serviço: {dataService?.titulo}</Text>
          <Text>Descrição: {dataService?.description}</Text>
          <Text>Valor: {value}</Text>
        </View>

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
    height: 300,
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 24,
    textAlign: "center"
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