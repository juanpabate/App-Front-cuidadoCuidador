import { createStackNavigator } from "@react-navigation/stack";
import Log from "../components/Log/Login";
import Register from "../components/Log/Register";
import Home from "../components/Log/Home";

const Stack= createStackNavigator();

export default function MyStack (){
    return(
        <Stack.Navigator screenOptions={{headerShown: false}} >
            <Stack.Screen name="Login" component={Log} />
            <Stack.Screen name="Register" component={Register} options={{animationEnabled: false}}/>
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    )
};