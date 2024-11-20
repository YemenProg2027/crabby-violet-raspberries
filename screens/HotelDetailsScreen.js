import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { fetchRooms } from '../services/api';

export default function HotelDetailsScreen({ route, navigation }) {
  const { hotel, user } = route.params;
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const data = await fetchRooms(hotel._id);
        setRooms(data);
      } catch (error) {
        alert('Error loading rooms');
      }
    };
    loadRooms();
  }, [hotel]);

  const renderRoom = ({ item }) => (
    <TouchableOpacity
      style={styles.roomCard}
      onPress={() => navigation.navigate('RoomDetails', { room: item, user: user })}
    >
      <Text style={styles.roomName}>{item.name}</Text>
      <Text style={item.isBooked ? styles.booked : styles.available}>
        {item.isBooked ? 'Booked' : 'Available'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{hotel.name}</Text>
      <Text style={styles.subtitle}>{hotel.location}</Text>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item._id}
        renderItem={renderRoom}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>No rooms available.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff0f6', // Light pink background
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#d63384', // Deep pink
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  roomCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 15,
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  roomName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  booked: {
    fontSize: 16,
    color: '#d63384', // Deep pink for booked rooms
    fontWeight: 'bold',
  },
  available: {
    fontSize: 16,
    color: '#28a745', // Green for available rooms
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
});
