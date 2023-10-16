import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Notifications = () => {
  return (
    <View style={styles.container} >
      <Text style={styles.text}>Estamos trabajando en esta funcionalidad.</Text>
      <Text style={styles.text}>En próximas actualizaciones estará disponible.</Text>
    </View>
  )
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    color: '#777'
  }
});

export default Notifications