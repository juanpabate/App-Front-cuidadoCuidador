import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { useState, useEffect } from 'react';
import React from 'react';
import TareaCard from './TareaCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import MedicinaCard from './MedicinaCard';



const Tareas = ({navigation}) => {

  const [filter, setFilter] = useState('Tareas');

  const [fechaSeleccionada, setFechaSeleccionada] = useState('');


  const [tareas, setTareas] = useState([]);
  const [medicinas, setMedicinas] = useState([]);
  
  const proximaTarea= tareas.length > 0 ? tareas[0] : null;

  const usuario = useSelector((state) => state?.usuario);

  const hora= new Date().toLocaleTimeString([], {hour12: true, hour: 'numeric', minute: 'numeric'});

  const getDiaSemana = (dia) => {
    switch (dia) {
      case 0:
        return 'Domingo';
      case 1:
        return 'Lunes';
      case 2:
        return 'Martes';
      case 3:
        return 'Miercoles';
      case 4:
        return 'Jueves';
      case 5:
        return 'Viernes';
      case 6:
        return 'Sabado';
      default:
        return '';
    }
  };


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

  const obtenerMedicinasUsuario = async () => {
    try {
      const response = await fetch(`https://cuidado-cuidador-backend.onrender.com/medicinas/${usuario.id}`);
      if (!response.ok) {
        throw new Error('Error al obtener las medicinas del usuario');
      }
      const data = await response.json();
      // console.log(data);
      setMedicinas(data);
    } catch (error) {
      console.error('Error al obtener las medicinas del usuario:', error);
    }
  };


  useEffect(() => {
    obtenerTareasUsuario();
    obtenerMedicinasUsuario();
    const fecha= new Date();
    setFechaSeleccionada(fecha);
  }, []);

  useEffect(() => {
    const fecha= new Date();
    setFechaSeleccionada(fecha);
  }, [filter]);

  useFocusEffect(
    React.useCallback(() => {
      obtenerTareasUsuario();
      obtenerMedicinasUsuario();
    }, [usuario])
  );

  const handleNextDay= ()=>{
    const nuevaFecha = new Date(fechaSeleccionada);
    nuevaFecha.setDate(nuevaFecha.getDate() + 1);
    setFechaSeleccionada(nuevaFecha);
  };

  const handlePrevDay= ()=>{
    const nuevaFecha = new Date(fechaSeleccionada);
    nuevaFecha.setDate(nuevaFecha.getDate() - 1);
    setFechaSeleccionada(nuevaFecha);
  };


  return (
    <View style={styles.mainContainer}>

      <Image style={styles.banner} source={require('../../assets/images/Tareas/banner.png')} />

      <View style={styles.filtersContainer} >
        <Text style={filter== 'Tareas' ? styles.filterTextActive: styles.filterText} onPress={()=> setFilter('Tareas')}>Tareas</Text>
        <Text style={filter== 'Medicina' ? styles.filterTextActive: styles.filterText} onPress={()=> setFilter('Medicina')}>Medicina</Text>
        <Text style={filter== 'Signos vitales' ? styles.filterTextActive: styles.filterText} onPress={()=> setFilter('Signos vitales')}>Signos vitales</Text>
      </View>

      {filter ==='Tareas' && 
        <>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{proximaTarea ? 'Próxima tarea' : 'No hay tareas pendientes'}</Text>
          {proximaTarea &&
          <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('ProximasTareas')}>
            <Text style={styles.buttonText}>Ver todas</Text>
          </TouchableOpacity>
          }
          
        </View>

        <TareaCard 
          nombre={proximaTarea ? proximaTarea.nombreTarea : ''}
          fecha={proximaTarea ? new Date(proximaTarea.Fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: '2-digit'}) : ''}
          hora={proximaTarea ? new Date(`1970-01-01T${proximaTarea.Hora}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
          lugar={proximaTarea ? proximaTarea.Lugar : ''}
          descripcion={proximaTarea ? proximaTarea.Descripcion : ''}
          isEmpty={tareas.length > 0 ?  false : null}
          navigation={navigation}
        />

        <TouchableOpacity onPress={()=> navigation.navigate('AgregarTarea')} style={{flexDirection: 'row', alignItems: 'center', gap: 15, marginTop: 20, backgroundColor: '#fff', padding: 10, borderRadius: 15}}>
          <View style={{backgroundColor: '#F4B860', borderRadius: 50, alignItems: 'center', justifyContent: 'center', width: 50, height: 50}}>
            <Image style={{width: 50, height: 50, contentFit: 'cover'}} source={require('../../assets/images/Tareas/Plus.svg')}/>
          </View>
          <Text style={{fontSize: 18}}>Agregar una nueva tarea</Text>
        </TouchableOpacity>
        </>
      }

      {filter== 'Medicina' &&
      <>
      <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center', marginBottom: 10}}>
        <View>
          <Text style={{fontSize: 28, fontWeight: '500'}}>Medicinas de:</Text>
          <Text style={{fontSize: 25, fontWeight: '500', color: '#F8D57E'}}>{fechaSeleccionada.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric'})}</Text>
        </View>
        <View style={{flexDirection: 'row', gap: 12}}>

          <TouchableOpacity onPress={handlePrevDay}>
            <Image style={styles.arrow} source={require('../../assets/images/Tareas/back.svg')} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNextDay}>
            <Image style={styles.arrow} source={require('../../assets/images/Tareas/front.svg')} />
          </TouchableOpacity>

        </View>

      </View>
      <ScrollView style={{width: '100%', paddingHorizontal: 20}}>
        <View style={{gap: 15}}>
        {medicinas
          .filter(item => {
            const fechaInicio = new Date(item.fechaInicio);
            const fechaFinalizacion = item.fechaFinalizacion ? new Date(item.fechaFinalizacion) : undefined;
            const fechaSeleccionadaDia = fechaSeleccionada.getDay(); // Obtener el día de la semana (0: Domingo, 1: Lunes, ..., 6: Sábado)

            // Verificar si el día de la semana está activo
            const diaSemanaActivo = item[getDiaSemana(fechaSeleccionadaDia)] === 1;

            // Verificar si la fecha de finalización está definida y la fecha actual está en el rango
            const filtroFechaFinalizacion = fechaFinalizacion ? (fechaSeleccionada >= fechaInicio && fechaSeleccionada <= fechaFinalizacion) : false;

            // Verificar si la fecha de finalización no está definida y la fecha actual está después de la fecha de inicio
            const filtroFechaSinFinalizacion = !fechaFinalizacion ? (fechaSeleccionada >= fechaInicio) : false;

            return diaSemanaActivo && (filtroFechaFinalizacion || filtroFechaSinFinalizacion);
          })
          .map(item => {
            // Formatear la hora en un formato de 12 horas (AM/PM) y sin segundos
            const horaFormateada = new Date(`1970-01-01T${item.hora}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

            return (
              <MedicinaCard
                isEmpty={false}
                key={item.idMedicina}
                navigation={navigation}
                nombre={item.nombreMedicina}
                fechasSuministrada={item.fechaSuministrada}
                hora={horaFormateada} // Usar la hora formateada
                fechaSeleccionada={fechaSeleccionada}
                idMedicina={item.idMedicina}
              />
            );
          })
        }
        </View>
      </ScrollView>

      <TouchableOpacity onPress={()=> navigation.navigate('AgregarMedicina')} style={{flexDirection: 'row', alignItems: 'center', gap: 15, marginTop: 20, backgroundColor: '#fff', padding: 10, borderRadius: 15}}>
          <View style={{backgroundColor: '#F4B860', borderRadius: 50, alignItems: 'center', justifyContent: 'center', width: 50, height: 50}}>
            <Image style={{width: 50, height: 50, contentFit: 'cover'}} source={require('../../assets/images/Tareas/Plus.svg')}/>
          </View>
          <Text style={{fontSize: 18}}>Agregar una nueva medicina</Text>
      </TouchableOpacity>

      </>
      }

      {filter == 'Signos vitales' && 
      
      <View style={{width: '100%', paddingHorizontal: 20}}>
        <Text style={{fontSize: 30, fontWeight: '500', marginBottom: 5}}>{hora}</Text>
        <Text style={{fontSize: 17, color: '#F4B860'}}>Última actualización: <Text style={{color: '#000', fontWeight: 'bold'}}>6:02 PM</Text></Text>

        <View style={{ marginTop: 15, gap: 10}}>

          <View style={{flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#F8D57E', borderRadius: 15, alignItems: 'center', justifyContent: 'center', gap: 25, height: 130}}>
            <View style={{height: '70%'}}>
              <Text style={{fontSize: 16}}>Ritmo cardiaco</Text>
              <Text style={{fontSize: 45, fontWeight: 'bold'}}>96<Text style={{fontSize: 15, fontWeight: 'bold'}}> bpm</Text></Text>
            </View>
            <Image style={{contentFit: 'contain', width: 120, height: 120}} source={require('../../assets/images/Tareas/ritmoCardiaco.svg')} />
          </View>

          <View style={{flexDirection: 'row', gap: 10}}>

            <View style={{backgroundColor: '#F6E1C3', flex: 1, padding: 15, borderRadius: 15, justifyContent: 'space-around'}}>
              <Image style={{contentFit: 'contain', width: 25, height: 25}} source={require('../../assets/images/Tareas/azucar.svg')} />
              <Text style={{fontSize: 16}}>Azúcar</Text>
              <Text style={{fontSize: 25, fontWeight: 'bold'}}>78.9</Text>
            </View>

            <View style={{backgroundColor: '#B3D8E4', flex: 1, padding: 15, borderRadius: 15, justifyContent: 'space-around', height: 130}}>
              <Image style={{contentFit: 'contain', width: 25, height: 25}} source={require('../../assets/images/Tareas/presion.svg')} />
              <Text style={{fontSize: 16}}>Presión</Text>
              <Text style={{fontSize: 25, fontWeight: 'bold'}}>130 / 85</Text>
            </View>

          </View>

        </View>

        <TouchableOpacity style={{backgroundColor: '#F4B860', width: 80, padding: 5, borderRadius: 10, alignItems: 'center', paddingHorizontal: 10, marginTop: 10}}>
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 10}}>Ver historial</Text>
        </TouchableOpacity>

        <View style={{width: '100%', alignItems: 'center'}}>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 15, backgroundColor: '#fff',padding: 10, borderRadius: 15}}>
            <View style={{backgroundColor: '#F4B860', borderRadius: 50, alignItems: 'center', justifyContent: 'center', width: 30, height: 30}}>
              <Image style={{width: 30, height: 30, contentFit: 'cover'}} source={require('../../assets/images/Tareas/Plus.svg')}/>
            </View>
            <Text style={{fontSize: 13}}>Actualizar signos vitales</Text>
          </TouchableOpacity>
        </View>

        

      </View>

      }


    </View>
  )
};

const styles= StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    padding: 20,
    maxHeight: '100%',
    // flex: 1,
    // marginBottom: 10,
    // borderWidth: 2,
    // borderColor: 'red',
    paddingTop: 35,
  },
  banner: {
    width: '100%',
    height: 110,
    contentFit: 'contain',
    // borderWidth: 2,
    // borderColor: 'red',
  },
  filtersContainer: {
    width: '100%',
    flexDirection: 'row',
    // borderWidth: 2,
    // borderColor: 'red',
    marginVertical: 20,
    justifyContent: 'space-evenly'
  },
  filterTextActive: {
    fontSize: 15,
    color: '#E59850',
    fontWeight: 'bold'
  },
  filterText: {
    fontSize: 15,
    color: '#868686',
    fontWeight: 'bold'
  },
  titleContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center'
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  button:{
    padding: 5
  },
  buttonText: {
    fontSize: 16,
    color: '#F4B860'
  },
  arrow: {
    contentFit: 'contain',
    width: 50,
    height: 50
  }


});

export default Tareas