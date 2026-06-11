import React from 'react';
import { View, Text, Image, StyleSheet, Button, Alert } from 'react-native';
import { favoritesManager } from '../favoritesManager';

export default function DetailScreen({ route, navigation }) {
  const { track } = route.params || {};

  if (!track) {
    return (
      <View style={styles.container}>
        <Text>Aucun morceau sélectionné.</Text>
      </View>
    );
  }

  const handleAddToFavorites = () => {
    favoritesManager.addFavorite(track);
    alert(`${track.trackName} a été ajouté à vos favoris !`);
    navigation.navigate('Favorites');
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: track.artworkUrl100 }} style={styles.cover} />
      
      <Text style={styles.title}>{track.trackName}</Text>
      <Text style={styles.artist}>Artiste : {track.artistName}</Text>
      <Text style={styles.album}>Album : {track.collectionName || 'Inconnu'}</Text>
      <Text style={styles.genre}>Genre : {track.primaryGenreName}</Text>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Ajouter aux Favoris" 
          onPress={handleAddToFavorites} 
          color="#4CD964"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#fff' },
  cover: { width: 200, height: 200, borderRadius: 10, marginBottom: 20, backgroundColor: '#eee' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  artist: { fontSize: 18, color: '#555', marginBottom: 5 },
  album: { fontSize: 16, color: '#777', marginBottom: 5 },
  genre: { fontSize: 14, color: '#aaa', marginBottom: 25 },
  buttonContainer: { width: '100%', maxWidth: 300 }
});