import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from 'expo-image';



const Card = ({navigate}) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={navigate}>
      <Image source={'https://media.post.rvohealth.io/wp-content/uploads/sites/3/2023/12/400x400_Exercises_for_Treating_and_Preventing_Runners_Knee_Straight_Leg_Lift.gif'} style={styles.cardImage} autoplay={false} />
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>Nombre del ejercicio</Text>
        <Text style={styles.cardText}>Descripción del ejercicio...</Text>
      </View>
    </TouchableOpacity>
  )
}


const ListaEjercicios = ({route, navigation}) => {

  const { parteDelCuerpo } = route.params;

  return (
    <View style={styles.mainContainer}>
      <Image source={require('../../assets/images/GuiaEjercicios/banner.png')} style={styles.banner} />

      <View style={[{width: '100%', marginLeft: 30, marginBottom: 10}]}>
        <TouchableOpacity style={[{width: 50, alignItems: 'center'}]} onPress={()=> navigation.goBack()}>
          <Text style={[{color: '#45B3CB', fontSize: 16}]}>Atrás</Text>
        </TouchableOpacity>
      </View>

      <Text style={[{fontSize: 27, fontWeight: 'bold', marginBottom: 15, width: '100%', paddingLeft: 20}]}>Ejercicios para <Text style={[{color: '#45B3CB'}]}>{parteDelCuerpo}</Text></Text>
      
      <View style={[{gap: 20, alignItems: 'center', width: '100%'}]}>
        <Card navigate={()=> navigation.navigate('Ejercicio')} />
        <Card navigate={()=> navigation.navigate('Ejercicio')}/>
        <Card navigate={()=> navigation.navigate('Ejercicio')}/>
      </View>
    </View>
  )
}

const styles= StyleSheet.create({
  banner: {
    width: '100%',
    height: 150,
    contentFit: 'contain',
    marginBottom: 15
  },
  mainContainer: {
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    padding: 20,
    paddingBottom: 290,
    // borderWidth: 2,
    // borderColor: 'red',
    paddingTop: 35,
    // paddingLeft: 50,
    // gap: 30,
  },
  cardContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 15,
    width: '90%',
    borderRadius: 15,
    gap: 15
  },
  cardImage: {
    width: 80,
    height: 80,
    contentFit: 'contain',
    borderRadius: 10
  },
  cardTextContainer: {
    paddingTop: 10,
    gap: 8
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#45B3CB'
  },
  cardText: {
    color: '#898989'
  }
});

export default ListaEjercicios