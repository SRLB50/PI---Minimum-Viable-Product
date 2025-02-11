import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const services = [
  { id: '1', status: 'Finalizado', title: 'Arrumar encanamento', name: 'Isaque Viana', address: 'Rua Emelina, São Paulo - SP', date: 'Janeiro 14', time: '10:00', color: 'green' },
  { id: '2', status: 'Pendente', title: 'Pintar Parede', name: 'João Estevão', address: 'Rua Joséfa, São Paulo - SP', date: 'Janeiro 14', time: '14:00', color: 'orange' },
  { id: '3', status: 'Cancelado', title: 'Trocar chuveiro', name: 'Andressa Nunes', address: 'Rua Marcilio, São Paulo - SP', date: 'Janeiro 14', time: '17:00', color: 'red' },
  { id: '4', status: 'Finalizado', title: 'ChapiscAR Parede', name: 'Andrei Pereira', address: 'Rua Almeida, São Paulo - SP', date: 'Janeiro 13', time: '10:00', color: 'green' },
  { id: '5', status: 'Finalizado', title: 'Montar Armário', name: 'Marcela Augusto', address: 'Rua João Goulart, São Paulo - SP', date: 'Janeiro 13', time: '15:00', color: 'green' },
];

const ServiceItem = ({ item }) => (
  <View style={styles.card}>
    <View style={[styles.statusBadge, { backgroundColor: item.color }]}> 
      <Text style={styles.statusText}>{item.status}</Text>
    </View>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.subtitle}>🔍 {item.name}</Text>
    <Text style={styles.subtitle}>📍 {item.address}</Text>
    <Text style={styles.date}>{item.date}</Text>
    <Text style={styles.time}>{item.time}</Text>
  </View>
);

export default function MyServices() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Meus Serviços</Text>
        <TouchableOpacity>
          <Ionicons name="filter-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={services}
        keyExtractor={item => item.id}
        renderItem={ServiceItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f3f3f3' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  headerText: { fontSize: 22, fontWeight: 'bold' },
  card: { backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 10 },
  statusBadge: { padding: 5, borderRadius: 5, alignSelf: 'flex-start' },
  statusText: { color: 'white', fontWeight: 'bold' },
  title: { fontSize: 18, fontWeight: 'bold', marginTop: 5 },
  subtitle: { fontSize: 14, color: 'gray' },
  date: { fontSize: 16, fontWeight: 'bold', alignSelf: 'flex-end' },
  time: { fontSize: 14, alignSelf: 'flex-end' },
});