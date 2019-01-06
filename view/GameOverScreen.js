GLOBAL.self = GLOBAL;
import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
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
  Animated,
  Dimensions
} from 'react-native';

export default class GameOverScreen extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    StatusBar.setHidden(true);
  }
  render(){
    return(
      <View style={styles.MainContainer}>
        <Text style={styles.text}> The Game is Over </Text>
        {this.props.aScore == this.props.bScore ? <Text style={styles.text}> It is a Draw </Text> : null }
        {this.props.aScore > this.props.bScore ? <Text style={styles.text}> Team A Won </Text> : <Text> Team B Won </Text>}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer:
    {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: width,
        height:height,
        backgroundColor: 'black'
    },
  text: {
    fontSize: 20, fontWeight: 'bold', color: 'white', fontFamily: 'Cochin'
  }
})
