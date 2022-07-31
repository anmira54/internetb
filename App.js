import Navigation from "./components/Navigation";
import { LogBox } from 'react-native'; //This is to delete the warning of the firebase (AsyncStorage)



export default function App() {
  /* LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core']); */ //This is not working Need to Solve it
  return (
    <Navigation />
  );
}