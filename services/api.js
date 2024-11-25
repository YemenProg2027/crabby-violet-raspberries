import axios from 'axios';

const API_BASE_URL = 'https://hotel-58ce.restdb.io/rest';
const API_KEY = 'a7d849aef5dc96325b62ea171c284af1f70a2';

const headers = {
  'Content-Type': 'application/json',
  'x-apikey': API_KEY,
};

// Login user
export const loginUser = async (email, password) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`, {
      headers,
      params: {
        q: JSON.stringify({ email, password }), // Filter users by email and password
      },
    });

    console.log(response.data);
    return response.data.length > 0 ? response.data[0] : null; // Return user if found
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, userData, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

export const checkEmailExists = async (email) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`, {
      headers,

      params: {
        q: JSON.stringify({ email }), // Filter users by email and password
      },
    });

    return response.data.length > 0; // True if email exists
  } catch (error) {
    console.error('Error checking email:', error);
    throw error;
  }
};

// Fetch all hotels
export const fetchHotels = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/hotels`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
};

// Fetch rooms for a hotel
export const fetchRooms = async (hotelId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rooms?hotel=${hotelId}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};

// Create a booking and update room status
export const createBooking = async (data) => {
  try {
    // Create the booking
    const response = await axios.post(`${API_BASE_URL}/bookings`, data, {
      headers,
    });

    // Update the room status to "booked"
    await updateRoomStatus(data.room._id, true);

    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

// Fetch user bookings
// Fetch user bookings
export const fetchUserBookings = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings`, {
      headers,
      params: {
        q: JSON.stringify({ user: userId }), // Query for bookings with the specific user ID
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching bookings:',
      error.response?.data || error.message
    );
    throw new Error('Unable to fetch user bookings.');
  }
};

// Cancel a booking and update room status
export const cancelBooking = async (bookingId, roomId) => {
  try {
    // Cancel the booking
    const response = await axios.delete(
      `${API_BASE_URL}/bookings/${bookingId}`,
      {
        headers,
      }
    );

    // Update the room status to "not booked"
    await updateRoomStatus(roomId, false);

    return response.data;
  } catch (error) {
    console.error('Error canceling booking:', error);
    throw error;
  }
};

// Update room booking status
export const updateRoomStatus = async (roomId, isBooked) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/rooms/${roomId}`,
      { isBooked }, // Update the isBooked field
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating room status:', error);
    throw error;
  }
};
