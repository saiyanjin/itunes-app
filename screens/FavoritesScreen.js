import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { favoritesManager } from '../favoritesManager';

export default function FavoritesScreen({ navigation }) {
  const [favList, setFavList] = useState(favoritesManager.getFavorites());

  useEffect(() => {
    const unsubscribe = favoritesManager.subscribe(() => {
      setFavList([...favoritesManager.getFavorites()]);
    });
    return () => unsubscribe();
  }, []);

  const renderFavItem = ({ item }) => (
    <View style={styles.item}>
      {}
      <TouchableOpacity 
        style={{ flex: 1 }}
        onPress={() => navigation.navigate('Details', { track: item })}
      >
        <Text style={styles.title}>{item.trackName}</Text>
        <Text style={styles.artist}>{item.artistName}</Text>
        <Text style={styles.ratingText}>
          Note : {item.rating > 0 ? '⭐'.repeat(item.rating) : 'Pas encore noté'}
        </Text>
      </TouchableOpacity>
      
      {}
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity 
            key={star} 
            onPress={() => favoritesManager.updateRating(item.trackId, star)}
          >
            <Text style={{ fontSize: 20, marginRight: 4 }}>
              {star <= item.rating ? '★' : '☆'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {favList.length === 0 ? (
        <Text style={styles.emptyText}>Aucun favori pour le moment. Allez en ajouter !</Text>
      ) : (
        <FlatList
          data={favList}
          keyExtractor={(item) => item.trackId.toString()}
          renderItem={renderFavItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  item: { 
    padding: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  artist: { color: '#666' },
  ratingText: { marginTop: 6, color: '#ffb300', fontWeight: '500' },
  starsContainer: { flexDirection: 'row' },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#999', fontSize: 16 }
});