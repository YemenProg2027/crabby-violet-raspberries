import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { Text } from 'react-native-paper';
import { fetchHotels } from '../services/api';
import { MaterialIcons } from '@expo/vector-icons'; // For the search icon

export default function HotelListAndSearchScreen({ route, navigation }) {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [query, setQuery] = useState('');
  const { user } = route.params;

  useEffect(() => {
    const loadHotels = async () => {
      try {
        const data = await fetchHotels();
        setHotels(data);
        setFilteredHotels(data); // Initially show all hotels
      } catch (error) {
        alert('Error loading hotels');
      }
    };
    loadHotels();
  }, []);

  const handleSearch = (text) => {
    setQuery(text);
    if (text.trim() === '') {
      setFilteredHotels(hotels); // Show all hotels if query is empty
    } else {
      const filtered = hotels.filter((hotel) =>
        hotel.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredHotels(filtered);
    }
  };

  const renderHotel = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('HotelDetails', { hotel: item, user: user })}
    >
      <Image source={{ uri: item.image }} style={styles.hotelImage} />
      <Text style={styles.hotelName}>{item.name}</Text>
      <Text style={styles.hotelLocation}>{item.location}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Your Perfect Hotel</Text>

      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Type hotel name"
          placeholderTextColor="#888"
          value={query}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={filteredHotels}
        keyExtractor={(item) => item._id}
        renderItem={renderHotel}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>No hotels match your search.</Text>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    borderColor: '#d63384',
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 20,
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  hotelImage: {
    width: '100%',
    height: 150,
    borderRadius: 15,
    marginBottom: 10,
  },
  hotelName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  hotelLocation: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
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
