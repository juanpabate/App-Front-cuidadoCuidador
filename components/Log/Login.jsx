import { Text, TextInput, Image, TouchableOpacity, View, StyleSheet, Touchable, StatusBar} from "react-native";
import { LinearGradient } from "expo-linear-gradient";


export default function Log({navigation: {navigate}}){
  return(
    <View style={styles.container}>
      <StatusBar backgroundColor="#329b66" barStyle="light-content"></StatusBar>
      <View style={styles.logoContainer}>
        <Image source={require('../../images/Logo.png')} style={styles.logo}/>
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.inputsContainer}>
          <TextInput textAlign="center" style={styles.input} placeholder="Usuario" placeholderTextColor="#fff" selectionColor={'#fff'}></TextInput>
          <TextInput textAlign="center" style={styles.input} placeholder="Contraseña" placeholderTextColor="#fff" selectionColor={'#fff'}></TextInput>
        </View>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerAcount} onPress={()=> navigate('Register')}>
          <Text style={styles.subText} >¡Crea una cuenta!</Text>
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
    height: 145,
    width: '100%',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  input: {
    borderRadius: 25,
    color: 'white',
    height: 60,
    fontSize: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },
  buttonContainer: {
    backgroundColor: '#fff',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    marginTop: 17,
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
});