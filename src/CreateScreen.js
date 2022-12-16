import React, {useState} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';

export default function CreateScreen({navigation}) {
  const [student, setStudent] = useState({
    Name: '',
    Age: '',
    School: '',
    Department: '',
    Type: 'student',
  });
  const createStudent = async student => {
    try {
      await firestore().collection('students').add(student);
      resetForm();
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };
  const resetForm = () => {
    setStudent({
      Name: '',
      Age: '',
      School: '',
      Department: '',
      Type: 'student',
    });
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 15,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          marginBottom: 30,
        }}>
        Create a Student
      </Text>
      <TextInput
        value={student.Name}
        onChangeText={Name => {
          setStudent({...student, Name: Name});
        }}
        placeholder="Enter Name"
        leftIcon={{type: 'font-awesome', name: 'header'}}
      />
      <TextInput
        value={student.Age}
        onChangeText={Age => {
          setStudent({...student, Age: Age});
        }}
        placeholder="Enter Age"
        leftIcon={{type: 'font-awesome', name: 'vcard'}}
      />
      <TextInput
        value={student.School}
        onChangeText={School => {
          setStudent({...student, School: School});
        }}
        placeholder="Enter School"
        leftIcon={{type: 'font-awesome', name: 'building-o'}}
      />
      <TextInput
        value={student.Department}
        onChangeText={Department => {
          setStudent({...student, Department: Department});
        }}
        placeholder="Enter Department"
        leftIcon={{type: 'font-awesome', name: 'desktop'}}
      />
      <Button title="Create" onPress={() => createStudent(student)} />
    </View>
  );
}
