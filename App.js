import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/components/HomeScreen';
import VoucherCustomizationScreen from './src/components/VoucherCustomizationScreen';
import ContactSelectionScreen from './src/screens/ContactSelectionScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="VoucherCustomization" component={VoucherCustomizationScreen} />
        <Stack.Screen name="ContactSelection" component={ContactSelectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
