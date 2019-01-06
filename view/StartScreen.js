GLOBAL.self = GLOBAL;
import React, { Component } from 'react';
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
  Animated,
  Dimensions
} from 'react-native';

export default class StartScreen extends Component {

  constructor(props){
    super(props);
    this.AnimationBack = new Animated.Value(0);
    this.AnimationIcon = new Animated.Value(0);
    this.AnimationSize = new Animated.Value(0);
    this.AnimationCatText = new Animated.Value(0);
    this.AnimationIntro = new Animated.Value(0);
  }


  componentDidMount() {
    StatusBar.setHidden(true);
      setTimeout(() => {
        this.StartBackgroundColorAnimation();
      }, 4000);
      setTimeout(() => {
        this.StartOpacityIntro();
      }, 3000);
      setTimeout(() => {
        this.StartIconMovement();
        this.StartIconSize();
      }, 14000);
      setTimeout(() => {
        this.StartCatOpacity();
      }, 5000);

  }

  StartBackgroundColorAnimation = () =>
    {
      this.AnimationBack.setValue(0);

        Animated.timing(
            this.AnimationBack,
            {
                toValue: 1,
                duration: 10000
            }
        ).start();
    }
  StartIconMovement = () =>
    {
      this.AnimationIcon.setValue(0);

          Animated.timing(
              this.AnimationIcon,
              {
                  toValue: 1,
                  duration: 3000
              }
          ).start();
      }
  StartIconSize = () =>
    {
      this.AnimationSize.setValue(0);

          Animated.timing(
              this.AnimationSize,
              {
                  toValue: 1,
                  duration: 3000
              }
          ).start();
      }
  StartOpacityIntro = () =>
    {
      this.AnimationIntro

          Animated.timing(
            this.AnimationIntro,
            {
                  toValue: 1,
                  duration: 3000
            }
          ).start();
    }
    StartCatOpacity = () =>
      {
        this.AnimationCatText

            Animated.timing(
              this.AnimationCatText,
              {
                    toValue: 1,
                    duration: 16000
              }
            ).start();
      }
  render(){
    console.log('render', this.props);
    
    const BackgroundColorConfig = this.AnimationBack.interpolate(
        {
            inputRange: [ 0, 1 ],

            outputRange: [ 'black', '#F0FFFF']

        });
    const IconMovement = this.AnimationIcon.interpolate(
        {
            inputRange: [ 0, 1 ],

            outputRange: [ height/3.2, 0]

        });
    const IconSize = this.AnimationIcon.interpolate(
        {
            inputRange: [ 0, 1 ],

            outputRange: [ 90, 60]

        });
    /*const TextScroll = this.AnimationIcon.interpolate(
        {
            inputRange: [ 0,0.2,0.4,0.6,0.8, 1 ],

            outputRange: [ 'Your Movie is ' + randomMovie, 'Choose The Perfect GIF in Search Bar Below', 'You Have 20 Minutes', 'Ready', 'Set', 'Go']

        });
    */
    const CatTextOpacity = this.AnimationCatText.interpolate(
        {
            inputRange: [ 0, 0.5, 1 ],

            outputRange: [ 0, 1, 0]

        });

    const IntroOpacity = this.AnimationIntro.interpolate(
        {
            inputRange: [ 0, 1 ],

            outputRange: [1, 0]

        });
    var answer = this.props.lastCat.substring(this.props.lastCat.indexOf("-")+1);
    console.log(answer);
    return(
      <Animated.View style = {[ styles.MainContainer, { backgroundColor: BackgroundColorConfig }]}>
      {this.props.timeUp == null &&
        <Animated.Text style={{fontSize: 20, fontWeight: 'bold', color: 'white', fontFamily: 'Cochin', top: 100, position:'absolute', textAlign:'center',opacity:IntroOpacity}}>
          Welcome to Gifarades {"\n"} Team A starts guessing
        </Animated.Text>
      }
      {this.props.timeUp != null &&
        <Animated.Text style={{fontSize: 20, fontWeight: 'bold', color: 'white', fontFamily: 'Cochin', top: 100, position:'absolute', textAlign:'center',opacity:IntroOpacity}}>
          {this.props.timeUp ? 'Oops time ran out \n Better Luck Next Time' : 'Congratulations! \n ' + answer + ' is the Correct Answer' }
        </Animated.Text>
      }
        <Animated.Text style={{fontSize: 20, fontWeight: 'bold', color: 'white', fontFamily: 'Cochin',opacity:IntroOpacity}}>
          Team A     Team B
        </Animated.Text>
        <Animated.Text style={{fontSize: 20, fontWeight: 'bold', color: 'white', fontFamily: 'Cochin',opacity:IntroOpacity}}>
            {this.props.aScore}                  {this.props.bScore}
        </Animated.Text>
        <Animated.Image
          style={[styles.image, {top:IconMovement},{width:IconSize},{height:IconSize}]}
          source={note}
        />
        <Animated.Text style={{opacity:CatTextOpacity}}>
          {this.props.catFromParent}
        </Animated.Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  image:{
    width: 70,
    height: 70,
    marginTop: 14,
    marginBottom: 10,
    position: 'absolute'

  },
  MainContainer:
    {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: width,
        height:height
    },
});
