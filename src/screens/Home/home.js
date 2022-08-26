/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { useEffect } from 'react';
import { useState, useCallback, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet, Image
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../routes/auth.provider';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { setReciver } from '../../redux/chathome/chathome.action';

const Home = () => {

  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();



  useEffect(() => {
    firestore()
      .collection('users').where('uid', '!=', user.uid)
      .onSnapshot(querySnapshot => {
        console.log("querySnapshot", querySnapshot.docs)
        setData(querySnapshot.docs);
        setLoading(false);
      });
  }, []);




  return (
    <>
      <View style={styles.container}>
        <Text style={styles.userName}>User: {user.displayName}</Text>
        {loading === false ? data.map((user, i) =>
          <TouchableOpacity key={i} onPress={() => {
            dispatch(setReciver(user._data.displayName));
            navigation.navigate("Chatbox", user._data.uid)
          }} style={styles.selector}>
            <View style={styles.row}>
              <Image source={{ uri: user._data.photoURL || "https://img.icons8.com/external-others-inmotus-design/67/000000/external-Avatar-round-icons-others-inmotus-design-3.png" }} style={styles.pic} />
              <View>
                <View style={styles.nameContainer}>
                  <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{user._data.displayName}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ) : <ActivityIndicator size="large" color="#0000ff" />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 18,
    width: 170,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#008B8B',
    fontSize: 12,
    marginLeft: 15,
  },
  userName: {
    fontWeight: '600',
    color: '#222',
    fontSize: 18,
    marginLeft: 15,
  },
  selector: {
    backgroundColor: "#d2d2d2",
    margin: 10
  }
});


export default Home;
