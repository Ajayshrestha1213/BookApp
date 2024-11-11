import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
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
      const booksCollection = collection(db, 'books');
      const querySnapshot = await getDocs(booksCollection);
      const booksList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBooks(booksList);
    };

    fetchBooks();
  }, []);

  const handleBorrow = async (book) => {
    const result = await borrowBook(book);
    if (result.success) {
      Alert.alert('Success', result.message);
    } else {
      Alert.alert('Error', result.message);
    }
  };

  const handleNavigateToDetail = (book) => {
    navigation.navigate('BookDetail', { book }); // Navigate to BookDetail screen with book data
  };

  const renderBookItem = ({ item }) => {
    return (
      <View style={styles.bookContainer}>
        <TouchableOpacity onPress={() => handleNavigateToDetail(item)}>
          <Image source={{ uri: item.coverImage }} style={styles.coverImage} />
        </TouchableOpacity>
        <View style={styles.bookDetails}>
          <TouchableOpacity onPress={() => handleNavigateToDetail(item)}>
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
          <Text style={styles.author}>{item.author}</Text>
          <TouchableOpacity onPress={() => handleBorrow(item)} style={styles.borrowButton}>
            <Text style={styles.borrowButtonText}>Borrow</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  bookContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  coverImage: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  bookDetails: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 16,
    marginBottom: 10,
  },
  borrowButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  borrowButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default BookListScreen;
