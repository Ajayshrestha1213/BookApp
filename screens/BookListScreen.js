import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBooks } from '../context/BooksContext'; 
import { db } from '../firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';

const BookListScreen = () => {
  const [books, setBooks] = useState([]);
  const { borrowBook } = useBooks();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchBooks = async () => {
      const booksCollection = await getDocs(collection(db, 'books'));
      setBooks(booksCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchBooks();
  }, []);

  const handleBorrow = (book) => {
    const success = borrowBook(book);
    if (success) {
      alert('Book borrowed successfully!');
    } else {
      alert('You can borrow only up to 3 books at a time!');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>{item.author}</Text>
            <Text style={styles.rating}>Rating: {item.rating}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('BookDetail', { book: item })}
              >
                <Text style={styles.buttonText}>View Details</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.borrowButton]} 
                onPress={() => handleBorrow(item)}
              >
                <Text style={styles.buttonText}>Borrow</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f4f4f4',  // Light background color
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  author: {
    fontSize: 16,
    color: '#777',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 30,
    alignItems: 'center',
    width: '48%',
  },
  borrowButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookListScreen;
