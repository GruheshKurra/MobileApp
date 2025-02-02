import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useTheme } from 'react-native-paper';

export default function CustomDrawerContent(props) {
  const { colors } = useTheme();
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: colors.background }}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}