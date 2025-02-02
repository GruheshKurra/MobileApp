import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';
import { useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '../supabase';

export default function ViewPostsScreen({ navigation }) {
  const { colors } = useTheme();
  const [posts, setPosts] = useState([]);
  const scaleValue = new Animated.Value(1);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching posts:', error.message);
      } else {
        setPosts(data);
      }
    };

    fetchPosts();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('BlogDetail', { post: item })}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          styles.postContainer,
          { backgroundColor: colors.surface, transform: [{ scale: scaleValue }] },
        ]}
      >
        {item.image_url && (
          <Image
            source={{ uri: item.image_url }}
            style={styles.postImage}
            resizeMode="cover"
          />
        )}
        <Text style={[styles.postTitle, { color: colors.text }]}>{item.title}</Text>
        <Text style={[styles.postDescription, { color: colors.text }]}>{item.description}</Text>
      </Animated.View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.toggleDrawer()}
      >
        <MaterialIcons name="menu" size={24} color={colors.text} />
      </TouchableOpacity>

      <View style={[styles.content, { paddingTop: 80 }]}>
        <Text style={[styles.title, { color: colors.text }]}>All Posts</Text>
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
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
  listContainer: {
    paddingBottom: 20,
  },
  postContainer: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 5,
  },
  postDescription: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
});