import { Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import { Image } from 'expo-image';
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AwesomeAlert from "react-native-awesome-alerts";
import NetInfo from "@react-native-community/netinfo";

import { useDispatch } from "react-redux";
import { iniciarSesion, cerrarSesion } from "../../context/userSlice";

import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Log({navigation}){

  const [email, setEmail]= useState(' ');
  const [password, setPassword]= useState(' ');
  const [userError, setUserError]= useState(false);
  const [passwordError, setPasswordError]= useState(false);

  const [itsOk, setItsOk]= useState(false);


  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState(''); 
  const [alertMessage, setAlertMessage] = useState('');
  const [alertCallback, setAlertCallback] = useState(null);


  useEffect(()=>{
    if(email!== ' ' && password!== ' '){
      setItsOk(true);
    }else if(userError== true || passwordError== true){
      setItsOk(false);
    }
  }, [email, password]);

  const handleUser= (e)=>{
    setUserError(false);
    if(e.nativeEvent.text == ''){
      setUserError(true);
    }
    setEmail(e.nativeEvent.text);
  };

  const handlePassword= (e)=>{
    setPasswordError(false);
    if(e.nativeEvent.text == ''){
      setPasswordError(true);
    }
    setPassword(e.nativeEvent.text);
  };

  const dispatch= useDispatch();

  //FUNCION DE LOGEO
  const handleNavigate= async()=>{

    // Si no está conectado a internet:
    const netInfoState = await NetInfo.fetch();
    if (!netInfoState.isConnected) {
      showAlertWithTitleAndMessage('Error de conexión', 'Por favor, enciende tu conexión a Internet.');
      setTimeout(() => {
        hideAlert();
      }, 1500);
      return;
    }

    //Si está conectado a internet:
    validateIsFilled(email, setUserError);
    validateIsFilled(password, setPasswordError);

    if (itsOk) {
      try {
        const response = await fetch('https://cuidado-cuidador-backend.onrender.com/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
  
        if (!response.ok) {
          const data = await response.json();
          if (response.status === 401) {
            // Credenciales no válidas desde el backend
            showAlertWithTitleAndMessage('Error', 'Usuario o contraseña incorrectos');
            setTimeout(() => {
              hideAlert();
            }, 1500);
          } else {
            const errorMessage = data.error || 'Error desconocido en el servidor';
            console.error('Error en la solicitud:', errorMessage);
          }
          return;
        }
  
        const data = await response.json();
  
        if (data.success) {
          showAlertWithTitleAndMessage('¡Hola!', 'Sesión iniciada correctamente');
          console.log('Datos de usuario recibidos del servidor:', data.usuario);
          const { nombre, apellido, id } = data.usuario;
          dispatch(iniciarSesion({ nombre: nombre, apellido: apellido, id: id }));
          setTimeout(() => {
            hideAlert();
            navigation.replace('Main');
          }, 1500);

          // Guardar en AsyncStorage
          const userData = { nombre, apellido, id };
          await AsyncStorage.setItem('userData', JSON.stringify(userData));

        } else {
          showAlertWithTitleAndMessage('Error', 'Credenciales no válidas');

          setTimeout(() => {
            hideAlert();
          }, 1500);
          // Las credenciales no son válidas
          console.error('Credenciales no válidas desde el front');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    }
  };

  const showAlertWithTitleAndMessage = (title, message, callback) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setShowAlert(true); // Muestra la alerta
    setAlertCallback(callback);
  };

  const hideAlert = () => {
    setShowAlert(false); // Oculta la alerta
    if (alertCallback) {
      alertCallback();
    }
  };

  function validateIsFilled(input, setInputError){
    if(input == ' '){
      setInputError(true);
      return;
    }
  };

  return(
    <SafeAreaView style={styles.container}>
     
      <Image style={styles.logo} source={require('../../assets/images/logo.png')} />

      <View style={styles.inputsContainer}>
        <TextInput textAlign="left" style={styles.input} placeholder="Ingresa tu correo o nombre de usuario" placeholderTextColor="#7FAF69" selectionColor={'#fff'} onChange={handleUser}></TextInput>
        {userError== true && 
        <Text style={styles.error}>Por favor rellene todos los campos</Text>
        }
        <TextInput textAlign="left" secureTextEntry={true} style={styles.input} placeholder="Contraseña" placeholderTextColor="#7FAF69" selectionColor={'#fff'} onChange={handlePassword}></TextInput>          
        {passwordError== true && 
        <Text style={styles.error}>Por favor rellene todos los campos</Text>
        }
      </View>
      <TouchableOpacity >
        <Text style={styles.subText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleNavigate}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerAcount} onPress={()=> navigation.replace('Register')}>
        <Text style={styles.registerAcountText} >Regístrate aquí</Text>
      </TouchableOpacity>

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={alertTitle}
        message={alertMessage}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={false}
      />

    </SafeAreaView>
  );
}

const styles= StyleSheet.create({
  logo: {
    width: 280,
    height: 260,
    contentFit: 'contain',
    marginBottom: 20,
    // borderWidth: 2,
    // borderColor: 'red',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  inputsContainer: {
    minHeight: 154,
    width: '100%',
    marginBottom: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  input: {
    width: '100%',
    borderRadius: 10,
    color: '#7FAF69',
    height: 70,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 5,
    backgroundColor: 'rgba(144, 226, 111, 0.34)',
    paddingLeft: 30,
  },
  buttonContainer: {
    backgroundColor: '#7FAF69',
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
    width: '100%',
    borderRadius: 10,
  },
  buttonText:{
    fontWeight: '500',
    color: '#fff',
    fontSize: 22,
  },
  error: {
    textAlign: 'center',
    width: '80%',
    color: 'white',
    fontWeight: 'bold',
    color: '#FF7670',
    // backgroundColor: '#FF7670',
    marginBottom: 5,
    // marginTop: 5,
  },
  subText: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: '100%',
    textAlign: 'center',
    color: '#B0B0B0',
    fontSize: 14,
    paddingRight: 10,
  },
  registerAcount: {
    marginTop: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 5,
    // borderRadius: 10,
    width: '45%'
  },
  registerAcountText: {
    color: '#7FAF69',
    fontSize: 19,
    fontWeight: '500',
  },
});