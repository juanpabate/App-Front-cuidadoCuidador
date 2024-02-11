import { View, Text, TouchableOpacity} from 'react-native'
import React, { useState, useEffect } from 'react'
import { Image } from 'expo-image';
import Checkbox from 'expo-checkbox';

const MedicinaCard = ({nombre, navigation, isEmpty, fechasSuministrada, hora, fechaSeleccionada, idMedicina}) => {

  const fecha = new Date();
  const fechaISO = new Date(fecha.getTime() - (fecha.getTimezoneOffset() * 60000)).toISOString().slice(0, 10);

  const fechaSeleccionadaISO= new Date(fecha.getTime() - (fechaSeleccionada.getTimezoneOffset() * 60000)).toISOString().slice(0, 10);


  const [checked, setChecked]= useState(false);
  const [isPostDay, setIsPostDay]= useState(false);

  const agregarEliminarFechaSuministro = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/medicina/agregarEliminarFechaSuministro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({idMedicina: idMedicina, fechaHoy: fechaISO})
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.log('Error al agregar o eliminar fecha de suministro de medicina');
      }
      
      setChecked(!checked);
      // console.log(data.message);
    } catch (error) {
      console.error('Error al agregar o eliminar fecha de suministro de medicina:', error);
      // Manejar el error de acuerdo a la lógica de tu aplicación
    }
  };

  useEffect(() => {
    
    if(fechasSuministrada){
      if(fechasSuministrada.includes(fechaSeleccionadaISO)){
        setChecked(true);
      }else{
        setChecked(false);
      }
    }
    return;    


  }, [fechaSeleccionada]);


  useEffect(() => {
    setIsPostDay(fecha > fechaSeleccionada); 
  }, [fechaSeleccionada, fecha]);

  const handleChecked= ()=>{
    if(fecha.toDateString() == fechaSeleccionada.toDateString()){
      agregarEliminarFechaSuministro();
    }else{
      return
    }
  }

  return (
    <>
    {
    isEmpty == false &&
    <View style={{flexDirection: 'row', backgroundColor: '#F8D57E', width: '100%', justifyContent: 'space-between', padding: 12, borderRadius: 15}}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <Image style={{width: 30, height: 30, contentFit: 'cover'}} source={require('../../assets/images/Tareas/medicinaIcon.png')}/>
        <Text style={{fontSize: 17, fontWeight: '500'}}>{nombre}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
        <Text style={{fontSize: 15}} >{hora}</Text>
        {isPostDay && 
        <Checkbox value={checked} onValueChange={handleChecked} style={{backgroundColor: '#f3f3f3', borderRadius: 5}} />

        }
      </View>
    </View>
    }
    {
      isEmpty== true && 
      <TouchableOpacity onPress={() => navigation.navigate('Tareas', { screen: 'AgregarMedicina' })}
      style={{flexDirection: 'row', alignItems: 'center', gap: 15, backgroundColor: '#fff', padding: 20, width: '100%', borderRadius: 15}}>
        <View style={{backgroundColor: '#F4B860', borderRadius: 50, alignItems: 'center', justifyContent: 'center', width: 50, height: 50}}>
          <Image style={{width: 50, height: 50, contentFit: 'cover'}} source={require('../../assets/images/Tareas/Plus.svg')}/>
        </View>
        <Text style={{fontSize: 16}}>Agregar una nueva medicina</Text>
      </TouchableOpacity>
    }

    </>
  )
}

export default MedicinaCard