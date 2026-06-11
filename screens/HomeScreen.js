import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchITunes = async () => {
    if (!searchQuery) return;

    try {
      const formattedQuery = searchQuery.replace(/ /g, '+');
      const url = `https://itunes.apple.com/search?term=${formattedQuery}&media=music&limit=25&callback=jsonp_callback`;
      
      const response = await fetch(url);
      const textData = await response.text();
      
      const startIdx = textData.indexOf('(') + 1;
      const endIdx = textData.lastIndexOf(')');
      const cleanJsonText = textData.substring(startIdx, endIdx);
      
      const json = JSON.parse(cleanJsonText);
      setResults(json.results);

    } catch (error) {
      console.log("Mode Web/Local détecté ou API bloquée. Chargement des données de simulation.");
      
      const mockResults = [
        {
          trackId: 1001,
          trackName: `Morceau Simulé 1 (${searchQuery})`,
          artistName: "Artiste Exemple A",
          collectionName: "L'Album de Légende",
          primaryGenreName: "Rock",
          artworkUrl100: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&q=80"
        },
        {
          trackId: 1002,
          trackName: `Morceau Simulé 2 (${searchQuery})`,
          artistName: "Artiste Exemple B",
          collectionName: "Electro Summer",
          primaryGenreName: "Electronic",
          artworkUrl100: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&q=80"
        },
        {
          trackId: 1003,
          trackName: `Morceau Simulé 3 (${searchQuery})`,
          artistName: "Artiste Exemple C",
          collectionName: "Chill Vibes",
          primaryGenreName: "Pop",
          artworkUrl100: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=200&q=80"
        }
      ];
      
      setResults(mockResults);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.item}
      onPress={() => navigation.navigate('Details', { track: item })}
    >
      <Text style={styles.title}>{item.trackName}</Text>
      <Text>{item.artistName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher un artiste ou une piste..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Rechercher" onPress={searchITunes} />
      
      <FlatList
        data={results}
        keyExtractor={(item) => item.trackId.toString()}
        renderItem={renderItem}
      />
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginBottom: 10, paddingHorizontal: 8 },
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  footer: { marginTop: 20 }
});