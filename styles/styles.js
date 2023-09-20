import { StyleSheet } from "react-native-web";

export function styles (){
    const styles = StyleSheet.create({
        logo: {
            // flex: 1,
            width: 260,
            resizeMode: 'contain'
          },
          container: {
            // borderColor: 'red',
            // borderWidth: 2,
            alignItems: 'center',
            paddingTop: 30,
            flex: 1,
          },
          after: {
            flex: 1,
          },
          dataContainer: {
            width: 320,
            height: 430,
            backgroundColor: '#FFF',
            borderRadius: 15,
            shadowColor: "rgba(0, 0, 0, 0.09)",
            shadowOffset: {
              width: 7,
              height: 7,
            },
            shadowOpacity: 1,
            shadowRadius: 3.84,
            elevation: 15,
            padding: 25,
            paddingTop: 30,
            marginTop: 25,
          },
          title: {
            fontSize: 25,
            color: '#066B10',
            fontWeight: 700,
          },
          subTitle: {
            color: '#A0A0A0',
            fontWeight: 700,
            fontSize: 15,
            marginTop: 5,
          },
          inputsContainer: {
            // flex: 1,
            height: 145,
            marginTop: 30,
            marginBottom: 30,
            // borderWidth: 2,
            // borderColor: 'red',
            justifyContent: 'space-between',
          },
          input: {
            backgroundColor: '#efefef',
            borderRadius: 15,
            height: 60,
            gap: 30,
            fontSize: 20,
            // fontWeight: 'bold',
            paddingLeft: 15,
          },
          buttonContainer: {
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'center',
          },
          button: {
            width: 170,
            height: 45,
            borderRadius: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          },
          buttonText:{
            fontWeight: 'bold',
            color: '#fff',
            fontSize: 17,
          },
    });
    return styles;
}