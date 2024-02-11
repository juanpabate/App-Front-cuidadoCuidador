import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import TareaCard from './Tareas/TareaCard';
import { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import MedicinaCard from './Tareas/MedicinaCard';



const COLORES= {
  verdePrincipal: '#7FAF69',
  blanco: '#fff',
  gris: '#F6F6F6',
  azulOscuro: '#45B3CB',
  azulClaro: '#ECF2F3',
};


//INFORMACIÓN DE LAS CARDS
const CARDS_DATA = [
  {
    id: 1,
    title: 'Tareas paciente',
    color: '#7FAF69',
    icon: require('../assets/images/home/tareasPaciente.svg'),
    navigate: 'Tareas'
  },
  {
    id: 2,
    title: 'Guía de ejercicios',
    color: '#45B3CB',
    icon: require('../assets/images/home/guiaEjercicios.svg'),
    navigate: 'Ejercicios'
  },
  {
    id: 3,
    title: 'Foro',
    color: '#E59850',
    icon: require('../assets/images/home/foro.svg'),
    navigate: 'ForoStack'
  },
];

//COMPONENTE DE LA CARD
const Card = ({ title, icon, bgColor, navigate }) => {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      style={[styles.card, { backgroundColor: bgColor }]}
      onPress={() => navigation.navigate(navigate)}
    >
      <Image style={styles.cardLogo} source={icon} />
      <Text style={styles.cardTitle}>{title}</Text>
    </TouchableWithoutFeedback>
  );
};

// SEPARADOR HORIZONTAL PARA LOS ELEMENTOS DE LA FLATLIST DE LAS CARDS
const separatorHorizontalCards = () => {
  return <View style={{ width: 15 }} />;
};


const Home = ({navigation}) => {

  const usuario = useSelector((state) => state?.usuario);

  const [tareas, setTareas]= useState([]);
  const [proximaMedicina, setProximaMedicina]= useState();

  const proximaTarea= tareas.length > 0 ? tareas[0] : null;

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

  const horaFormateada = proximaMedicina ? new Date(`1970-01-01T${proximaMedicina.hora}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }): '';



  const obtenerTareasUsuario = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:3000/tareas/${usuario.id}`);
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
      const response = await fetch(`http://10.0.2.2:3000/medicinas/${usuario.id}`);
      if (!response.ok) {
        throw new Error('Error al obtener las medicinas del usuario');
      }
      const medicinas = await response.json();
      // console.log(medicinas);
      return medicinas;
    } catch (error) {
      console.error('Error al obtener las medicinas del usuario:', error);
    }
  };

  const obtenerProximaMedicina= ()=>{
    obtenerMedicinasUsuario()
      .then(medicinas => {
        const fechaHoy = new Date();
        const fechaHoyDia = fechaHoy.getDay(); // Obtener el día de la semana (0: Domingo, 1: Lunes, ..., 6: Sábado)
        const horaHoy = fechaHoy.toTimeString(); // Obtener la hora actual

        // Filtrar las medicinas que cumplen con las condiciones
        const medicinasFiltradas = medicinas.filter(item => {
          const fechaInicio = new Date(item.fechaInicio);
          const fechaFinalizacion = item.fechaFinalizacion ? new Date(item.fechaFinalizacion) : undefined;
  
          // Verificar si el día de la semana está activo
          const diaSemanaActivo = item[getDiaSemana(fechaHoyDia)] === 1;
  
          // Verificar si la fecha de finalización está definida y la fecha actual está en el rango
          const filtroFechaFinalizacion = fechaFinalizacion ? (fechaHoy >= fechaInicio && fechaHoy <= fechaFinalizacion) : false;
  
          // Verificar si la fecha de finalización no está definida y la fecha actual está después de la fecha de inicio
          const filtroFechaSinFinalizacion = !fechaFinalizacion ? (fechaHoy >= fechaInicio) : false;
  
          // Verificar si la hora de la medicina es posterior a la hora actual
          const filtroHora = item.hora > horaHoy;
  
          return diaSemanaActivo && filtroHora && (filtroFechaFinalizacion || filtroFechaSinFinalizacion);
        });
        const proximaMedicina = medicinasFiltradas.length > 0 ? medicinasFiltradas[0] : null;
        setProximaMedicina(proximaMedicina);
        // console.log(medicinasFiltradas);
      })
      .catch(error => {
        console.error('Error al obtener las medicinas del usuario:', error);
      });
  }

  useEffect(() => {
    obtenerTareasUsuario();
    obtenerProximaMedicina();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      obtenerTareasUsuario();
      obtenerProximaMedicina();
    }, [usuario])
  );

  const handleLogout = async () => {
    try {
      // Elimina los datos del usuario de AsyncStorage
      await AsyncStorage.removeItem('userData');
      // Redirige al usuario a la pantalla de inicio de sesión
      navigation.replace('Login'); // Asegúrate de que la pantalla de inicio de sesión se llame 'Login' o ajusta según sea necesario
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };



  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >

        <View style={styles.header} >
          <View style={styles.welcome} >
            <Image style={styles.welcomeImage} source={require('../assets/images/home/user.png')}/>
            <View>
              <Text style={styles.welcomeText}>Hola,</Text>
              <Text style={styles.welcomeTextBold}>{usuario.nombre} 👋</Text> 
            </View>
          </View>
          {/* <Image style={styles.logo} source={require('../assets/images/logo.png')}/> */}
          <TouchableOpacity onPress={handleLogout} style={[{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8}]}>
            <Image style={styles.hamburger} source={require('../assets/images/home/logOut.svg')}/>
            <Text style={[{fontSize: 18, color: '#949494'}]}>Salir</Text>
          </TouchableOpacity>
        </View>

        

        <FlatList
          data={CARDS_DATA}
          renderItem={({ item }) => (
            <Card title={item.title} icon={item.icon} bgColor={item.color} navigate={item.navigate}/>
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={separatorHorizontalCards}
          showsHorizontalScrollIndicator={false}
          flexGrow={0}
          horizontal={true}
        />

        <View style={styles.sectionContainer} >

          <View style={styles.sectionTextContainer}>
            <Text style={styles.sectionTitle}>{tareas.length > 0 ? 'Próxima tarea' : 'Aún no hay tareas'}</Text>
            {
              tareas.length > 0 && 
            <TouchableOpacity onPress={()=> navigation.navigate('ProximasTareas')}>
              <Text style={styles.sectionTouchable}>Ver todas</Text>
            </TouchableOpacity>
            }
            
          </View>
          
          <View style={styles.tasksContainer}>
            <TareaCard 
              nombre={proximaTarea ? proximaTarea.nombreTarea : ''}
              fecha={proximaTarea ? new Date(proximaTarea.Fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: '2-digit'}) : ''}
              hora={proximaTarea ? new Date(`1970-01-01T${proximaTarea.Hora}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
              lugar={proximaTarea ? proximaTarea.Lugar : ''}
              descripcion={proximaTarea ? proximaTarea.Descripcion : ''}
              isEmpty={tareas.length > 0 ?  false : true}
              navigation={navigation}
              isHome={true}
            />
          </View>
      
        </View>

        <View style={styles.sectionContainer} >

          <View style={styles.sectionTextContainer}>
            <Text style={proximaMedicina ? styles.sectionTitle : {fontSize: 20, fontWeight: 'bold'}}>{proximaMedicina ? 'Próxima medicina' : 'No hay medicinas pendientes hoy'}</Text>    
          </View>
          
          <View style={styles.tasksContainer}>
            <MedicinaCard 
              isEmpty={proximaMedicina ? false : true}
              navigation={navigation}
              nombre={proximaMedicina ? proximaMedicina.nombreMedicina : ''}
              fechasSuministrada={proximaMedicina ? proximaMedicina.fechaSuministrada: ''}
              hora={proximaMedicina ? horaFormateada : ''}
              fechaSeleccionada={new Date()}
              idMedicina={proximaMedicina ? proximaMedicina.idMedicina : ''}
            />
          </View>
      
        </View>

        <View style={styles.tipContainer}> 
          <View style={styles.tipTextContainer}>
            <Text style={styles.tipTitle}>Recomendación</Text>
            <Text style={styles.tipText}>Fermentum posuere urna nec tincidunt praesent semper feugiat. Odio tempor orci dapibus ultrices. Amet luctus venenatis.</Text>
          </View>
          <Image style={styles.tipImage} source={require('../assets/images/home/tip.png')} />
        </View>

      </ScrollView>

    </SafeAreaView>
    
  )
}

const styles= StyleSheet.create({
  mainContainer:{
    backgroundColor: COLORES.gris,
    alignItems: 'center',
    flex: 1,
    // paddingHorizontal: 15,
    // marginBottom: 80
  },
  container: {
    // borderColor: 'red',
    // borderWidth: 1,
    flex: 1,
    // height: 1000,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: COLORES.gris,
    // paddingHorizontal: 25,
    // paddingVertical: 10,
    // marginBottom: 100,
    paddingBottom: 40,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  header: {
    // borderColor: 'red',
    // borderWidth: 1,
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18
    // paddingRight: 20,
  },
  logo: {
    // borderColor: 'red',
    // borderWidth: 1,
    width: 80,
    height: 80,
    // resizeMode: 'contain',
  },
  hamburger: {
    // borderColor: 'red',
    // borderWidth: 1,
    width: 25,
    height: 25,
    contentFit: 'contain',
    // marginRight: 20,
  },
  welcome: {
    // borderColor: 'red',
    // borderWidth: 1,
    // marginTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    paddingLeft: 4,
    marginVertical: 20
  },
  welcomeImage: {
    width: 55,
    height: 55,
    borderRadius: 10
  },
  welcomeText: {
    fontSize: 20
  },
  welcomeTextBold: {
    fontWeight: 'bold',
    fontSize: 20
  },
  card: {
    // borderColor: 'red',
    // borderWidth: 1,
    width: 125,
    height: 140,
    paddingHorizontal: 14,
    paddingVertical: 17,
    justifyContent: 'space-between',
    // backgroundColor: '#aaa',
    borderRadius: 15
  },
  cardLogo: {
    width: 40,
    height: 40,
    // color: 'white'
  },
  cardTitle: {
    color: '#fff',
    marginBottom: 8,
    fontWeight: '600',
    lineHeight: 20,
    fontSize: 16
  },
  sectionContainer: {
    // borderColor: 'red',
    // borderWidth: 1,
    marginTop: 15,
  },
  sectionTextContainer: {
    // borderColor: 'red',
    // borderWidth: 1,
    // marginTop: 30,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent:'space-between',
    marginBottom: 10,
    paddingRight: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  sectionTouchable: {
    fontSize: 16,
    color: COLORES.azulOscuro
  },
  tasksContainer: {
    // borderColor: 'red',
    // borderWidth: 1,
    // gap: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskCardContainer: {
    // borderColor: 'red',
    // borderWidth: 1,
    width: '100%',
    height: 65,
    backgroundColor: COLORES.azulClaro,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    gap: 15
  },
  taskCardIcon: {
    width: 40,
    height: 40
  },
  taskCardTitle:{
    fontSize: 20,
    fontWeight: '400'
  },
  taskCardArrow:{
    width: 8,
    height: 12,
    position: 'absolute',
    right: 35,
  },
  tipContainer: {
    height: 140,
    width: '100%',
    backgroundColor: COLORES.verdePrincipal,
    marginTop: 20,
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 35
  },
  tipTextContainer: {
    flex: 1
  },
  tipTitle: {
    color: COLORES.blanco,
    fontWeight: 'bold',
    fontSize: 24,
    // marginBottom: 5
  },
  tipText: {
    color: COLORES.blanco,
    fontSize: 15
  },
  tipImage: {
    contentFit: 'contain',
    width: 90,
    height: 90,
    flex: 0.5
  }
})

export default Home