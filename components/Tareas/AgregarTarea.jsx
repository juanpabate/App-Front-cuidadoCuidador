import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector } from 'react-redux';



const AgregarTarea = ({navigation}) => {

  const [showDatePicker, setShowDatePicker]= useState(false);
  const [fechaActiva, setFechaActiva]= useState(false);

  const [fecha, setFecha] = useState(new Date());

  const [showTimePicker, setShowTimePicker]= useState(false);
  const [horaActiva, setHoraActiva]= useState(false);
  const [hora, setHora] = useState(new Date());

  const [nombre, setNombre] = useState('');
  const [lugar, setLugar] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const usuario = useSelector((state) => state?.usuario);



  const mostrarCalendario= ()=>{
    setFechaActiva(true);
    setShowDatePicker(true);
  };

  const seleccionarFecha=(e, fecha)=>{
    setShowDatePicker(false);
    setFecha(fecha);
  };


  const mostrarReloj= ()=>{
    setHoraActiva(true);
    setShowTimePicker(true);
  };

  const seleccionarHora=(e, hora)=>{
    setShowTimePicker(false);
    setHora(hora);
  };

  const crearTarea= async()=>{
    if(fechaActiva == false || horaActiva == false || !nombre || !lugar || !descripcion){
      console.log('Por favor rellene todos los campos');
    }else{
      try {
        // Construcción el objeto de datos de la nueva tarea
        const nuevaTarea = {
          idUsuario: usuario.id, 
          nombreTarea: nombre,
          Fecha: fecha.toISOString(), 
          Hora: hora.toLocaleTimeString(), 
          Lugar: lugar,
          Descripcion: descripcion
        };
  
        const response = await fetch('http://10.0.2.2:3000/agregarTarea', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(nuevaTarea)
        });
  
        // Verifica si la solicitud fue exitosa
        if (response.ok) {
          console.log('Tarea agregada correctamente');
          setFechaActiva(false);
          setHoraActiva(false);
          setLugar('');
          setNombre('');
          setDescripcion('');
          navigation.goBack();
        } else {
          console.error('Error al agregar la tarea:', response.status);
        }
      } catch (error) {
        console.error('Error al agregar la tarea:', error);
      }
    }
    return;
  };

  return (
    <View style={styles.mainContainer}>

      <View style={{width: '100%', paddingLeft: 30, marginBottom: 10}}>
        <TouchableOpacity style={{width: 50}} onPress={()=> navigation.navigate('TareasHome')}>
          <Text style={{color: '#F4B860', fontSize: 18}} >Atrás</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.cardContainer}>
        <Text style={styles.title}>Agregar tarea</Text>
        <View style={styles.inputsContainer}> 
          <TextInput value={nombre} onChange={(e)=> setNombre(e.nativeEvent.text)} placeholder='Nombre de la tarea' placeholderTextColor='#AAAAAA' cursorColor='#F4B860' style={styles.input} maxLength={18}/>

          <TouchableOpacity onPress={mostrarCalendario} style={[styles.input, {justifyContent: 'center', alignItems: 'center'}]}>
            <Text style={fechaActiva ? {color: 'black', fontSize: 18} : {fontSize: 18, color: '#AAAAAA'}}>{fechaActiva ? fecha.toLocaleString('es-ES', { year: 'numeric', month: 'long', day: '2-digit'}) : 'Fecha'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={mostrarReloj} style={[styles.input, {justifyContent: 'center', alignItems: 'center'}]}>
            <Text style={horaActiva ? {color: 'black', fontSize: 18} : {fontSize: 18, color: '#AAAAAA'}}>{horaActiva ? hora.toLocaleString('es-ES', {hour: '2-digit', minute: '2-digit', hour12: true}) : 'Hora'}</Text>
          </TouchableOpacity>

          <TextInput value={lugar} onChange={(e)=> setLugar(e.nativeEvent.text)} placeholder='Lugar' placeholderTextColor='#AAAAAA' cursorColor='#F4B860' style={styles.input} maxLength={18}/>
          <TextInput value={descripcion} onChange={(e)=> setDescripcion(e.nativeEvent.text)} placeholder='Descripcion' placeholderTextColor='#AAAAAA' cursorColor='#F4B860' style={styles.input} multiline={true} />
        </View>
        <TouchableOpacity style={styles.button} onPress={crearTarea}>
          <Text style={styles.buttonText}>Agregar</Text>
        </TouchableOpacity>
      </View>
      {showDatePicker && 
        <DateTimePicker 
          onChange={seleccionarFecha}
          value={fecha}
          positiveButton={{label: 'Seleccionar'}}
          negativeButton={{label: 'Cerrar'}}
        />
      }
      {
        showTimePicker &&
        <DateTimePicker 
          onChange={seleccionarHora}
          value={hora}
          display= 'spinner'
          mode= 'time'
          is24Hour={false}
          positiveButton={{label: 'Seleccionar'}}
          negativeButton={{label: 'Cerrar'}}
        />
      }
    </View>
  )
}

const styles= StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  cardContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    gap: 25,
    width: 350
  },
  inputsContainer: {
    gap: 15,
    width: '100%'
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF4DF',
    borderRadius: 15,
    // paddingHorizontal: 20,
    fontSize: 18,
    textAlign: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C2543'
  },
  button: {
    backgroundColor: '#F4B860',
    padding: 5,
    borderRadius: 10,
    paddingHorizontal: 10
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default AgregarTarea