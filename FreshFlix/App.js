import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, Image, View, ActivityIndicator, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
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
    return fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=bc44f90b35063a4410820f7ec8b8c469&language=en-US')
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

  searchMovies = (movie) => {
    const filteredMovies = this.state.results.filter(
      movie => {
        let movieLowercase = (movie.title).toLowerCase()
        let searchTermLowercase = movie.toLowerCase()

        return movieLowercase.indexOf(searchTermLowercase) > -1
      });
      this.setState({movie: filteredMovies});
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

          <Image style={styles.movieImage} source={{uri: 'https://image.tmdb.org/t/p/w185'}}></Image>
          <Text style={styles.filmTitle}>{val.title} - {val.release_date}</Text>
          <Text style={styles.overview}>{val.overview}</Text>
    
          </View>
      });

      return (

        <View style={styles.container}>

          <Text style={styles.title}>FreshFlix</Text>

          <SafeAreaView style={{ backgroundColor: 'black', alignSelf: 'left', marginHorizontal: 25 }}>
            <TextInput placeholder='Search' style={
              { backgroundColor: 'black', 
                height: 20,
                fontSize: 20,
                padding: 10,
                color: 'white',
                marginBottom: 20,
              }}
                onChangeText={(movie) => this.searchMovies(movie)}>
              </TextInput>
          </SafeAreaView>

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
  },
  filmTitle: {
    fontWeight: 'bold'
  },
  overview: {
    fontStyle: 'italic'
  }
})