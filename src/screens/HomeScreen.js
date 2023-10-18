import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'

import Mybutton from '../components/Mybutton'
import Mytext from '../components/Mytext'
import SQLite from 'react-native-sqlite-storage';


var db =SQLite.openDatabase(
    { name: 'mydatabase.db', location: 'default' },
    () => console.log('Database opened'),
    error => console.error('Error opening database', error)

);


db.transaction((tx) => {
    db.executeSql(
        'CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY AUTOINCREMENT, user_name TEXT, user_contact NUMBER, user_address TEXT)',
        []
    );
   
});


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


const HomeScreen = ({ navigation }) => {
 

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1 }}>
                    <Mytext text="SQLite Example" />
                    <Mybutton
                        title="Register"
                        customClick={() => navigation.navigate('Register')}
                    />
                    <Mybutton
                        title="Update"
                        customClick={() => navigation.navigate('Update')}
                    />
                    <Mybutton
                        title="View"
                        customClick={() => navigation.navigate('View')}
                    />
                    <Mybutton
                        title="View All"
                        customClick={() => navigation.navigate('ViewAll')}
                    />
                    <Mybutton
                        title="Delete"
                        customClick={() => navigation.navigate('Delete')}
                    />
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

export default HomeScreen

const styles = StyleSheet.create({})