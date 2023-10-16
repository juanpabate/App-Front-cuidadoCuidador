import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


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
const CHATS = [
  {
    id: 1,
    name: 'María Vélez',
  },
  {
    id: 2,
    name: 'Carlos Pérez',
  },
  {
    id: 3,
    name: 'Clara Morales',
  },
  {
    id: 4,
    name: 'Pablo Madrid',
  }
];


//COMPONENTE DE LA CARD
const Card = ({ title, icon, bgColor }) => {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      style={[styles.card, { backgroundColor: bgColor }]}
      onPress={() => navigation.navigate('Register')}
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
      <ScrollView style={styles.container} >

        <View style={styles.header} >
          <Image style={styles.logo} source={require('../assets/images/logo.png')}/>
          <Image style={styles.hamburger} source={require('../assets/images/home/hamburger.svg')}/>
        </View>

        <View style={styles.welcome} >
          <Image style={styles.welcomeImage} source={require('../assets/images/home/userPhoto.png')}/>
          <Text style={styles.welcomeText} >Hola, <Text style={styles.welcomeTextBold}>Carolina</Text> 👋</Text>
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

        <View style={styles.sectionContainer} >

          <View style={[styles.sectionTextContainer, {marginBottom: 35} ]}>
            <Text style={styles.sectionTitle}>Tienes mensajes nuevos</Text>
            <TouchableOpacity>
              <Text style={styles.sectionTouchable}>foro</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
          data={CHATS}
          renderItem={({ item }) => (
            <Chat name={item.name}/>
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={separatorHorizontalChat}
          showsHorizontalScrollIndicator={false}
          flexGrow={0}
          horizontal={true}
        />
      
        </View>

      </ScrollView>
    </SafeAreaView>
    
  )
}

const styles= StyleSheet.create({
  mainContainer:{
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 15,
  },
  container: {
    // borderColor: 'red',
    // borderWidth: 1,
    flex: 1,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  header: {
    // borderColor: 'red',
    // borderWidth: 1,
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    resizeMode: 'contain',
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
    fontWeight: 600,
    lineHeight: 20
  },
  sectionContainer: {
    // borderColor: 'red',
    // borderWidth: 1,
    marginTop: 30,
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
    color: '#45B3CB'
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
    backgroundColor: '#ECF2F3',
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
  }
})

export default Home