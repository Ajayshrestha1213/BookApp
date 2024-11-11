import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../firebaseConfig'; 
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      const querySnapshot = await getDocs(collection(db, 'borrowedBooks'));
      const borrowedBooksList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBorrowedBooks(borrowedBooksList);
    };

    fetchBorrowedBooks();
  }, []);

  const borrowBook = async (book) => {
    if (borrowedBooks.length >= 3) return false; // Limit to 3 books

    try {
      await addDoc(collection(db, 'borrowedBooks'), {
        bookId: book.id,
        title: book.title,
        author: book.author,
        coverImage: book.coverImage,
        rating: book.rating,
        summary: book.summary,
        borrowedAt: new Date(),
      });

      setBorrowedBooks((prevBooks) => [...prevBooks, book]);
      return true;
    } catch (error) {
      console.error('Error borrowing book:', error);
      return false;
    }
  };

  const returnBook = async (bookId) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'borrowedBooks'));
      querySnapshot.docs.forEach(async (doc) => {
        if (doc.data().bookId === bookId) {
          await deleteDoc(doc.ref);
        }
      });

      setBorrowedBooks(borrowedBooks.filter(book => book.id !== bookId));
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  return (
    <BooksContext.Provider value={{ borrowedBooks, borrowBook, returnBook }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => useContext(BooksContext);
