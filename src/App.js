import React, { useState } from 'react';
import { StyleSheet, View, StatusBar, FlatList, Modal, Alert } from 'react-native';
import { ActivityIndicator, Text, TouchableRipple, Switch, Avatar, Searchbar, Card, Title, IconButton } from 'react-native-paper';
// import IconFeather from 'react-native-vector-icons/Feather';
import moment from 'moment';

import { THEME } from './utils/constants';
import { useTheme, useThemeUpdate } from './utils/ThemeContext';
import useFetch from './utils/useFetch';

const App = () => {
  const [getUserData, userData, isLoading, errorMessage] = useFetch();
  const [userID, setUserID] = useState < string > ('');

  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();

  const themeStyles = {
    backgroundColor: darkTheme ? THEME.darkBkg : THEME.light,
    color: darkTheme ? THEME.light : THEME.dark,
    primaryColor: THEME.orange
  }

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

  return (
    <View style={[styles.background, { backgroundColor: themeStyles.backgroundColor }]}>
      <StatusBar backgroundColor={themeStyles.primaryColor} animated={true} hidden={false}></StatusBar>

      <TouchableRipple>
        <View style={styles.switchContainer}>
          {/* <IconFeather
            name={darkTheme ? 'moon' : 'sun'}
            style={[styles.icon, { color: darkTheme ? '#fff' : THEME.orange }]}
          /> */}
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
          onEndEditing={() => getUserData(userID)}
        />
        {errorMessage || userData.length === 0 && // if errorMessage is not empty or if userData is empty
          <Text style={{ color: 'red' }}>{errorMessage}</Text>
        }

        {isLoading && // if isLoading is true
          <View style={{ height: windowHeight * .5, justifyContent: 'center', alignItems: 'center' }} >
            <ActivityIndicator color={themeStyles.color} animating={true} />
          </View>
        }
        {userData[0]?.owner && // if userData[0] is not empty
          <>
            <View style={styles.userDetailsContainer}>
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
    color: '#fff',
    textAlign: 'right',
    fontSize: 20
  },
  title: {
    textAlign: 'center',
    marginTop: '5%',
    fontSize: 20,
  },
  textInput: {
    width: '65%',
    borderRadius: 10,
    borderBottomWidth: 2,
    margin: '5%',
    elevation: 5,

  },
  userDetailsContainer: {
    flexDirection: 'row',
    width: '65%',
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
    width: '90%',
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
    width: '80%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  cardTitle: {
    width: "75%",
    height: 'auto',
    fontSize: 16,
    fontWeight: '300',
    justifyContent: 'flex-start',
  },
  cardSubTitle: {
    flexDirection: 'row',
    width: '90%',
    height: 20,
    fontWeight: '300',
    justifyContent: 'flex-start'
  }
});

export default App;