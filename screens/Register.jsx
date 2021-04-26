import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from '../components/Icon';
import { connect } from "react-redux";
import {  handleTextChangeNumber,handleTextChangeCode, sendCode, reSendCode, verifyCode } from './../redux/actions/authentication';
import { theme } from '../constants';
import { Block } from '../components';
const { width, height } = Dimensions.get('window');

const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position
  ]);
}
class Register extends Component {
  constructor() {
    super();

    this.state = {
        codeFeildShow: false,
        nameShow: false,
    }

    this.buttonOpacity = new Value(1);

    this.onStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
            )
          ])
      }
    ]);

    this.onCloseStateChange = event([
        {
          nativeEvent: ({ state }) =>
            block([
              cond(
                eq(state, State.END),
                set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
              )
            ])
        }
      ]);

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.textInputZIndex = interpolate(this.buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [1, -1],
        extrapolate: Extrapolate.CLAMP
    });

    this.textInputY = interpolate(this.buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [0, 100],
        extrapolate: Extrapolate.CLAMP
    });

    this.textInputOpacity = interpolate(this.buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [1, 0],
        extrapolate: Extrapolate.CLAMP
    });

    this.rotateCross = interpolate(this.buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [180, 360],
        extrapolate: Extrapolate.CLAMP
    });

  }

  sendCode = async () =>{

    this.setState({codeFeildShow: true})
    const storeData = async () => {
      try {
        await AsyncStorage.setItem('isFirstTime', false);
      } catch (e) {
        // saving error
      }
    }

    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('isFirstTime')
        if(value !== null) {
          // value previously stored
          return value;
        }
      } catch(e) {
        // error reading value
      }
    }

    if(!getData()){
      await storeData();
    }

    this.props.sendCode(this.props.auth);

  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'flex-end'
        }}
      >
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            transform: [{ translateY: this.bgY }]
          }}
        >
          <Image
            source={require('../assets/images/register-bg.jpg')}
            style={{ flex: 1, height: null, width: null }}
          />
        </Animated.View>
        <View style={{ height: height / 3, justifyContent: 'center' }}>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.button,
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }]
              }}
            >
              <Text style={{ color: 'white' }}>Register</Text>
            </Animated.View>
          </TapGestureHandler>
          
          <Animated.View style={{zIndex: this.textInputZIndex, opacity: this.textInputOpacity, transform: [{translateY: this.textInputY}], height: height / 3, ...StyleSheet.absoluteFill, top: null, justifyContent: 'center'}}>
                    <TapGestureHandler onGestureEvent={(evt)=>console.log('324d')} onHandlerStateChange={this.onCloseStateChange} >
                        <Animated.View style={styles.closeButton}>
                            <TouchableWithoutFeedback onStateChange={()=>Keyboard.dismiss()}>
                                <Animated.Text style={{transform: [{rotate: concat(this.rotateCross,'deg')}]}}>
                            
                                    <Icon
                                        name='close'
                                        type='materialCommunity'
                                        size={22}
                                        color={theme.colors.black}
                                    />
                                </Animated.Text>
                            </TouchableWithoutFeedback>
                        </Animated.View>
                    </TapGestureHandler>
            
            {
                this.state.nameShow ? (
                    <Block>
                        <TextInput
                            placeholder="Your Name"
                            style={styles.textInput}
                        />
                        <Block row middle marginTop={theme.sizes.base}>
                            <Block>
                                <TouchableOpacity style={styles.next} onPress={() => this.setState({nameShow: false})}>
                                    <Text style={{color: theme.colors.white}}>
                                        Continue
                                    </Text>
                                </TouchableOpacity>
                            </Block>
                            <Block>
                                <TouchableOpacity style={styles.nextOutline} onPress={() => this.setState({nameShow: false})}>
                                    <Text style={{color: theme.colors.accent}}>
                                        View Intro
                                    </Text>
                                </TouchableOpacity>
                            </Block>
                        </Block>
                    </Block>
                ) : (
                    this.state.codeFeildShow ? (
                        <Block>
                            <TextInput
                                keyboardType='numeric'
                                placeholder="Code"
                                style={styles.textInput}
                            />
                            <TouchableOpacity style={styles.next} onPress={() => this.setState({nameShow: true})}>
                                <Text style={{color: 'white'}}>
                                    Verify
                                </Text>
                            </TouchableOpacity>
                            <Block row space="around">
                                
                                <TouchableOpacity onPress={() => this.setState({codeFeildShow: false})}>
                                    <Text style={{textDecorationLine: "underline", color: theme.colors.gray}}>Change Phone Number</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={{textDecorationLine: "underline", color: theme.colors.gray}}>Resend Code</Text>
                                </TouchableOpacity>
                            </Block>
                        </Block>
                    ) : (
                        <Block>
                            <TextInput
                                keyboardType='numeric'
                                placeholder="Phone Number"
                                name="phoneNumber"
                                value={this.props.auth.phoneNumber}
                                onChangeText={(e) => { console.log('event',e); this.props.handleTextChangeNumber(e)}}
                                style={styles.textInput}
                            />
                            <TouchableOpacity style={styles.next} onPress={() => this.sendCode()}>
                                <Text style={{color: 'white'}}>
                                    Send Code
                                </Text>
                            </TouchableOpacity>
                        </Block>
                    )
                )
            }
            
            
            
            
            
          </Animated.View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.authReducer.auth
});

const mapDispatchToProps = (dispatch) => ({
  handleTextChangeNumber: (e) => handleTextChangeNumber(dispatch, e),
  sendCode: (auth) => sendCode(dispatch,auth),
  reSendCode: (auth) => reSendCode(dispatch,auth),
  verifyCode: (auth) => verifyCode(dispatch,auth),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: theme.colors.accent,
    height: 50,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    elevation: 10,
    shadowOffset: {width:2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 0.2
  },
  textInput: {
      height: 50,
      borderRadius: 25,
      borderWidth: 0.5,
      marginHorizontal: 20,
      marginTop: 30,
      paddingLeft: 10,
      marginVertical: 5,
      borderColor: 'rgba(0,0,0,0.2)',
      textAlign: 'center',
     
      letterSpacing: 10
  },
  next: {
    backgroundColor: '#e91e63',
    height: 50,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  nextOutline: {
    backgroundColor: '#fff',
    borderColor: '#e91e63',
    borderWidth: 1,
    height: 50,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  closeButton: {
      height: 40,
      width: 40,
      backgroundColor: 'white',
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      position: "absolute",
      top: -20,
      left: width / 2 -20 
  }
});