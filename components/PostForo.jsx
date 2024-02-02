import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, ScrollView, RefreshControl } from 'react-native';
import { useState, useCallback } from 'react';
import { Image } from 'expo-image';


import { useSelector } from 'react-redux';
// import { ScrollView } from 'react-native-gesture-handler';

const Respuesta = ({ nombre, apellido, texto, fecha, handleReply, idUsuario, IdRespuesta, obtenerRespuestas }) => {

  const fechaOrdenada = new Date(fecha).toLocaleString('es-ES', {
    year: 'numeric',
    month: 'numeric',
  });

  const inicialNombre= nombre[0].toUpperCase();

  const usuario = useSelector((state) => state?.usuario);

  const [isUser, setIsUser]= useState(false);

  useEffect(() => {
    if (usuario.id == idUsuario) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, []);

  const handleBorrarRespuesta= async(IdRespuesta)=> {
    try {
      await fetch(`https://cuidado-cuidador-backend.onrender.com/foro/eliminarRespuesta/${IdRespuesta}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Respuesta eliminada correctamente');
      obtenerRespuestas;
    } catch (error) {
      console.error('Error al eliminar la respuesta:', error);
    }
  };



  return (
    <View style={styles.resContainer}>

      {/* <Image style={styles.resImage} source={require('../assets/images/home/userPhoto.png')} /> */}
      <View style={styles.inicialContainerRes}>
        <Text style={styles.inicialRes}>{inicialNombre}</Text>
      </View>

      <View style={styles.postData} >
        <Text style={styles.postName}>{isUser ? 'Tú' : `${nombre} ${apellido}`}</Text>
        <Text style={styles.resText}>{`${texto}`} </Text>
      </View>

      <Text style={styles.fecha}>{fechaOrdenada}</Text>

      {
          isUser && 
          <View style={styles.actionButtonsMainContainer}>
            <TouchableOpacity style={styles.actionButtonContainer} onPress={()=>handleBorrarRespuesta(IdRespuesta)}>
              <Image style={styles.actionButtonIcon} source={require('../assets/images/foro/delete.svg')} />
              <Text style={styles.actionButtonText}>Borrar</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.actionButtonContainer}>
              <Image style={styles.actionButtonIcon} source={require('../assets/images/foro/edit.svg')} />
              <Text style={styles.actionButtonText}>Editar</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.actionButtonContainer} onPress={handleReply}>
              <Image style={styles.actionButtonIcon} source={require('../assets/images/foro/reply.svg')} />
              <Text style={styles.actionButtonText}>Responder</Text>
            </TouchableOpacity>
          </View>
        }

        {
          isUser === false &&
          <View style={styles.actionButtonsMainContainer}>
            <TouchableOpacity style={styles.actionButtonContainer} onPress={handleReply}>
              <Image style={styles.actionButtonIcon} source={require('../assets/images/foro/reply.svg')} />
              <Text style={styles.actionButtonText} >Responder</Text>
            </TouchableOpacity>
          </View>
          
        }

    </View>

  );
};


const PostForo = ({ route, navigation }) => {
  const { nombre, apellido, textoPublicacion, fecha, postId, isUser } = route.params;

  const [respuestas, setRespuestas]= useState([]);

  const [isReply, setIsReply]= useState(false);
  const [isEditing, setIsEditing]= useState(false);

  const [respuestaTexto, setRespuestaTexto] = useState('');
  const [textoEditado, setTextoEditado] = useState(textoPublicacion);

  const [respuestaEditada, setRespuestaEditada] = useState('');



  const scrollViewRef = useRef(null);

  const usuario = useSelector((state) => state?.usuario);

  const fechaOrdenada = new Date(fecha).toLocaleString('es-ES', {
    year: 'numeric',
    month: 'numeric',
  });

  const inicialNombre= nombre[0].toUpperCase();


  const obtenerRespuestas = async () => {
    try {
      const response = await fetch('https://cuidado-cuidador-backend.onrender.com/foro/respuestas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idPublicacion: postId,
        }),
      });
      if (!response.ok) {
        console.error('Error en la solicitud:', response.status);
        return;
      }
      const data = await response.json();
      setRespuestas(data);
    } catch (error) {
      console.error('Error al obtener las publicaciones:', error);
    }
  };

  useEffect(() => {
    if (usuario) {
      obtenerRespuestas();
    } else {
      console.log('El usuario no está definido aún');
    }
  }, []);

  const handleReply= ()=>{
    setIsReply(true);
    setIsEditing(false);

    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }

  };

  const handleText= (e)=>{
    const text= e.nativeEvent.text;
    setRespuestaTexto(text);
  };

  const handleTextEdit= (e)=>{
    const text= e.nativeEvent.text;
    setTextoEditado(text);
  };


  //FUNCION PARA ENVIAR RESPUESTA A LA BASE DE DATOS
  const enviarRespuesta = async () => {
    if (respuestaTexto.trim() === '') {
      // Puedes mostrar un mensaje de error o realizar alguna acción adicional
      return;
    }

    try {
      const response = await fetch('https://cuidado-cuidador-backend.onrender.com/foro/agregarRespuesta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idPublicacion: postId,
          idUsuario: usuario.id, // Asegúrate de que tengas la información del usuario en tu estado
          textoRespuesta: respuestaTexto,
        }),
      });

      if (!response.ok) {
        console.error('Error en la solicitud:', response.status);
        // Puedes manejar errores específicos aquí
        return;
      }

      console.log('Respuesta enviada exitosamente');
      setRespuestaTexto('');
      setIsReply(false);
      obtenerRespuestas();

    } catch (error) {
      console.error('Error al enviar la respuesta:', error);
      // Puedes manejar errores específicos aquí
    }
  };

  const deletePost = async () => {
    console.log('Botón de borrar presionado');
    try {
      // Eliminar respuestas asociadas a la publicación
      const responseRespuestas = await fetch(`https://cuidado-cuidador-backend.onrender.com/foro/publicaciones/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!responseRespuestas.ok) {
        console.error('Error al eliminar la publicación:', responseRespuestas.status);
        // Puedes manejar errores específicos aquí
        return;
      }
  
      console.log('Publicación y respuestas eliminadas correctamente');
  
      // Puedes realizar alguna acción adicional después de eliminar el post y respuestas
      navigation.goBack(); // Regresar a la pantalla anterior
      // route.params?.updatePosts();
  
    } catch (error) {
      console.error('Error al enviar la solicitud de eliminación:', error);
      // Puedes manejar errores específicos aquí
    }
  };

  const editPost = ()=>{
    setIsEditing(true);
    setIsReply(false);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const enviarEdicion =()=>{
    console.log(`Editando el post con id ${postId}, cambiando el texto por "${textoEditado}"`);
    fetch(`https://cuidado-cuidador-backend.onrender.com/foro/editarPublicacion/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nuevoTexto: textoEditado,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Respuesta de la edición:', data);
      setIsEditing(false);
      obtenerRespuestas();
    })
    .catch(error => {
      console.error('Error en la solicitud de edición:', error);
      // Puedes manejar el error de la manera que consideres apropiada
    });
  };


  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    
    try {
      // Lógica de actualización o recarga de datos
      await obtenerRespuestas();
    } catch (error) {
      console.error('Error al refrescar:', error);
    } finally {
      setRefreshing(false);
    }
  }, [obtenerRespuestas]);
  
  


  return (
    <ScrollView ref={scrollViewRef} style={styles.mainContainer}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#E59850', '#FFF']}/>} 
    >

      <Image style={styles.banner} source={require('../assets/images/foro/banner.png')} />

      <TouchableOpacity style={styles.backButton} onPress={()=> navigation.goBack()}>
        <Text style={styles.backButtonText}>Atrás</Text>
      </TouchableOpacity>

      <View style={styles.postContainer}>

        {/* <Image style={styles.postImage} source={require('../assets/images/home/userPhoto.png')} /> */}
        <View style={styles.inicialContainer}>
          <Text style={styles.inicial}>{inicialNombre}</Text>
        </View>

        <View style={styles.postData} >
          <Text style={styles.postName}>{isUser ? 'Tú' : `${nombre} ${apellido}`}</Text>
          <Text style={styles.postText}>{textoEditado} </Text>
        </View>

        <Text style={styles.fecha}>{fechaOrdenada}</Text>

        {
          isUser && 
          <View style={styles.actionButtonsMainContainer}>
            <TouchableOpacity style={styles.actionButtonContainer} onPress={deletePost}>
              <Image style={styles.actionButtonIcon} source={require('../assets/images/foro/delete.svg')} />
              <Text style={styles.actionButtonText}>Borrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButtonContainer} onPress={editPost}>
              <Image style={styles.actionButtonIcon} source={require('../assets/images/foro/edit.svg')} />
              <Text style={styles.actionButtonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButtonContainer} onPress={handleReply}>
              <Image style={styles.actionButtonIcon} source={require('../assets/images/foro/reply.svg')} />
              <Text style={styles.actionButtonText}>Responder</Text>
            </TouchableOpacity>
          </View>
        }

        {
          isUser === false &&
          <View style={styles.actionButtonsMainContainer}>
            <TouchableOpacity style={styles.actionButtonContainer} onPress={handleReply}>
              <Image style={styles.actionButtonIcon} source={require('../assets/images/foro/reply.svg')} />
              <Text style={styles.actionButtonText} >Responder</Text>
            </TouchableOpacity>
          </View>
          
        }

        

      </View>

      {
        (respuestas.length > 0 || isReply || isEditing) &&
        <View style={styles.listContainer} >

          {respuestas.map((item)=>(
            <Respuesta 
              nombre={item.nombre}
              apellido={item.apellido}
              texto={item.TextoRespuesta}
              fecha={item.FechaRespuesta}
              handleReply={handleReply}
              idUsuario={item.IdUsuario}
              value={respuestaTexto}
              IdRespuesta={item.IdRespuesta}
              obtenerRespuestas={obtenerRespuestas}
              key={item.IdRespuesta.toString()}
            />
          ))}

          {
            isReply &&
            <View style={styles.inputContainer}>
              <Image style={styles.inputImage} source={require('../assets/images/home/user.png')} />
              <View style={styles.inputSend}>
                <TextInput style={styles.input} 
                           placeholder='Agrega un comentario...' 
                           placeholderTextColor={'#C5C0C0'} 
                           selectionColor={'#000'}  
                           multiline={true}
                          //  value= {textoPublicacion} 
                           onChange={handleText}
                           />

                <TouchableOpacity style={styles.sendButton} onPress={enviarRespuesta}>
                  <Text style={styles.sendButtonText}>Enviar</Text>
                </TouchableOpacity>
              </View>
            </View>
          }

          {
            isEditing &&
            <View style={styles.inputContainer}>
              <Image style={styles.inputImage} source={require('../assets/images/home/user.png')} />
              <View style={styles.inputSend}>
                <TextInput style={[styles.input, {borderColor: '#E59850', borderWidth: 2}]} 
                           placeholder='Agrega un comentario...' 
                           placeholderTextColor={'#C5C0C0'} 
                           selectionColor={'#000'}  
                           multiline={true}
                           value= {textoEditado} 
                           onChange={handleTextEdit}
                           />

                <TouchableOpacity style={styles.sendButton} onPress={enviarEdicion}>
                  <Text style={styles.sendButtonText}>Editar</Text>
                </TouchableOpacity>
              </View>
            </View>
          }

        </View>
        
      }

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 10,
    width: '100%',
    minHeight: 110,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 20,
    gap: 15,
    padding: 15,
    paddingBottom: 50,
    // borderWidth: 2,
    // borderColor:'red',
  },
  postImage: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  postData: {
    gap: 3,
    flex: 1
  },
  postName: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  postText: {
    fontSize: 17,
    color: '#898989',
    flexWrap:'wrap',
    lineHeight: 23
  },
  actionButtonsMainContainer: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    flexDirection: 'row',
    gap: 15,
  },
  actionButtonContainer: {
    flexDirection:'row',
    gap: 3,
    // justifyContent: 'center',
    alignItems: 'center'
    // position: 'absolute',
    // bottom: 15,
    // right: 15,
  },
  actionButtonIcon: {
    width: 17,
    height: 17,
    contentFit: 'contain',
  },
  actionButtonText: {
    color: '#E59850',
    fontSize: 15,
    fontWeight: 'bold'
  },
  fecha: {
    fontSize: 13,
    color: '#898989',
    position: 'absolute',
    right: 15,
    top: 15
  },
  resText: {
    fontSize: 15,
    color: '#898989',
    flexWrap:'wrap',
    lineHeight: 23
  },
  resContainer: {
    marginBottom: 10,
    width: '100%',
    minHeight: 100,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 20,
    gap: 15,
    padding: 15,
    paddingBottom: 45,
    // borderWidth: 2,
    // borderColor:'red',
  },
  resImage: {
    width: 30,
    height: 30,
    borderRadius: 50
  },
  inicialContainerRes: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: '#E59850',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inicialRes: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff'
  },
  
 

  mainContainer: {
    // alignItems: 'center',
    backgroundColor: '#F3F3F3',
    padding: 20,
    // paddingBottom: 290,
    paddingTop: 35,
    paddingBottom: 0,
    // justifyContent: 'center',
    flex: 1,
    // borderWidth: 2,
    // borderColor:'red',
  },
  banner: {
    width: '100%',
    height: 150,
    contentFit: 'contain',
    marginBottom: 20
  },
  listContainer: {
    flex: 1,
    width: '100%',
    paddingLeft: 20,
    borderWidth: 3,
    borderLeftColor: '#E2E2E2',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    marginBottom: 35,
    
  },
  inicialContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#E59850',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inicial: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
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
    marginBottom: 10,
    // marginLeft: 30,
    // marginRight: 35,
    minHeight: 50,
    backgroundColor: 'transparent',
    // borderWidth: 2,
    // borderColor: 'red'
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
  backButtonText: {
    color: '#E59850',
    fontSize: 16,
    fontWeight: '500',
  },
  backButton: {
    // borderWidth: 2,
    // borderColor: 'red',
    width: 60,
    alignItems: 'center',
    marginBottom: 10
  },


  
  
});

export default PostForo;
