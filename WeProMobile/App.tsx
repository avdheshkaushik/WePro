import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import ProjectsScreen from './src/screens/ProjectsScreen';
import TasksScreen from './src/screens/TasksScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';

// Components
import TabBarIcon from './src/components/TabBarIcon';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <TabBarIcon route={route} focused={focused} color={color} size={size} />
        ),
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{ title: 'Dashboard' }}
      />
      <Tab.Screen 
        name="Projects" 
        component={ProjectsScreen}
        options={{ title: 'Projects' }}
      />
      <Tab.Screen 
        name="Tasks" 
        component={TasksScreen}
        options={{ title: 'Tasks' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

function NavigationContent() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null; // You can add a loading screen here
  }

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? "Main" : "Onboarding"}
      screenOptions={{
        headerShown: false,
      }}
    >
      {isAuthenticated ? (
        <Stack.Screen name="Main" component={TabNavigator} />
      ) : (
        <>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <NavigationContent />
      </NavigationContainer>
    </AuthProvider>
  );
}
