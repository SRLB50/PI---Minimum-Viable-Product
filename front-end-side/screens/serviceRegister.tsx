import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Container } from '../components/Template/Container';
import { Button } from '../components/Template/Button';


interface Service {
  id: string;
  type: string;
  price: string;
}

const ServicesScreen: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');

  const addService = () => {
    if (type && price) {
      const newService: Service = {
        id: Math.random().toString(),
        type,
        price,
      };
      setServices([...services, newService]);
      setType('');
      setPrice('');
    }
  };

  const deleteService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
  };

  return (
    <Container>
      <Text style={styles.title}>Cadastrar Serviços</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Tipo de Serviço</Text>
        <TextInput style={styles.input} value={type} onChangeText={setType} placeholder="Ex: Pintura" />
        <Text style={styles.label}>Valor</Text>
        <TextInput style={styles.input} value={price} onChangeText={setPrice} placeholder="Digite um valor" keyboardType="numeric" />
        <Button onPress={addService} title="Salvar" />
      </View>
      
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.serviceCard}>
            <View>
              <Text style={styles.label}>Tipo de Serviço</Text>
              <Text style={styles.serviceText}>{item.type}</Text>
              <Text style={styles.label}>Valor</Text>
              <Text style={styles.serviceText}>R$ {item.price}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity>
                <Ionicons name="create-outline" size={24} color="orange" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteService(item.id)}>
                <Ionicons name="trash-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 20 },
  label: { fontSize: 12, color: 'gray', fontWeight: 'bold' },
  input: { borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 10, paddingVertical: 5 },
  serviceCard: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10 },
  serviceText: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
});

export default ServicesScreen;
