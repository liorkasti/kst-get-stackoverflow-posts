/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Image, FlatList, Pressable, Modal, } from 'react-native';
import axios from 'axios';
import { Searchbar, Card, Title } from 'react-native-paper';
import moment from 'moment';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState < boolean > (false);
  const [userID, setUserID] = useState < string > ('');
  const [posts, setPosts] = useState < Array > ([]);
  const [requestStatus, setRequestStatus] = useState < string > ('');

  const backgroundStyleColor = isDarkMode ? 'black' : 'white';
  const textStyleColor = isDarkMode ? 'white' : 'black';

  const getUserPosts = async () => {
    setRequestStatus('');
    try {
      const response = await axios.get(`https://api.stackexchange.com/2.2/users/${userID}/questions?order=desc&sort=creation&site=stackoverflow`);
      const result = await response.data;
      setPosts(result.items);
      console.log('posts :>> ', posts);
    } catch (error) {
      console.error(`user id:${userID} error ` + error);
      setRequestStatus('fail');
    }
  };

  const renderItem = ({ item }) => {
    const date = new Date(item.creation_date * 1000).toLocaleDateString("en-US")
    const answers = item.answer_count;
    const viewCount = item.view_count;

    return (
      <Card style={[styles.card, { backgroundColor: backgroundStyleColor, borderBottomColor: textStyleColor }]}>
        <Card.Content>
          <View style={styles.cardTitle}>
            <Title style={{ color: textStyleColor }} color={backgroundStyleColor}>{item.title}</Title>
          </View>
          <View style={styles.cardSubTitle}>
            <Text style={{ color: textStyleColor }}>
              {date ? `${(moment(date).fromNow())}` : ``}
              {answers ? `  Answers: ${answers}` : ``}
              {viewCount ? `  Viewed: ${viewCount} times` : ``}</Text>
          </View>
        </Card.Content>
      </Card>
    );
  }

  return (
    <View style={[styles.background, { backgroundColor: backgroundStyleColor }]}>
      <Text style={[styles.title, { color: textStyleColor }]}>
        Get Stack Overflow Posts
      </Text>
      <Searchbar
        style={[
          styles.textInput,
          { borderColor: textStyleColor, color: textStyleColor },
        ]}
        placeholder={'Enter Stack Overflow User ID'}
        placeholderTextColor={isDarkMode ? textStyleColor : 'lightgray'}
        value={userID}
        onChangeText={setUserID}
        blurOnSubmit={true}
        onSubmitEditing={getUserPosts}
      />
      {posts[0]?.owner &&
        <>
          <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={item => item.question_id}
            ListFooterComponent={() => <View style={{ height: 100 }} />}
            style={{ marginTop: 10 }}
          />
        </>
      }
    </View>
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