import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { render } from 'react-dom';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

export default class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    }
  }

  componentDidMount () {
    // TMDB API GET request with my API key
    return fetch('https://api.themoviedb.org/3/movie/popular?api_key=bc44f90b35063a4410820f7ec8b8c469&language=en-US&page=2&region=US')
      .then ( (response) => response.json() )
      .then ( (responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.results
        })

      })

      .catch ( (error) => {
        console.log(error)
      });
      
  }

  render () {

    if (this.state.isLoading) {

      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )

    } 
    else {

      let movie = this.state.dataSource.map((val, key) => {
        return <View key={key} style={styles.item}>

          <Text>{val.original_title}</Text>
    
          </View>
      });

      return (

        <View style={styles.container}>

          <Text style={styles.title}>FreshFlix</Text>
          <ScrollView style={styles.scrollView}>
            {movie}
          </ScrollView>

        </View>

      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    alignSelf: 'stretch',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
  },
  scrollView: {
    backgroundColor: '#fff',
    marginHorizontal: 40,
    marginBottom: 40,
  },
  title: {
    alignItems: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'Times New Roman',
    color: '#FF0000',
    marginTop: 40
  }
})