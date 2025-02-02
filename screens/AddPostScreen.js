import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, TextInput, Alert, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '../supabase';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AddPostScreen({ navigation }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        setUser(user);
      } catch (error) {
        console.error('Error checking user:', error.message);
        Alert.alert('Error', 'Please log in to add posts');
        navigation.navigate('Login');
      }
    };

    checkUser();
  }, []);

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return false;
    }
    if (formData.title.length < 3) {
      Alert.alert('Error', 'Title must be at least 3 characters long');
      return false;
    }
    if (!formData.description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return false;
    }
    if (!formData.imageUrl.trim()) {
      Alert.alert('Error', 'Please enter an image URL');
      return false;
    }
    if (!formData.imageUrl.match(/^https?:\/\/.+\/.+$/)) {
      Alert.alert('Error', 'Please enter a valid image URL');
      return false;
    }
    return true;
  };

  const handleAddPost = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const { error } = await supabase.from('posts').insert([
        {
          title: formData.title.trim(),
          description: formData.description.trim(),
          image_url: formData.imageUrl.trim(),
          user_id: user.id,
        },
      ]);

      if (error) throw error;

      Alert.alert(
        'Success',
        'Post added successfully',
        [
          {
            text: 'View Posts',
            onPress: () => navigation.navigate('ViewPosts'),
          },
          {
            text: 'Add Another',
            onPress: () => {
              setFormData({
                title: '',
                description: '',
                imageUrl: '',
              });
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ label, value, onChangeText, placeholder, multiline, numberOfLines }) => (
    <View style={styles.inputWrapper}>
      <Text style={[styles.inputLabel, { color: colors.text }]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          multiline && styles.multilineInput,
          { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border },
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <TouchableOpacity
        style={[styles.menuButton, { top: insets.top + 10 }]}
        onPress={() => navigation.toggleDrawer()}
      >
        <MaterialIcons name="menu" size={24} color={colors.text} />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 60, paddingBottom: insets.bottom + 20 },
        ]}
      >
        <Text style={[styles.title, { color: colors.text }]}>Create New Post</Text>

        <View style={styles.form}>
          <InputField
            label="Title"
            value={formData.title}
            onChangeText={(value) => handleInputChange('title', value)}
            placeholder="Enter post title"
          />

          <InputField
            label="Description"
            value={formData.description}
            onChangeText={(value) => handleInputChange('description', value)}
            placeholder="Enter post description"
            multiline
            numberOfLines={4}
          />

          <InputField
            label="Image URL"
            value={formData.imageUrl}
            onChangeText={(value) => handleInputChange('imageUrl', value)}
            placeholder="Enter image URL (from Unsplash or similar)"
          />

          <TouchableOpacity
            onPress={handleAddPost}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={loading}
          >
            <Animated.View
              style={[
                styles.button,
                {
                  backgroundColor: colors.primary,
                  transform: [{ scale: scaleValue }],
                },
              ]}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Add Post</Text>
              )}
            </Animated.View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  menuButton: {
    position: 'absolute',
    left: 20,
    zIndex: 1,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  form: {
    gap: 20,
  },
  inputWrapper: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    marginLeft: 4,
  },
  input: {
    height: 56,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    borderWidth: 1,
  },
  multilineInput: {
    height: 120,
    paddingTop: 16,
    textAlignVertical: 'top',
  },
  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#fff',
  },
});