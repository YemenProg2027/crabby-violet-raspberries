import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { fetchUserBookings, cancelBooking } from '../services/api';

export default function UserBookingsScreen({ route }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = route.params;

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await fetchUserBookings(user);
        setBookings(data);
      } catch (error) {
        alert('Error loading bookings');
      } finally {
        setLoading(false);
      }
    };
    loadBookings();
  }, [user]);

  const handleCancel = async (bookingId, roomId) => {
    try {
      await cancelBooking(bookingId, roomId); // Cancel the booking and update room status
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );
      alert('Booking canceled successfully');
    } catch (error) {
      alert('Error canceling the booking');
    }
  };

  const renderBooking = ({ item }) => {
    const roomName = item.room.length > 0 ? item.room[0].name : 'No room name available';

    return (
      <View style={styles.bookingCard}>
        <Text style={styles.roomName}>Room: {roomName}</Text>
        <Text style={styles.status}>
          Status: <Text style={item.status === 'booked' ? styles.booked : styles.canceled}>{item.status}</Text>
        </Text>
        {item.status === 'booked' && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => handleCancel(item._id, item.room[0]._id)}
          >
            <Text style={styles.cancelButtonText}>Cancel Booking</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#d63384" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {bookings.length === 0 ? (
        <Text style={styles.emptyMessage}>No bookings found.</Text>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item._id}
          renderItem={renderBooking}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff0f6', // Light pink background
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookingCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  booked: {
    color: '#28a745', // Green for booked status
    fontWeight: 'bold',
  },
  canceled: {
    color: '#d63384', // Deep pink for canceled status
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#d63384', // Deep pink button
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyMessage: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
});
