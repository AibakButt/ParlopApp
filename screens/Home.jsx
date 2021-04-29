import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Animated,
  StatusBar,
  NativeModules
} from "react-native";
import { connect } from "react-redux";
import {
  fetchCategories,
} from "./../redux/actions/categoryActions";
const { StatusBarManager } = NativeModules;


import { Card, Badge, Button, Block, Text } from "../components";
import { theme, mocks } from "../constants";
import Icon from "../components/Icon";
import { fetchServices } from './../redux/actions/serviceActions';

const { width, height } = Dimensions.get("window");


function Home(props) {
 
    const [active, setActive]  = useState("Products")
    const [carousel, setCarousel] = useState( [
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
    ])
  
  let scrollX = new Animated.Value(0);

  useEffect(() => {

    props.fetchCategories();
    props.fetchServices();
    
  }, []);

  const renderCarousel = () => {
  
    return (
    
        <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        data={carousel}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => (

            <Block middle center >
              <Image
                source={item.image}
                resizeMode="contain"
                style={{ width: width - theme.sizes.base * 2, height: height / 2, overflow: "visible", borderRadius: 12}}
              />
            </Block>
  
        )}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { x: scrollX } }
          },
        ],
        {useNativeDriver: false})}
      />
  
    );
  }



    const { profile, navigation } = props;
    const { categories } = props;
    const tabs = ["Products", "Inspirations", "Shop"];
    return (
      <Block flex={1} color={theme.colors.gray2}>
        <Block flex={1} row space="between" color={theme.colors.white} style={styles.header}>
          <Block flex={8} middle>

            <Text h1 accent bold>
                <Text h1 accent>
                Parlor{" "}
                </Text>
                At Home
            </Text>
            
          </Block>
          <Block flex={2} row center>
            <Icon
                name={'location-pin'}
                type={ 'entypo'}
                size={22}
                color={theme.colors.accent}
              />
            <Text gray>Lahore</Text>
          </Block>
        </Block>

        

        <Block color={theme.colors.white} flex={4} style={{paddingHorizontal: theme.sizes.base, }}>
          {renderCarousel()}
        </Block>
        <Block flex={0.5} padding={15} color={theme.colors.white}>
            <Text center size={20} accent bold>CATEGORIES</Text>
        </Block>
        <Block flex={5} color={theme.colors.white} style={{marginBottom: theme.sizes.base *1.5}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: theme.sizes.base * 1.5,  paddingVertical: theme.sizes.base * 0.5,  }}
        >
          <Block row space="between" style={styles.categories}>
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
                  <Text medium accent bold height={25} style={{fontWeight: 'bold'}}>
                    {category.name}
                  </Text>
                  <Text gray caption>
                    {
                      props.services.filter(ser => ser.category._id == category._id).length
                    }
                    {" "}services
                  </Text>
                </Card>
              </TouchableOpacity>
            ))}
          </Block>
        </ScrollView>
        </Block>
      </Block>
    );
  
}

const mapStateToProps = (state) => ({
  categories: state.categoryReducer.categories,
  services: state.serviceReducer.services
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => fetchCategories(dispatch),
  fetchServices: () => fetchServices(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base ,
    paddingTop: Platform.OS === 'ios' ? 25 : StatusBarManager.HEIGHT * 1.5,
    paddingBottom: theme.sizes.base
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
  },
  category: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2
  }
});
