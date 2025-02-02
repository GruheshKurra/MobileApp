import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '../supabase';

export default function ProfileScreen({ navigation }) {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUserEmail = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email);
      }
    };

    fetchUserEmail();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.toggleDrawer()}
      >
        <MaterialIcons name="menu" size={24} color={colors.text} />
      </TouchableOpacity>

      <View style={[styles.content, { paddingTop: 80 }]}>
        <Text style={[styles.title, { color: colors.text }]}>Profile</Text>

        <View style={styles.profileInfo}>
          <Text style={[styles.label, { color: colors.placeholder }]}>Email:</Text>
          <Text style={[styles.email, { color: colors.text }]}>{email}</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileInfo: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 5,
  },
  email: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
  button: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#fff',
  },
});