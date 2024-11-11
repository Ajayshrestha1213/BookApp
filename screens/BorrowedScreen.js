import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useBooks } from '../context/BooksContext';

const BorrowedScreen = () => {
  const { borrowedBooks, returnBook } = useBooks();

  return (
    <View style={styles.container}>
      <FlatList
        data={borrowedBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.coverImage }} style={styles.image} />
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.author}>By {item.author}</Text>
            <Text style={styles.rating}>Rating: {item.rating}</Text>
            <Text style={styles.summary}>{item.summary.slice(0, 100)}...</Text>
            
            <TouchableOpacity
              style={styles.returnButton}
              onPress={() => returnBook(item.id)}
            >
              <Text style={styles.returnButtonText}>Return</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  author: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  rating: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  summary: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  borrowedDate: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
  },
  returnButton: {
    backgroundColor: '#F44336',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 15,
  },
  returnButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BorrowedScreen;
