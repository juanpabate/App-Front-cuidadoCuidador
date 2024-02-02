import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Image } from 'expo-image';
import ImageModal from 'react-native-image-modal';


import React from 'react'

const Ejercicio = ({navigation}) => {

  // const imageUri= 'https://media.post.rvohealth.io/wp-content/uploads/sites/3/2023/12/400x400_Exercises_for_Treating_and_Preventing_Runners_Knee_Straight_Leg_Lift.gif';
  const imageUri= 'https://www.icegif.com/wp-content/uploads/2022/07/icegif-470.gif'

  return (
    <View style={styles.mainContainer}>
      <Image source={require('../../assets/images/GuiaEjercicios/banner.png')} style={styles.banner} />

      <View style={[{width: '100%', marginLeft: 30, marginBottom: 15}]}>
        <TouchableOpacity style={[{width: 50, alignItems: 'center'}]} onPress={()=> navigation.goBack()}>
          <Text style={[{color: '#45B3CB', fontSize: 16}]}>Atrás</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        <Text style={[{fontSize: 22, color: '#45B3CB', fontWeight: 'bold'}]}>Nombre del ejercicio</Text>
        <View style={[{width: '100%', alignItems: 'center', marginVertical: 15, gap: 10}]}>
          
        <View style={{borderRadius: 15, overflow: 'hidden'}}>
          <ImageModal
            resizeMode="contain"
            imageBackgroundColor="#ffffff"
            source={{ uri: imageUri }}
            style={{ width: 240, height: 150,borderRadius: 15 }}
            isTranslucent={false}
          />
        </View>
          
          
          
          {/* <Image source={'https://media.post.rvohealth.io/wp-content/uploads/sites/3/2023/12/400x400_Exercises_for_Treating_and_Preventing_Runners_Knee_Straight_Leg_Lift.gif'} style={[{width: 150, height: 150,borderRadius: 15}]}/> */}
          <Text style={[{fontSize: 13, color: '#898989'}]}>Descripción del ejercicio...  Lorem ipsum dolor sit amet consectetur adipiscing elit fames curae vulputate ultriciesLorem ipsum dolor sit amet consectetur adipiscing elit.</Text>
        </View>

        <View style={[{width:'100%', paddingLeft: 5}]}>
          <Text style={[{fontSize: 22, color: '#45B3CB', fontWeight: 'bold', marginBottom: 7}]}>Indicaciones:</Text>
          <Text style={[{color: '#898989'}]}>1. Lorem ipsum dolor sit amet</Text>
          <Text style={[{color: '#898989'}]}>2. Lorem ipsum dolor sit amet</Text>
          <Text style={[{color: '#898989'}]}>3. Lorem ipsum dolor sit amet</Text>
        </View>

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
    // gap: 30,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    width: '95%'
  }

});

export default Ejercicio