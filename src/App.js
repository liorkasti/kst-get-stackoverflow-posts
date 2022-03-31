/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar, Alert, FlatList, Modal, Dimensions } from 'react-native';
import { ActivityIndicator, Text, TouchableRipple, Switch, Avatar, Searchbar, Card, Title, IconButton } from 'react-native-paper';
import IconFeather from 'react-native-vector-icons/Feather';
import { WebView } from 'react-native-webview';
import SwitchSelector from 'react-native-switch-selector';
import axios from 'axios';
import moment from 'moment';

import { API } from './utils/constants';
import useFetch from './utils/useFetch';
import { THEME } from './utils/constants';
import { useTheme, useThemeUpdate } from './utils/ThemeContext';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  // const [getUserData, userData, isLoading, errorMessage] = useFetch();
  const [userData, setUserData] = useState < Array > ([]);
  const [userID, setUserID] = useState < string > ('');
  const [isLoading, setIsLoading] = useState < boolean > (false);
  const [errorMessage, setErrorMessage] = useState < string > ('');
  const [webLink, setWebLink] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getUserData();
    // if(userID?.length < 1) setErrorMessage('');
    return () => {
      setUserData([]);
      setErrorMessage('');
      setIsLoading(false);
    }
  }, [userID]);

  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();

  const themeStyles = {
    backgroundColor: darkTheme ? THEME.darkBkg : THEME.light,
    color: darkTheme ? THEME.light : THEME.dark,
    primaryColor: THEME.orange
  }

  const SORT_OPTIONS = [
    { label: 'Creation Date', value: 'CREATION_DATE' },
    { label: 'Answers Count', value: 'ANSWERS_COUNT' },
    { label: 'View Count', value: 'VIEW_COUNT' },
  ];

  const exchangeSort = sortby => {
    let dataSort;
    switch (sortby) {
      case 'CREATION_DATE':
        dataSort = [...userData].sort((a, b) => {
          return a.creation_date < b.creation_date;
        });
        break;
      case 'ANSWERS_COUNT':
        dataSort = [...userData].sort((a, b) => {
          return a.answer_count < b.answer_count;
        });
        break;
      case 'VIEW_COUNT':
        dataSort = [...userData].sort((a, b) => {
          return a.view_count < b.view_count;
        });
    }
    setUserData(dataSort);
  };

  const getUserData = async () => {
    if (userID) {
      
      try {
        console.log('userID :>> ', userID);
        setIsLoading(true)
        const response = await axios.get(API.baseURL + `${userID}` + API.questions + API.order);
        const result = response.data;
        setUserData(result.items);
        console.log('result :>> ', result);
        setIsLoading(false);
        if (!result?.items?.length) { setErrorMessage('User not found!') }
      } catch (error) {
        setIsLoading(false)
        // console.error('There was an error!', error);
        setErrorMessage('Something went wrong!\nPlease enter a valid user ID');
      }
    }
  };

  const renderItem = ({ item }) => {
    const date = new Date(item.creation_date * 1000).toLocaleDateString("en-US")
    const answers = item.answer_count;
    const viewCount = item.view_count;

    return (
      <Card style={[styles.card, { backgroundColor: themeStyles.backgroundColor, borderBottomColor: themeStyles.color }]}>
        <View style={styles.cardContent}>
          <Card.Content>
            <View style={styles.cardTitle}>
              <Title style={{ color: themeStyles.color }} color={themeStyles.color}>{item.title}</Title>
            </View>
            <View style={styles.cardSubTitle}>
              <Text style={{ color: themeStyles.color }}>
                {date ? `${(moment(date).fromNow())}` : ``}
                {answers ? `  Answers: ${answers}` : ``}
                {viewCount ? `  Viewed: ${viewCount} times` : ``}</Text>
            </View>
          </Card.Content>
          <IconButton style={{ position: 'absolute', left: windowWidth * .75 }} color={THEME.orange} icon='menu-right' size={40} onPress={() => goToWeb(item.link)} />
        </View>
      </Card>
    );
  }

  const goToWeb = link => {
    Alert.alert(
      '', 'Are you sure you want to exite to a web page?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => console.log('Cancel Pressed'),
          onDismiss: () => { return false }
        },
        {
          text: 'OK',
          onPress: () => {
            setWebLink(link),
              setModalVisible(true)
          },
          onDismiss: () => { return true }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={[styles.background, { backgroundColor: themeStyles.backgroundColor }]}>
      <StatusBar backgroundColor={themeStyles.primaryColor} animated={true} hidden={false}></StatusBar>

      <TouchableRipple>
        <View style={styles.switchContainer}>
          <IconFeather
            name={darkTheme ? 'moon' : 'sun'}
            style={[styles.icon, { color: darkTheme ? '#fff' : THEME.orange }]}
          />
          <Switch
            value={darkTheme}
            color={themeStyles.primaryColor}
            onValueChange={toggleTheme}
          />
        </View>
      </TouchableRipple>

      <View style={styles.container}>
        <Title style={[styles.title, { color: themeStyles.color }]}>
          Get Stack Overflow posts
        </Title>
        <Searchbar
          style={[styles.textInput, {
            backgroundColor: themeStyles.backgroundColor,
            borderColor: themeStyles.color, color: themeStyles.primaryColor
          }]}
          // icon
          // clearIcon
          inputStyle={{ fontSize: 16 }}
          theme={{ colors: { text: themeStyles.color } }}
          selectionColor={themeStyles.primaryColor}
          iconColor={themeStyles.color}
          placeholder={'user id'}
          placeholderTextColor={themeStyles.color}
          value={userID}
          onChangeText={setUserID}
          blurOnSubmit={true}
          keyboardType={'numeric'}
          // onEndEditing={() => getUserData()}
        />

        {errorMessage.length > 0 && // if errorMessage is not empty or if userData is empty
          <Text
            style={[styles.errorMessage, { color: themeStyles.primaryColor }]}>
            {errorMessage}
          </Text>
        }

        {isLoading && // if isLoading is true
          <View style={{ height: windowHeight * .5, justifyContent: 'center', alignItems: 'center' }} >
            <ActivityIndicator color={themeStyles.color} animating={true} />
          </View>
        }

        {userData[0]?.owner && // if userData is not empty
          <>
            <View style={styles.userDetailsContainer}>
              <Modal
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}>
                <WebView
                  source={{
                    uri: webLink,
                  }}
                />
              </Modal>
              <Avatar.Image source={{ uri: userData[0].owner.profile_image, }} size={60} />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ color: themeStyles.color }}>
                  Display Name: {userData[0].owner.display_name}
                </Text>
                <Text style={{ color: themeStyles.color }}>
                  Reputation: {userData[0].owner.reputation}
                </Text>
                <Text
                  style={{ color: themeStyles.color }}>
                  Questions: {userData.length}
                </Text>
              </View>
            </View>
            <View styles={styles.userDetailsContainer}>
              <Text style={[styles.sortTitle, { color: themeStyles.color, }]}>
                Sorting By
              </Text>
              <SwitchSelector
                options={SORT_OPTIONS}
                initial={0}
                onPress={value => exchangeSort(value)}
                style={{ width: windowWidth * .8 }}
                fontSize={12}
                backgroundColor={themeStyles.backgroundColor}
                textStyle={{ color: themeStyles.color }}
                buttonColor={themeStyles.color}
                borderRadius={10}
                borderBottomWidth={2}
                borderColor={themeStyles.color}
                selectedTextStyle={{ color: themeStyles.backgroundColor }}
                hasPadding
                bold
              />
            </View>

            <FlatList
              data={userData}
              renderItem={renderItem}
              keyExtractor={item => item.question_id}
              ListFooterComponent={() => <View style={{ height: 100 }} />}
              style={{ marginTop: 10 }}
            />
          </>
        }
      </View >
    </View >
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row-reverse',
    padding: '2%',
    fontWeight: '300',
    alignItems: 'center',
  },
  icon: {
    color: THEME.light,
    textAlign: 'right',
    fontSize: 20
  },
  title: {
    textAlign: 'center',
    marginTop: '5%',
    fontSize: 20,
  },
  errorMessage: {
    textAlign: 'center',
    marginTop: '5%',
    fontWeight: '500',
    marginBottom: '2%',
  },
  textInput: {
    width: windowWidth * .65,
    borderRadius: 10,
    borderBottomWidth: 2,
    margin: '5%',
    elevation: 5,

  },
  userDetailsContainer: {
    flexDirection: 'row',
    width: windowWidth * .65,
    marginTop: '5%',
    justifyContent: 'space-between',
  },
  sortTitle: {
    textAlign: 'center',
    marginTop: '5%',
    fontWeight: '500',
    marginBottom: '2%',
  },
  card: {
    flex: 1,
    position: 'relative',
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: windowWidth * .9,
    borderBottomWidth: 2,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingVertical: 10,
    paddingRight: 10,
    alignItems: 'center',
    elevation: 5,
  },
  cardContent: {
    width: windowWidth * .8,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  cardTitle: {
    width: windowWidth * .75,
    height: 'auto',
    fontSize: 16,
    fontWeight: '300',
    justifyContent: 'flex-start',
  },
  cardSubTitle: {
    flexDirection: 'row',
    width: windowWidth * .9,
    height: 20,
    fontWeight: '300',
    justifyContent: 'flex-start'
  }
});

export default App;