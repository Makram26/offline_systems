import React, { useState } from 'react';
import { Text, View, SafeAreaView,StatusBar } from 'react-native';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';


import SQLite  from 'react-native-sqlite-storage';

var db =SQLite.openDatabase(
    { name: 'mydatabase.db', location: 'default' },
    () => console.log('Database opened'),
    error => console.error('Error opening database', error)

);

const ViewUser = () => {
    let [inputUserId, setInputUserId] = useState('');
    let [userData, setUserData] = useState({});
  
    let searchUser = () => {
      console.log(inputUserId);
      setUserData({});
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM user where id = ?',
          [inputUserId],
          (tx, results) => {
            var len = results.rows.length;
            console.log('len', len);
            if (len > 0) {
              setUserData(results.rows.item(0));
            } else {
              alert('No user found');
            }
          }
        );
      });
    };
  
    return (
      <SafeAreaView style={{ flex: 1 }}>

        <StatusBar translucent ={false} backgroundColor="red" barStyle={"light-content"}/>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={{ flex: 1 }}>
            <Mytextinput
              placeholder="Enter User Id"
              onChangeText={
                (inputUserId) => setInputUserId(inputUserId)
              }
              style={{ padding: 10 }}
            />
            <Mybutton title="Search User" customClick={searchUser} />
            <View
              style={{
                marginLeft: 35,
                marginRight: 35,
                marginTop: 10
              }}>
              <Text>User Id: {userData.id}</Text>
              <Text>User Name: {userData.user_name}</Text>
              <Text>User Contact: {userData.user_contact}</Text>
              <Text>User Address: {userData.user_address}</Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              color: 'grey'
            }}>
            Example of SQLite Database in React Native
          </Text>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
              color: 'grey'
            }}>
            after end then provide a link of github
          </Text>
        </View>
      </SafeAreaView>
    );
  };

export default ViewUser

