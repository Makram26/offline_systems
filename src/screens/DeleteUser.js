import React, { useState } from 'react';
import { Text, View, Alert, SafeAreaView } from 'react-native';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';

import SQLite from 'react-native-sqlite-storage';


var db =SQLite.openDatabase(
    { name: 'mydatabase.db', location: 'default' },
    () => console.log('Database opened'),
    error => console.error('Error opening database', error)

);

const DeleteUser = ({ navigation }) => {
    let [inputUserId, setInputUserId] = useState('');
  
    let deleteUser = () => {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM  user where id=?',
          [inputUserId],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'User deleted successfully',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('HomeScreen'),
                  },
                ],
                { cancelable: false }
              );
            } else {
              alert('Please insert a valid User Id');
            }
          }
        );
      });
    };
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1,  }}>
          <View style={{ flex: 1 }}>
            <Mytextinput
              placeholder="Enter User Id"
              onChangeText={
                (inputUserId) => setInputUserId(inputUserId)
              }
              style={{ padding: 10 }}
            />
            <Mybutton title="Delete User" customClick={deleteUser} />
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
            www.aboutreact.com
          </Text>
        </View>
      </SafeAreaView>
    );
  };

export default DeleteUser

