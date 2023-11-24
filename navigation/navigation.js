import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Log from "../components/Log/Login";
import Register from "../components/Log/Register";
import Home from "../components/Home";
import Notifications from "../components/Notifications";
import { Image } from 'expo-image';
import { View , Keyboard} from "react-native";
import { useState, useEffect } from "react";

const Stack= createStackNavigator();

const Tab = createBottomTabNavigator();

// ELEMENTO TAPBAR ICON
const tabBarIcon = (icon, iconActive, focused) => {
    return (
      <View style={{
        width: 30,
        height: 30,
        // borderWidth: 2,
        // borderColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
       <Image source={focused ? iconActive : icon} 
       style={{
        width: '100%',
        height: '100%',
        contentFit: 'contain',
      }}
       />
      </View>
    );
  };


export function MyStack (){
    return(
        <Stack.Navigator screenOptions={{headerShown: false}} >
            <Stack.Screen name="Login" component={Log} />
            <Stack.Screen name="Register" component={Register} options={{animationEnabled: false}}/>
            <Stack.Screen name="Main" component={TabNavigation} />
        </Stack.Navigator>
    )
};

export function TabNavigation() {

    const [keyboardActive, setKeyboardActive]= useState(false);

      // Función para manejar el evento de mostrar el teclado
    const handleKeyboardShow = () => {
      setKeyboardActive(true);
    };

    // Función para manejar el evento de ocultar el teclado
    const handleKeyboardHide = () => {
      setKeyboardActive(false);
    };

    // Suscribirse a los eventos del teclado
    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        handleKeyboardShow
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        handleKeyboardHide
      );

      // Asegúrate de eliminar los oyentes cuando el componente se desmonte
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []);

    return (
      <Tab.Navigator screenOptions={{ headerShown: false, 
        tabBarStyle: {
          // position: 'absolute',
          height: 80,
          marginTop: 10,
          display: keyboardActive ? 'none' : 'flex',
          // width: '90%',
          // marginHorizontal: 18,
          // padding: 5,
          // borderTopLeftRadius: 30,
          // borderTopRightRadius: 30,
          // justifyContent: 'center',
          // alignItems: 'center'
        }
      }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) =>
              tabBarIcon(
                require('../assets/images/TabBar/home.svg'),
                require('../assets/images/TabBar/homeActive.svg'),
                focused
              ),
            tabBarLabel: () => null, //ARROJAR UN OBJETO NULL PARA ANULAR EL NOMBRE DEL TAB
          }}
        />
        <Tab.Screen name="Notificaciones" 
            component={Notifications}
            options={{
            tabBarIcon: ({ focused }) =>
                tabBarIcon(
                require('../assets/images/TabBar/notifications.svg'),
                require('../assets/images/TabBar/notificationsActive.svg'),
                focused
                ),
            tabBarLabel: () => null,
            }}
        />
        <Tab.Screen name="Tareas" 
            component={Notifications}
            options={{
            tabBarIcon: ({ focused }) =>
                tabBarIcon(
                require('../assets/images/TabBar/tareas.svg'),
                require('../assets/images/TabBar/tareasActive.svg'),
                focused
                ),
            tabBarLabel: () => null,
            }}
        />
        <Tab.Screen name="Ejercicios" 
            component={Notifications}
            options={{
            tabBarIcon: ({ focused }) =>
                tabBarIcon(
                require('../assets/images/TabBar/ejercicios.svg'),
                require('../assets/images/TabBar/ejerciciosActive.svg'),
                focused
                ),
            tabBarLabel: () => null,
            }}
        />
        <Tab.Screen name="Foro" 
            component={Notifications}
            options={{
            tabBarIcon: ({ focused }) =>
                tabBarIcon(
                require('../assets/images/TabBar/foro.svg'),
                require('../assets/images/TabBar/foroActive.svg'),
                focused
                ),
            tabBarLabel: () => null,
            }}
        />
      </Tab.Navigator>      
    );
  }