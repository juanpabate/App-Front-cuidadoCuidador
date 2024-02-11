import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import React from 'react';

const TareaCard = ({nombre, fecha, hora, lugar, descripcion, isEmpty, navigation, isHome, isList}) => {
  return (
    <>
    {
      isEmpty == false &&
      <View style={[{backgroundColor: '#fff', flexDirection: 'row', paddingVertical: 10, borderRadius: 15, width: '90%', paddingHorizontal: 20, gap: 20}, isHome ? {width: '100%'}: {}, isList ? {marginBottom:15} : {}]}>
      <Image style={{width: 50, height: 50, contentFit: 'contain'}} source={require('../../assets/images/Tareas/Icon.png')}/>
      <View style={[{gap: 5}, isHome ? {gap: 2} : {}]}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{nombre}</Text>
        <Text>{fecha} - {hora}</Text>
        <View style={{backgroundColor: '#F4B860', alignItems: 'center', borderRadius: 15, marginBottom: 7}}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>{lugar}</Text>
        </View>
        <Text style={isHome ? null : {marginTop: 10}} >{descripcion}</Text>
      </View>
    </View>
    }
    {
      isEmpty== true && 
      <TouchableOpacity onPress={() => navigation.navigate('Tareas', { screen: 'AgregarTarea' })}
      style={{flexDirection: 'row', alignItems: 'center', gap: 15, backgroundColor: '#fff', padding: 20, width: '100%', borderRadius: 15}}>
        <View style={{backgroundColor: '#F4B860', borderRadius: 50, alignItems: 'center', justifyContent: 'center', width: 50, height: 50}}>
          <Image style={{width: 50, height: 50, contentFit: 'cover'}} source={require('../../assets/images/Tareas/Plus.svg')}/>
        </View>
        <Text style={{fontSize: 18}}>Agregar una nueva tarea</Text>
      </TouchableOpacity>
    }

    </>
    
  )
}

export default TareaCard