import React, {useState} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function UpdateScreen({navigation, route}) {
  const {studentToUpdate} = route.params;
  const studentId = studentToUpdate.id;
  const [student, setStudent] = useState({
    Name: studentToUpdate.Name,
    Age: studentToUpdate.Age,
    School: studentToUpdate.School,
    Department: studentToUpdate.Department,
    Type: 'student',
  });
  const resetForm = () => {
    setStudent({
      Name: '',
      Age: '',
      School: '',
      Department: '',
      Type: 'student',
    });
  };
  const updateStudent = async student => {
    try {
      await firestore().collection('students').doc(studentId).update(student);
      resetForm();
      navigation.navigate('Feed');
    } catch (error) {
      console.log(error);
    }
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
        Update a Student
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
      <Button title="Create" onPress={() => updateStudent(student)} />
    </View>
  );
}
