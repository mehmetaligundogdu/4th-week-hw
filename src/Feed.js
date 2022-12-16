import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import {Card, Header} from '@rneui/base';
import {CardTitle} from '@rneui/base/dist/Card/Card.Title';

export default function Feed({navigation}) {
  const [students, setStudents] = useState([]);
  const fetchStudents = async () => {
    const studentsCollection = await firestore().collection('students').get();
    console.log(studentsCollection.docs);
    setStudents(
      studentsCollection.docs.map(doc => {
        return {...doc.data(), id: doc.id};
      }),
    );
  };
  const deleteStudent = async id => {
    const res = await firestore().collection('students').doc(id).delete();
    console.log(res);
    fetchStudents();
  };
  useEffect(() => {
    fetchStudents();
    firestore()
      .collection('students')
      .where('Type', '==', 'student')
      .onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            console.log('New Student: ', change.doc.data());
          }
          if (change.type === 'modified') {
            console.log('Modified Student: ', change.doc.data());
          }
          if (change.type === 'removed') {
            console.log('Removed Student: ', change.doc.data());
          }
          fetchStudents();
        });
      });
  }, []);
  return (
    <View>
      <Header
        placement="left"
        centerComponent={{
          text: 'Students',
          style: {color: '#fff', marginTop: 2},
        }}
        leftComponent={{icon: 'people', color: '#fff'}}
      />
      <ScrollView>
        {students.map(student => {
          return (
            <Card key={student.id}>
              <Card.Title
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#000',
                }}>
                {student.Name}
              </Card.Title>
              <Card.Divider />
              <Card.Title>
                {student.Age} years old ,{student.Department} students, studying
                at {student.School}
              </Card.Title>
              <Card.Divider />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <Icon
                  name="pencil"
                  color="green"
                  size={20}
                  onPress={() => {
                    navigation.navigate('UpdateScreen', {
                      studentToUpdate: student,
                    });
                  }}
                />
                <Icon
                  name="trash"
                  color="red"
                  size={20}
                  onPress={() => {
                    deleteStudent(student.id);
                  }}
                />
              </View>
            </Card>
          );
        })}
      </ScrollView>
    </View>
  );
}
