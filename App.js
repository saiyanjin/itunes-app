import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import { favoritesManager } from './favoritesManager';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{ 
        headerShown: false,
        tabBarStyle: { height: 60, paddingBottom: 10 },
        tabBarLabelStyle: { fontSize: 14 },
        tabBarIcon: () => null, 
      }}>
      <Tab.Screen 
        name="SearchTab" 
        component={HomeScreen} 
        options={{ title: 'Recherche' }} 
      />
      <Tab.Screen 
        name="FavoritesTab" 
        component={FavoritesScreen} 
        options={{ title: 'Mes Favoris' }} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function initializeApp() {
      try {
        await favoritesManager.loadFavorites();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }
    initializeApp();
  }, []);

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.appContainer}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Main" 
            component={HomeTabs} 
            options={{ title: 'iTunes Seeker' }} 
          />
          <Stack.Screen 
            name="Details" 
            component={DetailScreen} 
            options={{ title: 'Détails du morceau' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    height: '100vh',
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  }
});