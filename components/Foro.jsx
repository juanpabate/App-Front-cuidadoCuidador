import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, RefreshControl } from 'react-native';
import { Image } from 'expo-image';
import React, { useState, useCallback} from 'react';
import { TextInput } from 'react-native-gesture-handler';

import { useSelector } from 'react-redux';

import { useFocusEffect } from '@react-navigation/native';


const Post = React.memo(({ nombre, apellido, textoPublicacion, fechaPublicacion, numeroRespuestas, enFavoritos, onPress, handleHeartPress, id }) => {

    const textoAcortado = textoPublicacion.length > 20 ? `${textoPublicacion.substring(0, 20)}...` : textoPublicacion;

    const fecha = new Date(fechaPublicacion).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'numeric',
    });

    const inicialNombre= nombre[0].toUpperCase();

    const usuario = useSelector((state) => state?.usuario);

    const isUser= id === usuario.id;


    return (
      <TouchableOpacity style={styles.postContainer} onPress={()=>onPress(isUser)}>
        {/* <Image style={styles.postImage} source={require('../assets/images/home/userPhoto.png')} /> */}
        <View style={styles.inicialContainer}>
          <Text style={styles.inicial}>{inicialNombre}</Text>
        </View>
        <View style={styles.postData} >
          <Text style={styles.postName}>{id == usuario.id ? 'Tú': `${nombre} ${apellido}`}</Text>
          <Text style={styles.postText}>{`${textoAcortado}`} </Text>
          <Text style={styles.postRespuestas}>{`${numeroRespuestas} respuestas`}</Text>
        </View>
        <View style={styles.favDate} >
        <TouchableOpacity onPress={handleHeartPress}>
          {
            enFavoritos ?
              <Image style={styles.heart} source={require(`../assets/images/foro/heartFilled.svg`)} />
              :
              <Image style={styles.heart} source={require(`../assets/images/foro/heartEmpty.svg`)} />
          }
        </TouchableOpacity>        
          <Text style={styles.postText}>{`${fecha}`} </Text>
        </View>
      </TouchableOpacity>
    )
});

const Foro = ({navigation}) => {

  const [publicaciones, setPublicaciones]= useState();
  const [favoritos, setFavoritos]= useState([]);

  const [filter, setFilter] = useState('TODOS');

  const [text, setText]= useState('');


  const usuario = useSelector((state) => state?.usuario);


  const obtenerPublicaciones = async () => {
    try {
      let endpoint = 'https://cuidado-cuidador-backend.onrender.com/foro/publicaciones';
  
      if (filter === 'MIS PREGUNTAS') {
        endpoint = `https://cuidado-cuidador-backend.onrender.com/foro/publicaciones/${usuario.id}`;
      }else if(filter === 'FAVORITOS'){
        endpoint = `https://cuidado-cuidador-backend.onrender.com/foro/publicaciones/favoritos/${usuario.id}`;
      }
  
      const responsePublicaciones = await fetch(endpoint);
  
      if (!responsePublicaciones.ok) {
        console.error('Error en la solicitud:', responsePublicaciones.status);
        return;
      }
  
      const dataPublicaciones = await responsePublicaciones.json();

      setPublicaciones(dataPublicaciones);
  
    } catch (error) {
      console.error('Error al obtener las publicaciones:', error);
    }
  };

  const obtenerFavoritos = async () => {
    try {    
    const responseFavoritos = await fetch(`https://cuidado-cuidador-backend.onrender.com/favoritos/${usuario.id}`);
  
      if (!responseFavoritos.ok) {
        console.error('Error en la solicitud:', responseFavoritos.status);
        return;
      }
  
      const dataFavoritos = await responseFavoritos.json();

      // console.log(dataFavoritos);

      setFavoritos(dataFavoritos);
  
    } catch (error) {
      console.error('Error al obtener los favoritos:', error);
    }
  };
  
  useFocusEffect(
    React.useCallback(() => {
      obtenerPublicaciones();
      obtenerFavoritos();
    }, [usuario, filter])
  );

  const handleText= (e)=>{
    const text= e.nativeEvent.text;
    setText(text);
  };

  const handleEnviarPublicacion= async()=>{
    try {
      const response = await fetch('https://cuidado-cuidador-backend.onrender.com/foro/publicar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          textoPublicacion: text,
          usuarioId: usuario.id, // Asegúrate de tener acceso al usuario desde tu aplicación
        }),
      });

      if (!response.ok) {
        console.error('Error en la solicitud de publicación:', response.status);
        return;
      }

      setText('');
      obtenerPublicaciones();
      console.log('Publicación realizada correctamente');
    } catch (error) {
      console.error('Error al enviar la publicación:', error);
    }
  };

  const verificarFavorito= (idPublicacion)=>{
    if(favoritos.includes(idPublicacion)){
      return true;
    }else{
      return false;
    }
  };

  handleHeartPress= async(e, idPublicacion)=>{
    e.stopPropagation();
    // console.log('presionaste el corazón');
    // console.log(`Evento: ${e}, Id de la publicación: ${idPublicacion}`);
    try {
      const response = await fetch('https://cuidado-cuidador-backend.onrender.com/favoritos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          publicacionId: idPublicacion,
          usuarioId: usuario.id, 
        }),
      });

      if (!response.ok) {
        console.error('Error en la solicitud de favoritos:', response.status);
        return;
      }

      obtenerPublicaciones();
      obtenerFavoritos();
      console.log('Post manejado en favoritos');
    } catch (error) {
      console.error('Error al añadir a favoritos:', error);
    }
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    
    try {
      // Lógica de actualización o recarga de datos
      await obtenerPublicaciones();
      await obtenerFavoritos();
    } catch (error) {
      console.error('Error al refrescar:', error);
    } finally {
      setRefreshing(false);
    }
  }, [obtenerPublicaciones, obtenerFavoritos]);
  

  return (
    <View style={styles.mainContainer}>

      <Image style={styles.banner} source={require('../assets/images/foro/banner.png')} />

      <View style={styles.inputContainer}>
        <Image style={styles.inputImage} source={require('../assets/images/home/user.png')} />
        <View style={styles.inputSend}>
          <TextInput style={styles.input} placeholder='Pregunta en el foro...' placeholderTextColor={'#C5C0C0'} selectionColor={'#000'}  multiline={true} onChange={handleText} value={text} />
          <TouchableOpacity style={styles.sendButton} onPress={handleEnviarPublicacion}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.filtersContainer} >
        <Text style={filter== 'TODOS' ? styles.filterTextActive: styles.filterText} onPress={()=> setFilter('TODOS')}>Todos</Text>
        <Text style={filter== 'MIS PREGUNTAS' ? styles.filterTextActive: styles.filterText} onPress={()=> setFilter('MIS PREGUNTAS')} >Mis preguntas</Text>
        <Text style={filter== 'FAVORITOS' ? styles.filterTextActive: styles.filterText} onPress={()=> setFilter('FAVORITOS')}>Favoritos</Text>
      </View>

      
      <FlatList
        data={publicaciones}
        keyExtractor={(item) => item.IdPublicacion.toString()}
        renderItem={({ item }) => (
          <Post 
            nombre={item.nombre}
            apellido={item.apellido}
            textoPublicacion={item.TextoPublicacion}
            fechaPublicacion={item.FechaPublicacion}
            numeroRespuestas={item.RespuestasCount}
            obtenerPublicaciones={obtenerPublicaciones}
            enFavoritos={verificarFavorito(item.IdPublicacion)}
            handleHeartPress={(e) => handleHeartPress(e, item.IdPublicacion)}
            id={item.IdUsuario}
            onPress={(isUser) => navigation.navigate('PostForo', {
              postId: item.IdPublicacion,
              nombre: item.nombre,
              apellido: item.apellido,
              textoPublicacion: item.TextoPublicacion,
              fecha: item.FechaPublicacion,
              // updatePosts: obtenerPublicaciones,
              isUser,
            })}
          />
        )}
      style={styles.postsContainer} 
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#E59850', '#FFF']}/>}
      />

      <View style={{ height: 350 }} />

    </View>
  )
}

const styles= StyleSheet.create({
  postContainer: {
    marginBottom: 15,
    width: '100%',
    height: 110,
    // borderWidth: 2,
    // borderColor: 'red',
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15
  },
  postImage: {
    width: 70,
    height: 70,
    borderRadius: 50
  },
  postData: {
    gap: 3,
    // borderWidth: 2,
    // borderColor: 'red',
    flex: 1,
    paddingLeft: 20
  },
  postName: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  postText: {
    fontSize: 14,
    color: '#898989'
  },
  postRespuestas: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#E59850'
  },
  heart: {
    width: 35,
    height: 35
  },
  favDate: {
    justifyContent: 'space-between',
    // borderWidth: 2,
    // borderColor: 'red',
    height: 75,
    alignItems: 'center'
  },
  inicialContainer: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: '#E59850',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inicial: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff'
  },


  mainContainer: {
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    padding: 20,
    paddingBottom: 290,
    // borderWidth: 2,
    // borderColor: 'red',
    paddingTop: 35,
  },
  banner: {
    width: '100%',
    height: 150,
    contentFit: 'contain',
    // borderWidth: 2,
    // borderColor: 'red',
  },
  postsContainer: {
    width: '100%',
    marginTop: 20,
    // height: '100%',
    // marginBottom: 50
    // flex: 1
  },
  input: {
    // width: '70%',
    minHeight: 85,
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: 20,
    paddingBottom: 40,
    paddingRight: 20,
    paddingTop: 10
  },
  inputImage: {
    width: 55,
    height: 55,
    borderRadius: 10
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
    marginTop: 20,
    minHeight: 50,
  },
  filtersContainer: {
    width: '100%',
    flexDirection: 'row',
    // borderWidth: 2,
    // borderColor: 'red',
    marginTop: 20,
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
  sendButton: {
    width: 80,
    height: 30,
    backgroundColor: '#E59850',
    alignItems: 'center',
    borderRadius: 8,
    position: 'absolute',
    bottom: 10,
    right: 10,
    justifyContent: 'center'
  },
  sendButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputSend: {
    flexDirection: 'row',
    // width: '100%'
    flex: 1
  },


});

export default Foro