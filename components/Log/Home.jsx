import { View, Text, Image, StyleSheet, StatusBar, ImageBackground, Platform } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#329b66" barStyle="light-content"></StatusBar>
      <View style={styles.tilteContainer}>
        <Image source={require('../../assets/images/home/user.png')} style={styles.img}/>
        <Text style={styles.welcome}>¡Hola Carolina!</Text>
        <Text style={styles.subtitle}>Usadas recientemente</Text>
      </View>

      <ImageBackground source={require('../../assets/images/home/circle.png')} style={styles.circleBackground}>
        <View style={styles.cardsContainer}>

          <View style={Platform.OS === 'android' ? styles.shadowAndroid : styles.shadowIos}>
            <Image source={require('../../assets/images/home/perfil.png')} style={styles.card}/>
          </View>
          <View style={Platform.OS === 'android' ? styles.shadowAndroid : styles.shadowIos}>
            <Image source={require('../../assets/images/home/notificaciones.png')} style={styles.card}/>
          </View>
          <View style={Platform.OS === 'android' ? styles.shadowAndroid : styles.shadowIos}>
            <Image source={require('../../assets/images/home/rutina.png')} style={styles.card}/>
          </View>
          <View style={Platform.OS === 'android' ? styles.shadowAndroid : styles.shadowIos}>
            <Image source={require('../../assets/images/home/logros.png')} style={styles.card}/>
          </View>

        </View>
      </ImageBackground>

      <View style={styles.buttonsContainer}>
          <View style={Platform.OS === 'android' ? styles.shadowAndroid : styles.shadowIos}>
            <Image source={require('../../assets/images/home/retos.png')} style={styles.button}/>
          </View>
          <View style={Platform.OS === 'android' ? styles.shadowAndroid : styles.shadowIos}>
            <Image source={require('../../assets/images/home/informacion.png')} style={styles.button}/>
          </View>
          <View style={Platform.OS === 'android' ? styles.shadowAndroid : styles.shadowIos}>
            <Image source={require('../../assets/images/home/comunidad.png')} style={styles.button}/>
          </View>
          <View style={Platform.OS === 'android' ? styles.shadowAndroid : styles.shadowIos}>
            <Image source={require('../../assets/images/home/soporte.png')} style={styles.button}/>
          </View>

      </View>


    </SafeAreaView>
    
  )
}

const styles= StyleSheet.create({
  container:{
    backgroundColor: '#34a666',
    alignItems: 'center',
    flex: 1,
    paddingTop: 20
  },
  tilteContainer:{
    alignItems: 'center',
    // borderColor: '#fff',
    // borderWidth: 1,
    width: 250,
    height: 150,
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  img: {
    width: 60,
    height: 60
    // resizeMode: 'contain',
  },
  welcome: {
    color: '#fff',
    fontSize: 33,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#fff',
    fontSize: 17,
  },
  circleBackground: {
    width: 200,
    height: 200,
    alignContent: 'center',
    position: 'relative',
    // borderColor: '#fff',
    // borderWidth: 1,
  },
  cardsContainer: {
    width: 220,
    height: 220,
    // borderColor: '#fff',
    // borderWidth: 1,
    top: '50%',
    left: '50%',
    marginTop: -110,
    marginLeft: -110,
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'absolute',
    alignContent: 'space-between',
    justifyContent: 'space-between'
  },
  card: {
    width: 100,
    height: 100,
    margin: 0,
  },
  shadowIos: {
    shadowColor: 'black', // Color de la sombra
    shadowOffset: { width: 1, height: 1 }, // Desplazamiento de la sombra
    shadowOpacity: 0.4, // Opacidad de la sombra
    shadowRadius: 5, // Radio de la sombra
  },
  shadowAndroid: {
    elevation: 5,
  },
  buttonsContainer: {
    // borderColor: '#fff',
    // borderWidth: 1,
    width: 315,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  button: {
    height: 120,
    width: 150,
    resizeMode:'contain',
    // borderColor: '#fff',
    // borderWidth: 1,
  }
})

export default Home