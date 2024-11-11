import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BooksProvider } from './context/BooksContext';
import HomeStack from './navigation/HomeStack';
import BorrowedScreen from './screens/BorrowedScreen';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <BooksProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Borrowed') {
                  iconName = focused ? 'book' : 'book-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen 
              name="Home" 
              component={HomeStack}
              options={{ headerShown: false }}
            />
            <Tab.Screen 
              name="Borrowed" 
              component={BorrowedScreen}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </BooksProvider>
    </SafeAreaProvider>
  );
}
