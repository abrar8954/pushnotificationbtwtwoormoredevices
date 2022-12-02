
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
// import { firebaseConfig } from './firebase-config'
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// import "firebase/compat/messaging";
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';

const App = () => {
  useEffect(() => {
    // firebase.initializeApp(firebaseConfig);

  }, [])
  let object = {
    name: "Khan",
    Contact: "788888"
  }
  useEffect(() => {

    // firebase.messaging().getToken().then(token => {
    //   console.log(token);
    // })
  }, [])

  function addData() {
    console.log("HI there!");
    messaging().getToken().then(token => {
      console.log(token);
      firestore()
        .collection('usertoken')
        .add({
          token: token,
        })
    })

    // firebase.messaging().getToken().then(token => {
    //   console.log(token);
    // })

    // firebase.firestore()
    //   .collection('posts')
    //   .doc()
    //   .collection('postsa')
    //   .add(object).then((result) => {
    //     console.log("Sucessfull..");
    //   }).catch((error) => {
    //     console.log("Failed: ", error);
    //   })

    // firestore()
    //   .collection('posts')
    //   .doc()
    //   .collection('postsa')
    //   .add(object).then((result) => {
    //     console.log("Sucessfull..");
    //   }).catch((error) => {
    //     console.log("Failed: ", error);
    //   })


  }

  function sendNotifi() {
    firestore().collection('usertoken').get().then(querySnap => {
      const userDevicetoken = querySnap.docs.map(docSnap => {
        return docSnap.data().token
      })
      console.log(userDevicetoken)
      fetch('https://3841-59-103-244-174.ngrok.io/send-noti', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'

        },
        body: JSON.stringify({
          tokens: userDevicetoken
        })
      })
    })
  }

  return (

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text onPress={() => { addData() }}>Add Data!</Text>
      <Text style={{ marginTop: 10 }} onPress={() => { sendNotifi() }}>Send Notification!</Text>

    </View>

  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
