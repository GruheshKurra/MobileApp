import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

export default function BlogDetailScreen({ navigation, route }) {
  const { colors } = useTheme();
  const { post } = route.params;
  const scaleValue = new Animated.Value(1);

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

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        <Animated.View
          style={[
            styles.backButtonInner,
            { backgroundColor: colors.surface, transform: [{ scale: scaleValue }] },
          ]}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        </Animated.View>
      </TouchableOpacity>

      <View style={[styles.content, { paddingTop: 80 }]}>
        {post.image_url && (
          <Image
            source={{ uri: post.image_url }}
            style={styles.postImage}
            resizeMode="cover"
          />
        )}
        <Text style={[styles.postTitle, { color: colors.text }]}>{post.title}</Text>
        <Text style={[styles.postDescription, { color: colors.text }]}>{post.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  backButtonInner: {
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  postImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  postTitle: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  postDescription: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 24,
    textAlign: 'justify',
  },
});