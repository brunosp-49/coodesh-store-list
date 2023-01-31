import { NavigationContainer } from "@react-navigation/native";
import { StackActions } from "@react-navigation/routers";
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
            tabBarIcon: ({ focused, color, size }) => {
              return <Entypo name={"home"} size={size} color={color} />;
            },
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#1267fc',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle:{
              position: 'absolute',
              bottom: 14,
              left: 14,
              right: 14,
              elevation: 0,
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
            }}
            component={Home}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
