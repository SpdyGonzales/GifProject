import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
var look = require('../assets/look2.png');

export default class SplashScreen extends Component {
  render(){
    return(
      <View style={{backgroundColor:'green'}}>
        <Image
          source={look}
        />
      </View>
    );
  }
}
