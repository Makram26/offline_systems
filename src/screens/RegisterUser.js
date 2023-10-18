import React, { useState } from 'react';
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    SafeAreaView,
    Text,
} from 'react-native';

import Mytextinput from "../components/Mytextinput"
import Mybutton from '../components/Mybutton';
import SQLite  from 'react-native-sqlite-storage';

var db =SQLite.openDatabase(
    { name: 'mydatabase.db', location: 'default' },
    () => console.log('Database opened'),
    error => console.error('Error opening database', error)

);


const RegisterUser = ({ navigation }) => {
    let [userName, setUserName] = useState('');
    let [userContact, setUserContact] = useState('');
    let [userAddress, setUserAddress] = useState('');

    let register_user = () => {
        console.log(userName, userContact, userAddress);

        if (!userName) {
            alert('Please fill name');
            return;
        }
        if (!userContact) {
            alert('Please fill Contact Number');
            return;
        }
        if (!userAddress) {
            alert('Please fill Address');
            return;
        }


        try {

            db.executeSql(
                'INSERT INTO user (user_name, user_contact, user_address) VALUES (?,?,?)',
                [userName, userContact, userAddress],
                () => console.log('Data inserted'),
                error => console.error('Error inserting data', error)
                // (tx, results) => {
                //   console.log('Results', results.rowsAffected);
                //   if (results.rowsAffected > 0) {
                //     Alert.alert(
                //       'Success',
                //       'You are Registered Successfully',
                //       [
                //         {
                //           text: 'Ok',
                //           onPress: () => navigation.navigate('HomeScreen'),
                //         },
                //       ],
                //       { cancelable: false }
                //     );
                //   } else alert('Registration Failed');
                // }
            );

        } catch (error) {
            console.log("error", error)
        }



    };



    const checkTableExists = () => {
        return new Promise((resolve, reject) => {
          // Execute a query to check if the table exists
          db.transaction((tx) => {
            tx.executeSql(
              "SELECT name FROM sqlite_master WHERE type='table' AND name='user'",
              [],
              (tx, results) => {
                // Check the number of rows returned by the query
                if (results.rows.length > 0) {
                  // Table exists
                  resolve(true);
                } else {
                  // Table does not exist
                  resolve(false);
                }
              },
              (error) => {
                // Error occurred while executing the query
                reject(error);
              }
            );
          });
        });
      };
      
      // Usage example
      checkTableExists()
        .then((exists) => {
          if (exists) {
            console.log('Table exists');
          } else {
            console.log('Table does not exist');
          }
        })
        .catch((error) => {
          console.log('Error checking table existence:', error);
        });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1 }}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <KeyboardAvoidingView
                            behavior="padding"
                            style={{ flex: 1, justifyContent: 'space-between' }}>
                            <Mytextinput
                                placeholder="Enter Name"
                                onChangeText={
                                    (userName) => setUserName(userName)
                                }
                                style={{ padding: 10 }}
                            />
                            <Mytextinput
                                placeholder="Enter Contact No"
                                onChangeText={
                                    (userContact) => setUserContact(userContact)
                                }
                                maxLength={10}
                                keyboardType="numeric"
                                style={{ padding: 10 }}
                            />
                            <Mytextinput
                                placeholder="Enter Address"
                                onChangeText={
                                    (userAddress) => setUserAddress(userAddress)
                                }
                                maxLength={225}
                                numberOfLines={5}
                                multiline={true}
                                style={{ textAlignVertical: 'top', padding: 10 }}
                            />
                            <Mybutton title="Submit" customClick={register_user} />
                        </KeyboardAvoidingView>
                    </ScrollView>
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

export default RegisterUser
