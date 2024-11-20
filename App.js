import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HotelListScreen from './screens/HotelListScreen';
import HotelDetailsScreen from './screens/HotelDetailsScreen';
import RoomDetailsScreen from './screens/RoomDetailsScreen';
import UserBookingsScreen from './screens/UserBookingsScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#d63384' }, // Deep pink header
          headerTintColor: '#fff', // White text
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* Login and Register screens without headers */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} // Hide header for Login
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }} // Hide header for Register
        />
        {/* Main App Screens */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ route }) => ({
            headerLeft: null, // Removes back button
          })}
        />
        <Stack.Screen
          name="HotelList"
          component={HotelListScreen}
          options={{ title: 'Explore Hotels' }}
        />
        <Stack.Screen
          name="HotelDetails"
          component={HotelDetailsScreen}
          options={({ route }) => ({ title: route.params.hotel.name })}
        />
        <Stack.Screen
          name="RoomDetails"
          component={RoomDetailsScreen}
          options={({ route }) => ({ title: route.params.room.name })}
        />
        <Stack.Screen
          name="UserBookings"
          component={UserBookingsScreen}
          options={{ title: 'My Bookings' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
