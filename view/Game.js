GLOBAL.self = GLOBAL;
import React, { Component } from 'react';
import GifHandler from './GifHandler.js';
import StartScreen from './StartScreen.js';
import GameScreen from './GameScreen.js';
import GameOverScreen from './GameOverScreen.js';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Image,
  KeyboardAvoidingView,
  StatusBar
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { SearchBar } from 'react-native-elements'

let catArray = [];
var timer;

export default class Game extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: '',
      gifMes: [],
      isIntro: true,
      currentCat:'Failed Connection. Please Restart Gifarades',
      aScore: 0,
      bScore: 0,
      turn: 1,
      aTurn: true,
      timeUp: null,
      lastCat: '',
      gameOver: false,
      loading: true
    };
  }

  componentWillMount() {
    fetch('http://localhost:3000/v1/categories').then((response) => response.json())
    .then((data) => {
      catArray = data.map((category) => category.title);
      console.log('new data', catArray);
      this.setState({
        currentCat: catArray.splice(Math.floor(Math.random()*catArray.length),1)[0]
      })
    }).catch(function(err){
      console.log(err);
    });
  }
  
  componentDidMount() {
    StatusBar.setHidden(true);
    console.log(this.state.currentCat);
    setTimeout(() => {
      this.setState({ isIntro: false });
    }, 20000);
    timer = setTimeout(() => {
      this.restart();
    }, 80000);

    this.state.loading = false;
  }
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
    headerStyle: {
    backgroundColor: '#556B2F'
   }
  }

  getGuess = (guess) => {
    var answer = this.state.currentCat.substring(this.state.currentCat.indexOf("-")+2);
    try{
      if(answer.toLowerCase() == guess.toLowerCase()){
        if(this.state.aTurn){
          this.state.aScore++;
        }else{
          this.state.bScore++;
        }
      if(this.state.turn != 6){
        this.state.turn++;
        clearTimeout(timer);
        this.setState({ isIntro: false});
        this.setState({ timeUp: false});
        this.state.aTurn = !this.state.aTurn;
        this.state.lastCat = this.state.currentCat;
        this.state.currentCat = catArray.splice(Math.floor(Math.random()*catArray.length),1)[0];
        console.log(this.state.currentCat);
        this.setState({ isIntro: true })
        timer = setTimeout(() => {
         this.restart();
       }, 80000);
        setTimeout(() => {
         this.setState({ isIntro: false});
       }, 20000);
     }else{
       this.setState({ gameOver: true })
       setTimeout(() => {
        this.props.navigation.navigate('Friendly')
       }, 15000);
     }
   }
    }catch(error){
      console.log(error);
    }
  }

  handleGifRend = (gifMessage) => {
      let arr = this.state.gifMes;
      if(!arr.includes(gifMessage)){
        arr.push(gifMessage);
        this.setState({gifMes: arr})
        console.log(this.state.gifMes);
      }
  }
  restart = ()=>{
    console.log(this.state.turn);
    if(this.state.turn != 6){
      this.setState({timeUp: true });
      this.state.turn++;
      this.state.aTurn = !this.state.aTurn;
      this.state.lastCat = this.state.currentCat;
      this.state.currentCat = catArray.splice(Math.floor(Math.random()*catArray.length),1)[0];
      console.log(this.state.currentCat);
      this.setState({ isIntro: true })
      timer = setTimeout(() => {
       this.restart();
     }, 80000);
      setTimeout(() => {
       this.setState({ isIntro: false, timeUp: false });
     }, 20000);
   }else{
     this.setState({ gameOver: true })
     setTimeout(() => {
      this.props.navigation.navigate('Friendly')
     }, 15000);
   }
  }

  render() {
    const mesList = this.state.gifMes.map((gif, index) =>
      <Image
        source={ { uri:gif } }
        style={ styles.image }
      />
    );
    return (
      <View>
      {this.state.isIntro && !this.state.gameOver &&
        <StartScreen
        catFromParent = {this.state.currentCat}
        aScore = {this.state.aScore}
        bScore = {this.state.bScore}
        timeUp = {this.state.timeUp}
        lastCat = {this.state.lastCat}
        />
      }

      {!this.state.isIntro && !this.state.gameOver &&
        <GameScreen
        catFromParent = {this.state.currentCat}
        sendGuess={this.getGuess}
        />
      }
      {this.state.gameOver &&
          <GameOverScreen
            aScore = {this.state.aScore}
            bScore = {this.state.bScore}
          />
      }

      /*
      <KeyboardAvoidingView style={styles.board}>
      <FlatList
        data={mesList}
        keyboardShouldPersistTaps={'always'}
        renderItem={({ item }) => item
      }
      />
      </KeyboardAvoidingView>
      <View style={styles.searchArea}>
      <GifHandler
        inputText={this.state.text}
        handleGifSelect={this.handleGifRend}
      />
      </View>
      {!this.state.isIntro &&
        <View style={styles.searchBars}>
        <SearchBar
        lightTheme
        //Fix timeout for better performance
        onChangeText={text => this.setState({text})}
        value ={this.state.text}
          //onChangeText={someMethod}
          //onClearText={someMethod}
          placeholder='Search GIF library' />
        </View>
      }
      */
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  searchBars: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  image:{
    width: 400,
    height: 200,
    borderRadius: 2,
    marginBottom: 3
  },
  searchArea:{
    position: 'absolute'
  },
  board:{
    marginBottom: 60
  },
  startScreen:{
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    alignItems: 'center',
  }
});
