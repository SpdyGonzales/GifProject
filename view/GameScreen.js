GLOBAL.self = GLOBAL;
import React, { Component } from 'react';
import GifHandler from './GifHandler.js';
var note = require('../assets/note.png');
var {height, width} = Dimensions.get('window');
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Image,
  KeyboardAvoidingView,
  StatusBar,
  Dimensions,
  TextInput
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { SearchBar } from 'react-native-elements'

export default class GameScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: '',
      gifMes: [],
      isGuess: false,
      guess: '',
      isOver: false
    };
  }
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
    headerStyle: {
    backgroundColor: '#556B2F'
   }
  }

  componentDidMount() {
     setTimeout(() => {
      this.setState({ isGuess: true });
    }, 30000);
    setTimeout(() => {
     this.setState({ isOver: true });
   }, 60000);
  }

  handleGifRend = (gifMessage) => {
      let arr = this.state.gifMes;
      var catArray = this.props.catFromParent.split(" ");
      var flag = false;
      for(var i = 0; i<catArray.length; i++){

        if(arr.includes(gifMessage) || this.state.text.includes(catArray[i]) || catArray[i].includes(this.state.text)){
          flag = true;
        }
      }
      if(!flag){
        arr.push(gifMessage);
        this.setState({gifMes: arr})
        console.log(this.state.gifMes);
      }
  }
  sendGuess = (guess) => {
      this.props.sendGuess(guess);
  }

  render() {
    const mesList = this.state.gifMes.map((gif, index) =>
      <Image
        source={ { uri:gif } }
        style={ styles.gif }
      />
    );
    return (
      <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={note}
        />
      </View>
      <KeyboardAvoidingView style={styles.board}>
      <FlatList
        data={mesList}
        keyboardShouldPersistTaps={'always'}
        renderItem={({ item }) => item
      }
      />
      </KeyboardAvoidingView>
      <View style={styles.searchArea}>
      {!this.state.isGuess &&
      <GifHandler
        inputText={this.state.text}
        handleGifSelect={this.handleGifRend}
      />
      }
      </View>
        <View style={styles.searchBar}>
        {!this.state.isGuess &&
        <SearchBar
        lightTheme
        //Fix timeout for better performance
        onChangeText={text => this.setState({text})}
        value ={this.state.text}
          //onChangeText={someMethod}
          //onClearText={someMethod}
          placeholder='Search GIF library' />
        }
        {this.state.isGuess &&
          <TextInput
          style={{height: 40,borderColor: 'gray', borderWidth:10, textAlign:'center', backgroundColor: 'white', alignItems: 'center', borderWidth: 1, fontWeight:'bold'}}
          placeholder="The Word is"
          onChangeText={(guess) => this.sendGuess(guess)}
        />
        }
        </View>
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0FFFF',
    flexDirection: 'column',
    width: width,
    height: height
  },
  searchBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  image:{
    width: 400,
    height: 200,
    borderRadius: 2,
    marginBottom: 3,
  },
  searchArea:{
    position: 'absolute'
  },
  board:{
    marginBottom: 45,
    marginTop: 90,

  },
  logo:{
    width: 60,
    height: 60,
  },
  header:{
    top: 14,
    flex: 1,

  },
  gif:{
    height: 200,
    width: width,
    marginTop: 5,
    resizeMode:'stretch'
  },
});
