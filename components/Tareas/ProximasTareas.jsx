import { View, Text, StyleSheet, TouchableOpacity, RefreshControl, FlatList } from 'react-native'
import React from 'react'
import { useState, useEffect, useCallback } from 'react';
import { Image } from 'expo-image';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import TareaCard from './TareaCard';

const ProximasTareas = ({navigation}) => {

  const [tareas, setTareas] = useState();

  const usuario = useSelector((state) => state?.usuario);

  const obtenerTareasUsuario = async () => {
    try {
      const response = await fetch(`https://cuidado-cuidador-backend.onrender.com/tareas/${usuario.id}`);
      if (!response.ok) {
        throw new Error('Error al obtener las tareas del usuario');
      }
      const data = await response.json();
      setTareas(data);
    } catch (error) {
      console.error('Error al obtener las tareas del usuario:', error);
    }
  };


  useEffect(() => {
    obtenerTareasUsuario();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      obtenerTareasUsuario();
      console.log(tareas);
    }, [usuario])
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    
    try {
      // Lógica de actualización o recarga de datos
      await obtenerTareasUsuario();
    } catch (error) {
      console.error('Error al refrescar:', error);
    } finally {
      setRefreshing(false);
    }
  }, [obtenerTareasUsuario]);

  return (
    <View style={styles.mainContainer}>

      <Image style={styles.banner} source={require('../../assets/images/Tareas/banner.png')} />

      <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingHorizontal: 10, alignItems: 'flex-end'}}>
        <View style={{gap: 10}}>
          <TouchableOpacity style={{width: 50}} onPress={()=> navigation.goBack()}>
            <Text style={{color: '#F4B860', fontSize: 18}} >Atrás</Text>
          </TouchableOpacity>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>Todas las tareas</Text>
        </View>
        <TouchableOpacity onPress={()=> navigation.navigate('AgregarTarea')} style={{backgroundColor: '#F4B860', borderRadius: 50, alignItems: 'center', justifyContent: 'center', width: 50, height: 50}}>
          <Image style={{width: 50, height: 50, contentFit: 'cover'}} source={require('../../assets/images/Tareas/Plus.svg')}/>
        </TouchableOpacity>
      </View>

      {tareas &&
        <FlatList
          data={tareas}
          keyExtractor={(item) => item.idTarea.toString()}
          renderItem={({ item }) => (
            <TareaCard 
              nombre={item.nombreTarea}
              fecha={new Date(item.Fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: '2-digit'})}
              hora={new Date(`1970-01-01T${item.Hora}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              lugar={item.Lugar}
              descripcion={item.Descripcion}
              isEmpty={false}
              isHome={true}
              isList={true}
            />
          )}
        style={styles.tareasContainer} 
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#F4B860', '#FFF']}/>}
        />
      }
      
      

    </View>
  )
}

const styles= StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    padding: 20,
    paddingBottom: 195,
    // borderWidth: 2,
    // borderColor: 'red',
    paddingTop: 35,
    // width: '100%'
  },
  banner: {
    width: '100%',
    height: 110,
    contentFit: 'contain',
    marginBottom: 20
    // borderWidth: 2,
    // borderColor: 'red',
  },
  tareasContainer: {
    width: '90%',
    marginTop: 20,
    // borderWidth: 2,
    // borderColor: 'red',
    // alignItems: 'center'
    // height: '100%',
    // marginBottom: 50
    // flex: 1
  },
});

export default ProximasTareas