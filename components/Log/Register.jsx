import { Text, TextInput, TouchableOpacity, View, StyleSheet, StatusBar} from "react-native";
import { useState } from "react";


export default function Register({navigation: {navigate}}){

  const [user, setUser]= useState(' ');
  const [password, setPassword]= useState(' ');
  const [email, setEmail]= useState(' ');
  const [userError, setUserError]= useState(false);
  const [passwordError, setPasswordError]= useState(false);
  const [emailError, setEmailError]= useState(false);

  const [emailErrorMensaje, setEmailErrorMensaje]= useState('Por favor rellene todos los campos');


  const handleUser= (e)=>{
    setUserError(false);
    if(e.nativeEvent.text == ''){
      setUserError(true);
    }
    setUser(e.nativeEvent.text);
  };

  const handlePassword= (e)=>{
    setPasswordError(false);
    if(e.nativeEvent.text == ''){
      setPasswordError(true);
    }
    setPassword(e.nativeEvent.text);
  };

  const handleEmail= (e)=>{
    setEmailError(false);
    if(e.nativeEvent.text == ''){
      setEmailError(true);
    }
    setEmail(e.nativeEvent.text);
  };

  const handleNavigate= ()=>{
    const emailRegExp= /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const validateEmail= emailRegExp.test(email);

    if(validateEmail== false){
      setEmailError(true);
      setEmailErrorMensaje('Correo electrónico inválido');
    };

    validateIsFilled(user, setUserError);
    validateIsFilled(password, setPasswordError);
    validateIsFilled(email, setEmailError);

    if(user!== ' ' && password!== ' ' && email!== ' ' && validateEmail== true){
      navigate('Home');
    };
  };

  function validateIsFilled(input, setInputError){
    if(input == ' '){
      setInputError(true);
    }
  };
  return(
    <View style={styles.container}>
      {/* <StatusBar backgroundColor="#329b66" barStyle="light-content"></StatusBar> */}
      <View style={styles.logoContainer}>
        {/* <Image source={require('../../images/Logo.png')} style={styles.logo}/> */}
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.inputsContainer}>
          <TextInput textAlign="center" style={styles.input} placeholder="Nombre" placeholderTextColor="#fff" selectionColor={'#fff'} autoCorrect={false} onChange={handleUser}></TextInput>
          {userError== true && 
          <Text style={styles.error}>Por favor rellene todos los campos</Text>
          }
          <TextInput textAlign="center" style={styles.input} placeholder="Correo electrónico" placeholderTextColor="#fff" selectionColor={'#fff'} autoCorrect={false} onChange={handleEmail}></TextInput>
          {emailError== true && 
          <Text style={styles.error}> {emailErrorMensaje} </Text>
          }
          <TextInput textAlign="center" style={styles.input} placeholder="Contraseña" placeholderTextColor="#fff" selectionColor={'#fff'} secureTextEntry={true} onChange={handlePassword}></TextInput>
          {passwordError== true && 
          <Text style={styles.error}>Por favor rellene todos los campos</Text>
          }
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleNavigate}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerAcount} onPress={()=> navigate('Login')}>
          <Text style={styles.subText} >Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles= StyleSheet.create({
  logo: {
    width: 260,
    resizeMode: 'contain'
  },
  container: {
    alignItems: 'center',
    paddingTop: 30,
    flex: 1,
    backgroundColor: '#34a666',
  },
  logoContainer: {
    backgroundColor: '#329b66',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: '40%',
    borderBottomLeftRadius: 110,
    borderBottomRightRadius: 110,
  },
  after: {
    flex: 1,
  },
  dataContainer: {
    width: '80%',
    borderRadius: 15,
    shadowRadius: 3.84,
    padding: 15,
    marginTop: 35,
    alignItems: 'center',
  },
  inputsContainer: {
    minHeight: 200,
    width: '100%',
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    borderRadius: 25,
    color: 'white',
    height: 60,
    fontSize: 25,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 10,
  },
  buttonContainer: {
    backgroundColor: '#fff',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    marginTop: 5,
    width: '70%',
    borderRadius: 25,
  },
  buttonText:{
    fontWeight: 'bold',
    color: '#329b66',
    fontSize: 22,
  },
  registerAcount: {
    height: 25,
    marginTop: 20,
    width: '45%',
    justifyContent: 'center',
    fontSize: 10,
    backgroundColor: '#2f8e5a',
  },
  subText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  error: {
    textAlign: 'center',
    width: '80%',
    color: 'white',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#FF7670',
    marginBottom: 10,
    // marginTop: 5,
  }
});