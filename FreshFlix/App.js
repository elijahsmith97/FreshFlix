import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { render } from 'react-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    }
  }

  componentDidMount () {
    return fetch('https://api.themoviedb.org/3/movie/latest?api_key=bc44f90b35063a4410820f7ec8b8c469&language=en-US')
      .then ( (response) => response.json() )
      .then ( (responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.movie
        })

      })
      .catch((error) => {
        console.log(error)
      });
  }

  render() {

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
          <Text>{movie}</Text>
        </View>

      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    flex: 1,
    alignSelf: 'stretch',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  }
})