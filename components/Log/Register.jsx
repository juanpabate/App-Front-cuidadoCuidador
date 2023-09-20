import { Text, TextInput, Image, TouchableOpacity, View, StyleSheet, Touchable} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Register({navigation: {navigate}}){
  return(
    <LinearGradient colors={['#066B10', '#fafafa']} start={{x: 0, y: 1}} end={{x: 0, y: 0.3}} style={styles.after}>
    <View style={styles.container}>
      <Image source={require('/Users/usuario/Documents/APP/app/images/Logo.png')} style={styles.logo}/>
      <View style={styles.dataContainer}>
        <Text style={styles.title}>Registro</Text>
        <Text style={styles.subTitle}>Ingresa los datos para registrarte</Text>
        <View style={styles.inputsContainer}>
          <TextInput style={styles.input} placeholder="Correo electrónico" selectionColor={'#066B10'}></TextInput>
          <TextInput style={styles.input} placeholder="Usuario" selectionColor={'#066B10'}></TextInput>
          <TextInput style={styles.input} placeholder="Contraseña" selectionColor={'#066B10'}></TextInput>
        </View>
        <TouchableOpacity style={styles.buttonContainer}>
          <LinearGradient  style={styles.button} colors={['#066B10', '#0EEB24']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} >
            <Text style={styles.buttonText}>Enviar</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.registerAcount}>
          <Text style={styles.subText}>¿Ya tienes una cuenta?</Text>
          <Text style={[styles.link, styles.subText]} onPress={()=> navigate('Login')}>Ingresa</Text>
        </View>
      </View>
    </View>
    </LinearGradient>
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
  },
  after: {
    flex: 1,
  },
  dataContainer: {
    width: 320,
    height: 430,
    backgroundColor: '#FFF',
    borderRadius: 15,
    shadowColor: "rgba(0, 0, 0, 0.09)",
    shadowOffset: {
      width: 7,
      height: 7,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 15,
    padding: 25,
    paddingTop: 30,
    marginTop: 25,
    paddingBottom: 10,
  },
  title: {
    fontSize: 25,
    color: '#066B10',
    fontWeight: 700,
  },
  subTitle: {
    color: '#A0A0A0',
    fontWeight: 700,
    fontSize: 15,
    marginTop: 5,
  },
  inputsContainer: {
    height: 215,
    marginTop: 20,

    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: '#efefef',
    borderRadius: 15,
    height: 60,
    gap: 30,
    fontSize: 20,
    paddingLeft: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    marginTop: 17,
    marginBottom: 20,
  },
  button: {
    width: 170,
    height: 45,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText:{
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 17,
  },
  registerAcount: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    fontSize: 10,
  },
  subText: {
    fontSize: 10,
  },
  link: {
    marginLeft: 5,
    color: '#066B10',
  },
});