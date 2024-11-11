import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useBooks } from '../context/BooksContext';

const BookDetailScreen = ({ route, navigation }) => {
  const { book } = route.params;
  const { borrowBook } = useBooks();
  const [isBorrowing, setIsBorrowing] = useState(false);

  const handleBorrow = async () => {
    setIsBorrowing(true);

    const result = await borrowBook(book);

    if (result.success) {
      Alert.alert('Success', result.message);
    } else {
      Alert.alert('Limit Reached', result.message);
    }

    setIsBorrowing(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: book.coverImage }} style={styles.image} />
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>By {book.author}</Text>
      <Text style={styles.rating}>Rating: {book.rating}</Text>
      <View style={styles.summaryContainer}>
        <Text style={styles.summary}>{book.summary}</Text>
      </View>

      <TouchableOpacity
        style={[styles.borrowButton, isBorrowing && styles.disabledButton]}
        onPress={handleBorrow}
        disabled={isBorrowing}
      >
        <Text style={styles.borrowButtonText}>
          {isBorrowing ? 'Borrowing...' : 'Borrow This Book'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    color: '#777',
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  summaryContainer: {
    marginBottom: 30,
  },
  summary: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  borrowButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  borrowButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});

export default BookDetailScreen;
