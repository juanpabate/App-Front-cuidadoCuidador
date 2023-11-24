import { Text, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";
import { Image } from 'expo-image';
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Log({navigation: {navigate}}){

  const [user, setUser]= useState(' ');
  const [password, setPassword]= useState(' ');
  const [userError, setUserError]= useState(false);
  const [passwordError, setPasswordError]= useState(false);

  const [itsOk, setItsOk]= useState(false);

  useEffect(()=>{
    if(user!== ' ' && password!== ' '){
      setItsOk(true);
    }else if(userError== true || passwordError== true){
      setItsOk(false);
    }
  }, [user, password]);

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

  const handleNavigate= ()=>{
    validateIsFilled(user, setUserError);
    validateIsFilled(password, setPasswordError);

    if(itsOk== true){
      navigate('Main');
    };
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

      <View style={styles.socialMediaContainer}> 
        <Text style={styles.subText}>o continúa con</Text>
        <View style={styles.socialMediaIconsContainer} >
          <Image style={styles.socialMediaIcon} source={require('../../assets/images/login/facebook.svg')} />
          <Image style={styles.socialMediaIcon} source={require('../../assets/images/login/google.svg')} />
        </View>
      </View>

      <TouchableOpacity style={styles.registerAcount} onPress={()=> navigate('Register')}>
        <Text style={styles.registerAcountText} >Registrarse</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles= StyleSheet.create({
  logo: {
    width: 270,
    height: 220,
    contentFit: 'contain',
    marginBottom: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
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
    minHeight: 164,
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
    marginBottom: 10,
    backgroundColor: 'rgba(144, 226, 111, 0.34)',
    paddingLeft: 30,
  },
  buttonContainer: {
    backgroundColor: '#7FAF69',
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    marginTop: 37,
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
    marginBottom: 10,
    // marginTop: 5,
  },
  subText: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: '100%',
    textAlign: 'center',
    color: '#B0B0B0',
    fontSize: 16,
    paddingRight: 10,
  },
  socialMediaContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    gap: 10,
    width: 150,
    alignItems: 'center',
  },
  socialMediaIconsContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  socialMediaIcon: {
    width: 50,
    height: 50,
  },
  registerAcount: {
    marginTop: 30,
    alignItems: 'center',
  },
  registerAcountText: {
    color: '#7FAF69',
    fontSize: 18,
    fontWeight: 500,
  },
});