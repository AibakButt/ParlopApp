import React, { Component } from 'react';
import { View, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity,ActivityIndicator, Keyboard, Platform, KeyboardAvoidingView } from 'react-native';
import Animated, { EasingNode } from 'react-native-reanimated';
import { TapGestureHandler, State, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from '../components/Icon';
import { connect } from "react-redux";
import {  
  handleTextChange, 
  checkPhoneNoExists,
  login,
} from './../redux/actions/authentication';
import { showMessage, hideMessage } from "react-native-flash-message";

import { theme } from '../constants';
import { Block, Text} from '../components';
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
  interpolateNode,
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
    easing: EasingNode.inOut(EasingNode.ease)
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
class Login extends Component {
  constructor() {
    super();

    this.state = {
        showTextInput: 'phone',
        showLoading: false
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

    this.buttonY = interpolateNode(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.bgY = interpolateNode(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.textInputZIndex = interpolateNode(this.buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [1, -1],
        extrapolate: Extrapolate.CLAMP
    });

    this.textInputY = interpolateNode(this.buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [0, 100],
        extrapolate: Extrapolate.CLAMP
    });

    this.textInputOpacity = interpolateNode(this.buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [1, 0],
        extrapolate: Extrapolate.CLAMP
    });

    this.rotateCross = interpolateNode(this.buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [180, 360],
        extrapolate: Extrapolate.CLAMP
    });

  }

  sendPhoneNo = async () => {

    if((this.props.auth.phone).length !== 10 || this.props.auth.phone.charAt(0) != '3'){
      showMessage({
        message: "Phone number is not valid",
        type: "danger",
        floating: true
      });
      this.props.handleTextChange("", 'phone')
      return
    } 

    try {
      this.setState({showLoading: true})
      await this.props.checkPhoneNoExists()
      this.setState({showLoading: false, showTextInput: 'password'})
    } catch (error) {
      this.setState({showLoading: false})
      console.log(error)
    }
   

  }

  login = async () => {

    try {
      this.setState({showLoading: true})
      await this.props.login()
      this.setState({showLoading: false, nameShow: true})
      console.log(this.props.route.params)
      this.props.navigation.dangerouslyGetParent().replace("HomeTabs")
      //Reset Field
      this.props.handleTextChange("", 'phone')
      this.props.handleTextChange("", 'password')

    } catch (error) {
      console.log(error)
      this.setState({showLoading: false})
    }

  }

 
  
  renderPhoneInput = () => {
    return (
      <Block middle space="between">
        <Block row style={{marginHorizontal: theme.sizes.base, marginTop: 60}} >
            <TextInput
                style={[styles.phoneInput, {width: '20%', height: 50, color: 'black', borderTopLeftRadius: 12,borderBottomLeftRadius: 12,}]}
                value="+92"
                editable={false}
            />
            <TextInput
                style={[styles.phoneInput, {width: '80%', height: 50, color: 'black', letterSpacing: 4, borderTopRightRadius: 12,borderBottomRightRadius: 12,}]}
                onChangeText={(e) => this.props.handleTextChange(e, 'phone')}
                placeholder="3XX XXXXXXX"
                value={this.props.auth.phone}
                keyboardType='numeric'
                maxLength={10}
            />
        </Block>
        <Block>
            <TouchableOpacity style={styles.next} onPress={() => this.sendPhoneNo()}>
                {
                  this.state.showLoading ? (
                    <ActivityIndicator size="small" color={theme.colors.white} />
                    ) : (
                    <Text bold white>
                        Next
                    </Text>
                  )
                }  
            </TouchableOpacity>
        </Block>
        <Block center middle>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")}>
            <Text gray size={12} style={{textDecorationLine: 'underline'}}>Dont have an account?</Text>
          </TouchableOpacity>
        </Block>
      </Block>
)
  }

  renderPasswordInput = () => {
    return (
      <Block>
        <TextInput
            placeholder="Password"
            secureTextEntry={true}
            value={this.props.auth.password}
            onChangeText={(e) => {this.props.handleTextChange(e,'password')}}
            style={styles.textInput}
        />
        <TouchableOpacity style={styles.next} onPress={() => this.login()}>
                {
                  this.state.showLoading ? (
                    <ActivityIndicator size="small" color={theme.colors.white} />
                    ) : (
                    <Text bold white>
                        Login
                    </Text>
                  )
                }
        </TouchableOpacity>
        <Block row space="around">
            
            <TouchableOpacity onPress={() => this.setState({showTextInput: 'phone'})}>
                <Text style={{textDecorationLine: "underline", color: theme.colors.gray}}>Change Phone Number</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Forgot")}>
              <Text gray size={12} style={{textDecorationLine: 'underline'}}>Forgot Password</Text>
            </TouchableOpacity>
    
        </Block>
    </Block>
    )
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex:1}}
      >
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
              <Text white bold >Login</Text>
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
              this.state.showTextInput === 'phone' && this.renderPhoneInput()            
            }
            {
              this.state.showTextInput === 'password' && this.renderPasswordInput()            
            }
            
            
            
            
            
          </Animated.View>
        </View>
      </View>
        </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.authReducer.auth
});

const mapDispatchToProps = (dispatch) => ({
  handleTextChange: (value, field) => handleTextChange(dispatch, value, field),
  checkPhoneNoExists: () => checkPhoneNoExists(dispatch),
  login: () => login(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

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
  buttonOutline: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.accent,
    borderWidth: 1,
    height: 50,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    elevation: 10,
    shadowOffset: {width:2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    
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
    backgroundColor: theme.colors.accent,
    height: 50,
    marginHorizontal: theme.sizes.base,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  nextOutline: {
    backgroundColor: '#fff',
    borderColor: theme.colors.accent,
    borderWidth: 1,
    height: 50,
    marginHorizontal: theme.sizes.base,
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
  },
  phoneInput:{ 
    backgroundColor: theme.colors.gray2,
    paddingHorizontal: theme.sizes.base,
    paddingVertical: 0,
    fontSize: 15,
  },
});