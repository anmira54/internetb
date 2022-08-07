import Navigation from "./components/Navigation";
import { LogBox, Image } from 'react-native'; //This is to delete the warning of the firebase (AsyncStorage)

export default function App() {
  LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native']);
  LogBox.ignoreLogs(['expo-app-loading is deprecated']);
  return (
    <Navigation />
  );
}