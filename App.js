// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WorkEntryPage from './WorkEntryPage';
import WorkSelectionPage from './WorkSelectionPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WorkEntryPage">
        <Stack.Screen name="WorkEntryPage" component={WorkEntryPage} options={{ headerShown: false }} />
        <Stack.Screen name="WorkSelectionPage" component={WorkSelectionPage} options={{ title: 'Laskuri' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;







