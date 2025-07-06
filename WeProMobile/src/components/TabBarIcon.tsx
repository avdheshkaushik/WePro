import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface TabBarIconProps {
  route: any;
  focused: boolean;
  color: string;
  size: number;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ route, focused, color, size }) => {
  let iconName: keyof typeof Ionicons.glyphMap;

  if (route.name === 'Dashboard') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === 'Projects') {
    iconName = focused ? 'folder' : 'folder-outline';
  } else if (route.name === 'Tasks') {
    iconName = focused ? 'list' : 'list-outline';
  } else if (route.name === 'Profile') {
    iconName = focused ? 'person' : 'person-outline';
  } else {
    iconName = 'help-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

export default TabBarIcon; 