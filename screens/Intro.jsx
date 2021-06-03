import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  NativeModules
} from "react-native";

import { Button, Block, Text } from "../components";
import { theme } from "../constants";

const { width, height } = Dimensions.get("window");

const { StatusBarManager } = NativeModules;

class Intro extends Component {
  static navigationOptions = {
    header: null
  };

  scrollX = new Animated.Value(0);

  state = {
    showTerms: false,
    illustrations: [
      { id: 1, source: require("../assets/images/illustration1.png"), text: "Book your Beauty Service in Lahore" },
      { id: 2, source: require("../assets/images/illustration2.png"), text: "Pakistan's No. 1\n On Demand Beauty\n Services at your\n door step " },
      { id: 3, source: require("../assets/images/illustration3.png"), text: "Choose from wide\n range of beauty services\n from nail, hair, wax,\n & many more"},
   
    ]
  };


  renderIllustrations() {
    const { illustrations } = this.state;
    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={illustrations}
        extraDate={this.state}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => (
          <Block center bottom>
            
            <Block middle flex={0.7} >
              <Image
                source={item.source}
                resizeMode="contain"
                style={{ width, height: height/2, overflow: "visible" }}
              />
            </Block>
            <Block flex={0.4} middle>
              <Text h3 center size={20} style={{ marginTop: theme.sizes.padding / 2 }}>
                {item.text}
              </Text>
            </Block>

            
        </Block>
          
        )}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { x: this.scrollX } }
          },
        ],
        {useNativeDriver: false})}
      />
    );
  }

  renderSteps() {
    const { illustrations } = this.state;
    const stepPosition = Animated.divide(this.scrollX, width);
    return (
      <Block row center middle style={styles.stepsContainer}>
        {illustrations.map((item, index) => {
          const opacity = stepPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.4, 1, 0.4],
            extrapolate: "clamp"
          });

          return (
            <Block
              animated
              flex={false}
              key={`step-${index}`}
              color="gray"
              style={[styles.steps, { opacity }]}
            />
          );
        })}
      </Block>
    );
  }

  render() {
    const { navigation } = this.props;

    return (
      <Block flex={1} color={theme.colors.white}>
        <Block middle flex={0.1} style={styles.header}>
              <Text size={36} center bold>
                <Text size={36} accent>
                  Parlor{" "}
                </Text>
                At Home
              </Text>
        </Block>
        <Block flex={0.9} center middle >
          {this.renderIllustrations()}
          {this.renderSteps()}
        </Block>
        <Block middle flex={0.25} margin={[0, theme.sizes.padding * 2]}>
         
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Register')} >
            <Text center bold white>
              Register Now
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOutline} onPress={() => this.props.navigation.navigate('MainTab')} >
            <Text center bold accent>
              Skip to Home
            </Text>
          </TouchableOpacity>
        </Block>
      </Block>
    );
  }
}

Intro.defaultProps = {
  illustrations: [
    { id: 1, source: require("../assets/images/illustration3.png") },
    { id: 2, source: require("../assets/images/illustration1.png") },
    { id: 3, source: require("../assets/images/illustration2.png") },
 
  ]
};
export default Intro;

const styles = StyleSheet.create({
  stepsContainer: {
    position: "absolute",
    bottom: theme.sizes.base * 10,
    right: 0,
    left: 0
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5
  },
  button: {
    marginHorizontal: theme.sizes.base,
    padding: theme.sizes.base,
    borderRadius: 12,
    backgroundColor: theme.colors.accent,
    marginBottom: 10
  },
  header: {
    paddingHorizontal: theme.sizes.base ,
    paddingTop: Platform.OS === 'ios' ? 25 : StatusBarManager.HEIGHT * 1.5,
    paddingBottom: theme.sizes.base
  },
  buttonOutline: {
    marginHorizontal: theme.sizes.base,
    padding: theme.sizes.base *0.75,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.accent
}
});