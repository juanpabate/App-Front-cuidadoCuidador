import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


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
  },
  {
    id: 2,
    title: 'Guía de ejercicios',
    color: '#45B3CB',
    icon: require('../assets/images/home/guiaEjercicios.svg')
  },
  {
    id: 3,
    title: 'Foro',
    color: '#E59850',
    icon: require('../assets/images/home/foro.svg')
  },
];

//INFORMACIÓN DE LAS TAREAS
const TASKS = [
  {
    id: 1,
    title: 'Aplicar medicina',
    icon: require('../assets/images/home/medicina.svg'),
  },
  {
    id: 2,
    title: 'Medir ritmo cardiaco',
    icon: require('../assets/images/home/ritmoCardiaco.svg')
  }
];

//INFORMACIÓN DE LOS CHATS
// const CHATS = [
//   {
//     id: 1,
//     name: 'María Vélez',
//   },
//   {
//     id: 2,
//     name: 'Carlos Pérez',
//   },
//   {
//     id: 3,
//     name: 'Clara Morales',
//   },
//   {
//     id: 4,
//     name: 'Pablo Madrid',
//   }
// ];


//COMPONENTE DE LA CARD
const Card = ({ title, icon, bgColor }) => {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      style={[styles.card, { backgroundColor: bgColor }]}
      onPress={() => navigation.navigate('Notificaciones')}
    >
      <Image style={styles.cardLogo} source={icon} />
      <Text style={styles.cardTitle}>{title}</Text>
    </TouchableWithoutFeedback>
  );
};

//COMPONENTE DE LA TAREA
const Task = ({ title, icon }) => {

  return (
    <TouchableOpacity
      style={styles.taskCardContainer}
    >
      <Image style={styles.taskCardIcon} source={icon} />
      <Text style={styles.taskCardTitle}>{title}</Text>
      <Image style={styles.taskCardArrow} source={require('../assets/images/home/arrow.svg')} />
    </TouchableOpacity>
  );
};

//COMPONENTE DEL ELEMENTO DEL CHAT
const Chat = ({ name }) => {

  return (
    <TouchableOpacity
      style={styles.chatCard}
    >
      <Image style={styles.chatCardImage} source={require('../assets/images/home/userPhoto.png')} />
      <Text style={styles.chatCardName}>{name}</Text>
    </TouchableOpacity>
  );
};

// SEPARADOR HORIZONTAL PARA LOS ELEMENTOS DE LA FLATLIST DE LAS CARDS
const separatorHorizontalCards = () => {
  return <View style={{ width: 15 }} />;
};

// SEPARADOR HORIZONTAL PARA LOS ELEMENTOS DE LA FLATLIST DE LAS CARDS
const separatorHorizontalChat = () => {
  return <View style={{ width: 35 }} />;
};




const Home = () => {

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >

        <View style={styles.header} >
          <View style={styles.welcome} >
            <Image style={styles.welcomeImage} source={require('../assets/images/home/userPhoto.png')}/>
            <View>
              <Text style={styles.welcomeText}>Hola,</Text>
              <Text style={styles.welcomeTextBold}>Carolina 👋</Text> 
            </View>
          </View>
          {/* <Image style={styles.logo} source={require('../assets/images/logo.png')}/> */}
          <Image style={styles.hamburger} source={require('../assets/images/home/hamburger.svg')}/>
        </View>

        

        <FlatList
          data={CARDS_DATA}
          renderItem={({ item }) => (
            <Card title={item.title} icon={item.icon} bgColor={item.color}/>
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={separatorHorizontalCards}
          showsHorizontalScrollIndicator={false}
          flexGrow={0}
          horizontal={true}
        />

        <View style={styles.sectionContainer} >

          <View style={styles.sectionTextContainer}>
            <Text style={styles.sectionTitle}>Tareas</Text>
            <TouchableOpacity>
              <Text style={styles.sectionTouchable}>Ver todas</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.tasksContainer}>
            {
            TASKS.map(item=>(
              <Task title={item.title} icon={item.icon} key={item.id} />
            ))
            }
          </View>
      
        </View>

        <View style={styles.tipContainer}> 
          <View style={styles.tipTextContainer}>
            <Text style={styles.tipTitle}>Recomendación</Text>
            <Text style={styles.tipText}>Fermentum posuere urna nec tincidunt praesent semper feugiat. Odio tempor orci dapibus ultrices. Amet luctus venenatis.</Text>
          </View>
          <Image style={styles.tipImage} source={require('../assets/images/home/tip.png')} />
        </View>

        {/* <View style={styles.sectionContainer} >

          <View style={[styles.sectionTextContainer, {marginBottom: 20} ]}>
            <Text style={styles.sectionTitle}>Pregunta en el foro</Text>
            <TouchableOpacity>
              <Text style={styles.sectionTouchable}>Ir al foro</Text>
            </TouchableOpacity>
          </View>

          <TextInput style={styles.foroInput} placeholder='Escribe algo...' placeholderTextColor="#CAC2C2" selectionColor={'#CAC2C2'}/>
      
        </View> */}
        
      {/* <View style={{ height: 60 }} /> */}

      </ScrollView>

    </SafeAreaView>
    
  )
}

const styles= StyleSheet.create({
  mainContainer:{
    backgroundColor: COLORES.blanco,
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
    marginRight: 20,
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
    marginTop: 20,
  },
  sectionTextContainer: {
    // borderColor: 'red',
    // borderWidth: 1,
    // marginTop: 30,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent:'space-between',
    marginBottom: 20,
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
    gap: 16
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

  // foroInput: {
  //   width: '100%',
  //   height: 60,
  //   backgroundColor: '#fff',
  //   borderWidth: 1,
  //   borderColor: '#E2E2E2',
  //   borderRadius: 16,
  //   color: '#CAC2C2',
  //   fontSize: 20,
  //   paddingHorizontal: 15
  // },

  chatCard: {
    // borderColor: 'red',
    // borderWidth: 1,
    alignItems: 'center',
    gap: 10
  },
  chatCardImage: {
    width: 50,
    height: 50
  },
  chatCardName: {
    fontSize: 20,
    // borderColor: 'red',
    // borderWidth: 1,
    // width: '50%'
  },

  tipContainer: {
    height: 140,
    width: '100%',
    backgroundColor: COLORES.verdePrincipal,
    marginTop: 20,
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center'
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