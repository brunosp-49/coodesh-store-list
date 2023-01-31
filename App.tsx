import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./src/view/Home";
import { Entypo } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home} />
    </Stack.Navigator>
  )
}


export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#1267fc',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              position: 'absolute',
              bottom: 14,
              left: 14,
              right: 14,
              elevation: 0,
              height: 60,
              borderRadius: 4,
              backgroundColor: '#1f1f24',
              borderTopWidth: 0
            },
          })}
        >
          <Tab.Screen
            name="Home"
            options={{
              title: "",
              headerTransparent: true,
              headerShadowVisible: false,
              tabBarIcon: ({ focused, color, size }) => (
                <Entypo name={"home"} size={size} color={color} />
              ),
            }}
            component={Home}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
