GLOBAL.self = GLOBAL;
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { SearchBar, Card } from 'react-native-elements'

export default class GifHandler extends Component {
  constructor(props){
    super(props);
    this.state = {
      gifs:[]
    };
  }

  componentDidMount = ()=>{
    this.fetchAPI();
  }

  componentWillReceiveProps = (nextProps) => {
      this.handleRequest(nextProps.inputText);
  }

  fetchAPI = ()=>{
    var GphApiClient = require('giphy-js-sdk-core');
    client = GphApiClient('Sf4LV8GVpftHbMxdt2vJHkH2FqC5h6PP')
  }

  handleGifSelect = (index, url) => {
      this.props.handleGifSelect(url);
  }

  handleRequest = (searchTerm) =>{
      client.search('gifs', {"q" : searchTerm})
    .then((response) => {
      let gifsUrls = response.data.map((gif) => {
       return gif.images;
     });
     this.setState({ gifs: gifsUrls });
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    const imageList = this.state.gifs.map((gif, index) =>
      <TouchableOpacity onPress={() => this.handleGifSelect(index, gif.original.gif_url)} key={index} index={index}>
      <Image
        source={ { uri:gif.fixed_height_downsampled.gif_url } }
        style={ styles.image }
      />
      </TouchableOpacity>
    );
    return (
      <KeyboardAvoidingView behavior={'padding'} style={styles.flat}>
          <FlatList
            horizontal={true}
            data={imageList}
            initialNumToRender={4}
            keyboardShouldPersistTaps={'always'}
            renderItem={({ item }) => item
          }
          />
      </KeyboardAvoidingView>
    );
  }
}

GifHandler.defaultProps ={
  inputText: ''
};

const styles = StyleSheet.create({
  flat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
    marginTop: 450,
  },
  image:{
    width: 200,
    height: 200,
    borderRadius: 2,
    marginRight: 1
  }
});
