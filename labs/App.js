import { Button, StyleSheet, Text, View } from 'react-native';
import { Calculator } from './components/calculator/Calculator';
import { CompanyPage } from './components/company/CompanyPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Navigator } from './components/navigator/Navigator';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
            name="home"
            component={Navigator}
          />
          <Stack.Screen
            name="Calculator"
            component={Calculator}
          />
          <Stack.Screen
            name="Company"
            component={CompanyPage}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: "12px",
    width: "100%"
  }
});