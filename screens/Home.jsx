import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Animated
} from "react-native";
import { connect } from "react-redux";
import {
  fetchCategories,
} from "./../redux/actions/categoryActions";


import { Card, Badge, Button, Block, Text } from "../components";
import { theme, mocks } from "../constants";

const { width, height } = Dimensions.get("window");


class Home extends Component {
  state = {
    active: "Products",
    categories: [],
    carousel: [
        {
            id: "1",
            image: require("../assets/images/carousel1.png")
        },
        {
            id: "2",
            image: require("../assets/images/carousel2.png")
        },
        {
            id: "3",
            image: require("../assets/images/carousel3.png")
        },
    ]
  };
  scrollX = new Animated.Value(0);

  componentDidMount() {
    this.props.fetchCategories();
  }

  renderCarousel() {
    const { carousel } = this.state;
    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={carousel}
        extraDate={this.state}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => (

            <Block middle >
              <Image
                source={item.image}
                resizeMode="contain"
                style={{ width, height: height / 2, overflow: "visible" }}
              />
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



  render() {
    const { profile, navigation } = this.props;
    const { categories } = this.props;
    const tabs = ["Products", "Inspirations", "Shop"];
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
        <Text h2 center bold>
            <Text h1 primary>
            Parlor{" "}
            </Text>
            At Home
        </Text>
        </Block>

        

        {this.renderCarousel()}
        <Block padding={15}>
            <Text center size={20} bold>CATEGORIES</Text>
        </Block>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base * 3.5 }}
        >
          <Block flex={false} row space="between" style={styles.categories}>
            {categories.map(category => (
              <TouchableOpacity
                key={category._id}
                onPress={() => navigation.navigate("Services",  category )}
              >
                <Card center middle shadow style={styles.category}>
                  <Badge
                    margin={[0, 0, 15]}
                    size={50}
                    color="rgba(41,216,143,0.20)"
                  >
                    <Image source={{uri: category.icon}} style={{
                        resizeMode: "contain",
                        height: 80,
                        width: 200
                    }}/>
                  </Badge>
                  <Text medium height={20}>
                    {category.name}
                  </Text>
                  <Text gray caption>
                    12 Services
                  </Text>
                </Card>
              </TouchableOpacity>
            ))}
          </Block>
        </ScrollView>
      </Block>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categoryReducer.categories
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => fetchCategories(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2
  },
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3
  },
  categories: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5
  },
  category: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2
  }
});
