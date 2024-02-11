import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector } from 'react-redux';
import Checkbox from 'expo-checkbox';


const AgregarMedicina = ({navigation}) => {

  const [mostrarPickerCalendarioInicio, setMostrarPickerCalendarioInicio]= useState(false);
  const [mostrarPickerCalendarioFinalizado, setMostrarPickerCalendarioFinalizado]= useState(false);
  const [mostrarPickerHora, setMostrarPickerHora]= useState(false);

  const [selectorFinalizadoActivo, setSelectorFinalizadoActivo]= useState(false);
  const [selectorDiasActivo, setSelectorDiasActivo]= useState(false);

  const [fechaInicioActiva, setFechaInicioActiva]= useState(false);
  const [fechaFinalizadoActiva, setFechaFinalizadoActiva]= useState(false);
  const [horaActiva, setHoraActiva]= useState(false);
  const [diasActivo, setDiasActivo]= useState(false);


  const [fechaFinalizadoTexto, setFechaFinalizadoTexto] = useState('Fecha de finalización');


  const [nombre, setNombre] = useState('');
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFinalizado, setFechaFinalizado] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [lunes, setLunes]= useState(false);
  const [martes, setMartes]= useState(false);
  const [miercoles, setMiercoles]= useState(false);
  const [jueves, setJueves]= useState(false);
  const [viernes, setViernes]= useState(false);
  const [sabado, setSabado]= useState(false);
  const [domingo, setDomingo]= useState(false);


  const usuario = useSelector((state) => state?.usuario);

  
  const mostrarCalendarioInicio= ()=>{
    setFechaInicioActiva(true);
    setMostrarPickerCalendarioInicio(true);
  };

  const seleccionarFechaInicio=(e, fecha)=>{
    setMostrarPickerCalendarioInicio(false);
    setFechaInicio(fecha);
  };

  const seleccionarFechaFinalizado=(e, fecha)=>{
    setMostrarPickerCalendarioFinalizado(false);
    setFechaFinalizado(fecha);
  };


  const mostrarReloj= ()=>{
    setHoraActiva(true);
    setMostrarPickerHora(true);
  };

  const seleccionarHora=(e, hora)=>{
    setMostrarPickerHora(false);
    setHora(hora);
  };

  const handleSelectorNo= ()=>{
    setFechaFinalizadoActiva(false);
    setSelectorFinalizadoActivo(false);
    setFechaFinalizadoTexto('Indefinido');
  };

  const handleSelectorSi= ()=>{
    setFechaFinalizadoActiva(true);
    setFechaFinalizadoTexto('Fecha de finalización')
    setMostrarPickerCalendarioFinalizado(true);
    setSelectorFinalizadoActivo(false);
  };

  const handleSeleccionarDias= ()=>{
    setSelectorDiasActivo(false);
    setDiasActivo(true);
  };

  const crearTarea= async()=>{
    if(fechaInicioActiva == false || (fechaFinalizadoActiva== false && fechaFinalizadoTexto!== 'Indefinido') || horaActiva == false || !nombre || diasActivo== false){
      console.log('Por favor rellene todos los campos');
    }else{
      const fechaFinalizacion= (fechaFinalizadoTexto== 'Indefinido') ? null : fechaFinalizado;
      console.log(hora.toLocaleTimeString('es-ES', { hour12: false }));
      try {
        const nuevaMedicina = {
          idUsuario: usuario.id, 
          nombreMedicina: nombre,
          fechaInicio: fechaInicio.toISOString(), 
          fechaFinalizacion: fechaFinalizacion, 
          Lunes: lunes,
          Martes: martes,
          Miercoles: miercoles,
          Jueves: jueves,
          Viernes: viernes,
          Sabado: sabado,
          Domingo: domingo,
          hora: hora.toLocaleTimeString('es-ES', { hour12: false }),
        };
  
        const response = await fetch('http://10.0.2.2:3000/medicina/agregar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(nuevaMedicina)
        });
  
        // Verifica si la solicitud fue exitosa
        if (response.ok) {
          console.log('Tarea agregada correctamente');
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
        <Text style={styles.title}>Agregar medicina</Text>
        <View style={styles.inputsContainer}> 
          <TextInput value={nombre} onChange={(e)=> setNombre(e.nativeEvent.text)} placeholder='Nombre de la medicina' placeholderTextColor='#AAAAAA' cursorColor='#F4B860' style={styles.input} maxLength={18}/>

          <TouchableOpacity onPress={mostrarCalendarioInicio} style={[styles.input, {justifyContent: 'center', alignItems: 'center'}]}>
            <Text style={fechaInicioActiva ? {color: 'black', fontSize: 18} : {fontSize: 18, color: '#AAAAAA'}}>{fechaInicioActiva ? fechaInicio.toLocaleString('es-ES', { year: 'numeric', month: 'long', day: '2-digit'}) : 'Fecha de inicio'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> setSelectorFinalizadoActivo(true)} style={[styles.input, {justifyContent: 'center', alignItems: 'center'}]}>
            <Text style={fechaFinalizadoActiva || fechaFinalizadoTexto == 'Indefinido' ? {color: 'black', fontSize: 18} : {fontSize: 18, color: '#AAAAAA'}}>{fechaFinalizadoActiva ? fechaFinalizado.toLocaleString('es-ES', { year: 'numeric', month: 'long', day: '2-digit'}) : fechaFinalizadoTexto}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={mostrarReloj} style={[styles.input, {justifyContent: 'center', alignItems: 'center'}]}>
            <Text style={horaActiva ? {color: 'black', fontSize: 18} : {fontSize: 18, color: '#AAAAAA'}}>{horaActiva ? hora.toLocaleString('es-ES', {hour: '2-digit', minute: '2-digit', hour12: true}) : 'Hora'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> setSelectorDiasActivo(true)} style={[styles.input, {justifyContent: 'center', alignItems: 'center'}]}>
            <Text style={diasActivo ? {color: 'black', fontSize: 18} : {fontSize: 18, color: '#AAAAAA'}}>{diasActivo ? 'Días seleccionados' : 'Días'}</Text>
          </TouchableOpacity>

          
        </View>
        <TouchableOpacity style={styles.button} onPress={crearTarea}>
          <Text style={styles.buttonText}>Agregar</Text>
        </TouchableOpacity>
      </View>
      {mostrarPickerCalendarioInicio && 
        <DateTimePicker 
          onChange={seleccionarFechaInicio}
          value={fechaInicio}
          positiveButton={{label: 'Seleccionar'}}
          negativeButton={{label: 'Cerrar'}}
        />
      }
      {mostrarPickerCalendarioFinalizado && 
        <DateTimePicker 
          onChange={seleccionarFechaFinalizado}
          value={fechaFinalizado}
          positiveButton={{label: 'Seleccionar'}}
          negativeButton={{label: 'Cerrar'}}
        />
      }
      {
        mostrarPickerHora &&
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
      {
        selectorFinalizadoActivo &&
        <View style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1, position: 'absolute', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
          <View style={{backgroundColor: '#fff', width: 300, height: 200, opacity: 1, borderRadius: 15, alignItems: 'center', padding: 15, justifyContent: 'space-between', paddingVertical: 35}}>
            <Text style={{fontSize: 17, fontWeight: '500'}}>¿Hay una fecha de finalización?</Text>
            <View style={{flexDirection: 'row', gap: 15}}>
              <TouchableOpacity onPress={handleSelectorSi} style={{width: 90, height: 70, backgroundColor: '#32a931', borderRadius: 15, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>Sí</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleSelectorNo} style={{width: 90, height: 70, backgroundColor: '#e33453', borderRadius: 15, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      }
      {
        selectorDiasActivo &&
        <View style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1, position: 'absolute', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
          <View style={{backgroundColor: '#fff', width: 300, opacity: 1, borderRadius: 15, alignItems: 'center', padding: 15, justifyContent: 'space-between', paddingVertical: 25, gap: 20}}>
            <Text style={{fontSize: 20, fontWeight: '500'}}>Selecciona los días</Text>
            <View style={{gap: 10, width: '100%', paddingLeft: 20}}>

              <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <Checkbox value={lunes} onValueChange={setLunes} style={{backgroundColor: '#f3f3f3', borderRadius: 5}} />
                <Text style={{fontSize: 17, fontWeight: '500'}}>Lunes</Text>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <Checkbox value={martes} onValueChange={setMartes} style={{backgroundColor: '#f3f3f3', borderRadius: 5}} />
                <Text style={{fontSize: 17, fontWeight: '500'}}>Martes</Text>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <Checkbox value={miercoles} onValueChange={setMiercoles} style={{backgroundColor: '#f3f3f3', borderRadius: 5}} />
                <Text style={{fontSize: 17, fontWeight: '500'}}>Miércoles</Text>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <Checkbox value={jueves} onValueChange={setJueves} style={{backgroundColor: '#f3f3f3', borderRadius: 5}} />
                <Text style={{fontSize: 17, fontWeight: '500'}}>Jueves</Text>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <Checkbox value={viernes} onValueChange={setViernes} style={{backgroundColor: '#f3f3f3', borderRadius: 5}} />
                <Text style={{fontSize: 17, fontWeight: '500'}}>Viernes</Text>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <Checkbox value={sabado} onValueChange={setSabado} style={{backgroundColor: '#f3f3f3', borderRadius: 5}} />
                <Text style={{fontSize: 17, fontWeight: '500'}}>Sábado</Text>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <Checkbox value={domingo} onValueChange={setDomingo} style={{backgroundColor: '#f3f3f3', borderRadius: 5}} />
                <Text style={{fontSize: 17, fontWeight: '500'}}>Domingo</Text>
              </View>
              
            </View>

            <TouchableOpacity onPress={handleSeleccionarDias} style={{backgroundColor: '#329973', padding: 5, borderRadius: 10, paddingHorizontal: 10}}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>Enviar selección</Text>
            </TouchableOpacity>
          </View>
        </View>
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

export default AgregarMedicina