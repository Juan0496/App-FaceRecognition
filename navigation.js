import {NavigationContainer} from "@react-navigation/native"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Home from "./screens/home"
import About from "./screens/about"
import { Ionicons } from '@expo/vector-icons';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Login from "./screens/login";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StackGroup(){
    return(
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="TabGroup" component={TabGroup}/>
        </Stack.Navigator>
    )
}

function TabGroup() {
    return(
        <Tab.Navigator
        screenOptions={({route})=>({
            
            tabBarIcon: ({color,focused,size})=>{
                let iconName;
                if(route.name === "Home"){
                    iconName= focused ? "home" : "home-outline";
                }
                else if(route.name === "About"){
                    iconName= focused ? "information-circle" : "information-circle-outline"
                }
                return <Ionicons name={iconName} color={color} size={size}/>
            }
        })}     
        >
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="About" component={About}/>
        </Tab.Navigator>
    )
}

export default function Navigation(){
    return(
        <NavigationContainer>
            <StackGroup/>
        </NavigationContainer>
    )
}
