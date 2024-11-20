import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBooking } from '../services/api';

export default function RoomDetailsScreen({ route, navigation }) {
  const { room, user } = route.params;

  const handleBooking = async () => {
    try {
      if (room.isBooked) {
        alert('Room is already booked');
        return;
      }

      const bookingData = {
        user: user,
        room: room,
        status: 'booked',
      };

      await createBooking(bookingData);
      alert('Room booked successfully!');
      navigation.goBack();
    } catch (error) {
      alert('Error booking room. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{room.name}</Text>
      <Text style={styles.info}>View: {room.view}</Text>
      <Text style={styles.info}>Beds: {room.beds}</Text>
      <Text style={styles.info}>
        Status: <Text style={room.isBooked ? styles.booked : styles.available}>{room.isBooked ? 'Booked' : 'Available'}</Text>
      </Text>
      <TouchableOpacity
        style={[styles.button, room.isBooked && styles.disabledButton]}
        onPress={handleBooking}
        disabled={room.isBooked}
      >
        <Text style={styles.buttonText}>{room.isBooked ? 'Room Unavailable' : 'Book Room'}</Text>
      </TouchableOpacity>
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
    marginBottom: 15,
  },
  info: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  booked: {
    color: 'red',
    fontWeight: 'bold',
  },
  available: {
    color: 'green',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#d63384', // Deep pink
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc', // Gray for disabled button
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
