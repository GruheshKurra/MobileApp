import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom }}
    >
      <View style={[styles.statusBarSpace, { height: insets.top }]} />
      
      <TouchableOpacity
        style={[styles.menuButton, { top: insets.top + 10 }]}
        onPress={() => navigation.toggleDrawer()}
      >
        <MaterialIcons name="menu" size={24} color={colors.text} />
      </TouchableOpacity>

      <View style={[styles.heroSection, { backgroundColor: colors.primary }]}>
        <Text style={styles.heroTitle}>Welcome to Blog App</Text>
        <Text style={styles.heroSubtitle}>
          Share your thoughts, ideas, and stories with the world.
        </Text>
      </View>

      <View style={styles.actionCardsContainer}>
        <TouchableOpacity
          style={[styles.actionCard, { backgroundColor: colors.surface }]}
          onPress={() => navigation.navigate('AddPost')}
        >
          <MaterialIcons name="add" size={32} color={colors.primary} />
          <Text style={[styles.actionCardText, { color: colors.text }]}>Add Post</Text>
          <Text style={[styles.actionCardSubtext, { color: colors.placeholder }]}>
            Create and share your new post
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionCard, { backgroundColor: colors.surface }]}
          onPress={() => navigation.navigate('ViewPosts')}
        >
          <MaterialIcons name="list" size={32} color={colors.primary} />
          <Text style={[styles.actionCardText, { color: colors.text }]}>View Posts</Text>
          <Text style={[styles.actionCardSubtext, { color: colors.placeholder }]}>
            Explore posts from the community
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.footer, { backgroundColor: colors.surface }]}>
        <Text style={[styles.footerText, { color: colors.placeholder }]}>
          © {new Date().getFullYear()} Blog App. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBarSpace: {
    width: '100%',
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
  heroSection: {
    padding: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    paddingTop: 80,
  },
  heroTitle: {
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.9,
  },
  actionCardsContainer: {
    padding: 20,
    gap: 16,
  },
  actionCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionCardText: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    marginTop: 12,
  },
  actionCardSubtext: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    marginTop: 6,
    textAlign: 'center',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    marginTop: 'auto',
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
  },
});