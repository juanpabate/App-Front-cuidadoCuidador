import { Text, TextInput, TouchableOpacity, View, StyleSheet, StatusBar, ScrollView} from "react-native";
import { Image } from 'expo-image';

import AwesomeAlert from "react-native-awesome-alerts";


import { useState } from "react";


export default function Register({navigation}){

  const [nombre, setNombre]= useState('');
  const [apellido, setApellido]= useState('');
  const [password, setPassword]= useState('');
  const [email, setEmail]= useState('');
  const [verifyPassword, setVerifyPassword]= useState('');

  const [nombreError, setNombreError]= useState(false);
  const [apellidoError, setApellidoError]= useState(false);
  const [passwordError, setPasswordError]= useState(false);
  const [emailError, setEmailError]= useState(false);
  const [verifyPasswordError, setVerifyPasswordError]= useState(false);

  const [emailErrorMensaje, setEmailErrorMensaje]= useState('Por favor rellene todos los campos');

  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState(''); 
  const [alertMessage, setAlertMessage] = useState('');
  const [alertCallback, setAlertCallback] = useState(null);

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


  const verifySpaces= (text, setInput)=>{
    const hasSpaces = /\s/.test(text);

    if(hasSpaces){
      return;
    }
    setInput(text);
  };


  const handleNombre= (e)=>{
    setNombreError(false);
    if(e.nativeEvent.text == ''){
      setNombreError(true);
    }
    verifySpaces(e.nativeEvent.text, setNombre);
    // setNombre(e.nativeEvent.text);
  };

  const handleApellido= (e)=>{
    setApellidoError(false);
    if(e.nativeEvent.text == ''){
      setApellidoError(true);
    }
    verifySpaces(e.nativeEvent.text, setApellido)
    // setApellido(e.nativeEvent.text);
  };

  const handlePassword= (e)=>{
    setPasswordError(false);
    if(e.nativeEvent.text == ''){
      setPasswordError(true);
    }
    setPassword(e.nativeEvent.text);
  };

  const handleVerifyPassword= (e)=>{
    setVerifyPasswordError(false);
    if(e.nativeEvent.text == ''){
      setVerifyPasswordError(true);
    }
    setVerifyPassword(e.nativeEvent.text);
  };

  const handleEmail= (e)=>{
    setEmailError(false);
    if(e.nativeEvent.text == ''){
      setEmailError(true);
    }
    verifySpaces(e.nativeEvent.text, setEmail);
  };

  const handleNavigate = async () => {
    const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const validateEmail = emailRegExp.test(email);
  
    if (!nombre || !password || !email || !apellido || !verifyPassword) {
      setNombreError(true);
      setApellidoError(true);
      setPasswordError(true);
      setEmailError(true);
      setVerifyPasswordError(true);
      return;
    }
  
    if (!validateEmail) {
      setEmailError(true);
      setEmailErrorMensaje('Correo electrónico inválido');
      return;
    }

    if (password !== verifyPassword){
      showAlertWithTitleAndMessage('Error', 'Las contraseñas no coinciden');

      setTimeout(() => {
        hideAlert();
      }, 1500);
      return;
    }
  
    try {
      // Solicitud POST al servidor
      const response = await fetch('https://cuidado-cuidador-backend.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombre,
          apellido: apellido,
          email: email,
          contrasena: password,
        }),
      });
  
      if (!response.ok) {
        // Manejo del error 
        console.error('Error en la solicitud:', response.status);
        return;
      }
  
      // Manejo respuesta del servidor
      const data = await response.json();
      console.log('Respuesta del servidor:', data);
  
      // Redirigir al login
      navigation.replace('Login');
    } catch (error) {
      // Manejo de errores de solicitud
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return(
    <ScrollView style={styles.container}>
      {/* <StatusBar backgroundColor="#329b66" barStyle="light-content"></StatusBar> */}
      <View style={[{width: '100%', alignItems: 'center'}]}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo}/>
      </View>
      
      <View style={styles.dataContainer}>
        <View style={styles.inputsContainer}>

          <View style={[{width: '100%', alignItems: 'center'}]}>
            <TextInput textAlign="center" style={styles.input} placeholder="Nombre" placeholderTextColor="#7FAF69" selectionColor={'#fff'} autoCorrect={false} onChange={handleNombre} value={nombre}></TextInput>
            {nombreError== true && 
            <Text style={styles.error}>Por favor rellene todos los campos</Text>
            }
          </View>
          
          <View style={[{width: '100%', alignItems: 'center'}]}>
            <TextInput textAlign="center" style={styles.input} placeholder="Apellido" placeholderTextColor="#7FAF69" selectionColor={'#fff'} autoCorrect={false} onChange={handleApellido} value={apellido}></TextInput>
            {apellidoError== true && 
            <Text style={styles.error}>Por favor rellene todos los campos</Text>
            }
          </View>

          <View style={[{width: '100%', alignItems: 'center'}]}>
            <TextInput textAlign="center" style={styles.input} placeholder="Correo electrónico" placeholderTextColor="#7FAF69" selectionColor={'#fff'} autoCorrect={false} onChange={handleEmail} value={email}></TextInput>
            {emailError== true && 
            <Text style={styles.error}> {emailErrorMensaje} </Text>
            }
          </View>
          
          <View style={[{width: '100%', alignItems: 'center'}]}>
            <TextInput textAlign="center" style={styles.input} placeholder="Contraseña" placeholderTextColor="#7FAF69" selectionColor={'#fff'} secureTextEntry={true} onChange={handlePassword}></TextInput>
            {passwordError== true && 
            <Text style={styles.error}>Por favor rellene todos los campos</Text>
            }
          </View>

          <View style={[{width: '100%', alignItems: 'center'}]}>
            <TextInput textAlign="center" style={styles.input} placeholder="Confirmar contraseña" placeholderTextColor="#7FAF69" selectionColor={'#fff'} secureTextEntry={true} onChange={handleVerifyPassword}></TextInput>
            {verifyPasswordError== true && 
            <Text style={styles.error}>Por favor rellene todos los campos</Text>
            }
          </View>
          
        </View>

        <TouchableOpacity style={styles.buttonContainer} onPress={handleNavigate}>
          <Text style={styles.buttonText}>Envía registro</Text>
        </TouchableOpacity>

        <View style={[{width: '30%', height: 2, backgroundColor: '#D9D9D9', marginBottom: 20}]}></View>


        <Text style={[{color:'#7FAF69', fontSize: 18}]}>¿Ya tienes una cuenta?</Text>


        <TouchableOpacity style={styles.iniciarSesion} onPress={()=> navigation.replace('Login')}>
          <Text style={styles.subText} >Iniciar sesión</Text>
        </TouchableOpacity>
      </View>

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
    </ScrollView>
  );
}

const styles= StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    contentFit: 'contain'
  },
  container: {
    // alignItems: 'center',
    paddingTop: 30,
    flex: 1,
    backgroundColor: '#fff',
    // justifyContent: 'center'
  },
  dataContainer: {
    width: '100%',
    borderRadius: 15,
    shadowRadius: 3.84,
    // padding: 15,
    paddingHorizontal: 20,
    // marginTop: 35,
    alignItems: 'center',
  },
  inputsContainer: {
    // minHeight: 200,
    width: '100%',
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    gap: 10
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
    textAlign: 'left',
    // alignItems: 'flex-start'
    paddingLeft: 30,
  },
  buttonContainer: {
    backgroundColor: '#fff',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 5,
    width: '40%',
    borderRadius: 10,
    backgroundColor: '#7FAF69'
  },
  buttonText:{
    // fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
  iniciarSesion: {
    height: 25,
    marginTop: 10,
    width: '40%',
    justifyContent: 'center',
    backgroundColor: '#7FAF69',
    borderRadius: 10,
    height: 30
  },
  subText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#fff',
    // fontWeight: 'bold',
  },
  error: {
    textAlign: 'center',
    width: '80%',
    color: '#FF7670',
    // fontWeight: 'bold',
    // color: 'white',
    // backgroundColor: '#FF7670',
    position: 'absolute',
    bottom: -12
    // marginBottom: 10,
    // marginTop: 5,
  }
});