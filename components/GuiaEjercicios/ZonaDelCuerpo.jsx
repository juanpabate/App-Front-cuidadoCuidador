import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image';

import React from 'react'


const Card = ({nombre, navigate}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={navigate}>
      <Text style={styles.cardText}>{nombre}</Text>
    </TouchableOpacity>
  )
};

const ZonaDelCuerpo = ({navigation}) => {

  return (
    <View style={styles.mainContainer}>
      <Image source={require('../../assets/images/GuiaEjercicios/banner.png')} style={styles.banner} />

      <Text style={[{fontSize: 20}]}>Elige la <Text style={[{fontWeight: 'bold'}]}>zona del cuerpo</Text> que quieres ejercitar</Text>

      <View style={styles.cardsContainer}>
        <Card nombre={'Cuello'}
              navigate={()=> navigation.navigate('ListaEjercicios', {parteDelCuerpo: 'cuello'})}/>
        <Card nombre={'Hombros'}
              navigate={()=> navigation.navigate('ListaEjercicios', {parteDelCuerpo: 'hombros'})}/>
        <Card nombre={'Espalda'}
              navigate={()=> navigation.navigate('ListaEjercicios', {parteDelCuerpo: 'espalda'})}/>
        <Card nombre={'Codos'}
              navigate={()=> navigation.navigate('ListaEjercicios', {parteDelCuerpo: 'codos'})}/>
      </View>
    </View>
  )
};

const styles= StyleSheet.create({
  banner: {
    width: '100%',
    height: 150,
    contentFit: 'contain',
    marginBottom: 10
  },
  mainContainer: {
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    padding: 20,
    paddingBottom: 290,
    // borderWidth: 2,
    // borderColor: 'red',
    paddingTop: 35,
    // gap: 30,
  },
  cardsContainer: {
    alignItems: 'center',
    width: '100%',
    gap: 20,
    marginTop: 15
  },
  card: {
    width: '75%',
    height: 85,
    backgroundColor: '#45B3CB',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardText: {
    color: '#fff',
    fontSize: 55,
    fontWeight: '800',
    // fontFamily: 'Nunito'
  }
});

export default ZonaDelCuerpo