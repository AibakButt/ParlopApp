import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import {
  fetchCategories,
} from "./../redux/actions/categoryActions";
import {
  fetchServices
} from './../redux/actions/serviceActions';
import {
  addToCart
} from './../redux/actions/cartActions';

import { Card, Badge, Button, Block, Text } from "../components";
import { TabView, SceneMap } from 'react-native-tab-view';
import { theme, mocks } from "../constants";
import { categories } from "../constants/mocks";

const { width, height } = Dimensions.get("window");

class Services extends Component {
  state = {
    active: this.props.route.params,
  };

  componentDidMount() {
    this.props.fetchServices();
  }

  handleTab = tab => {
    this.setState({ active: tab });
  };

  renderTab(tab) {
    const { active } = this.state;
    const isActive = active._id === tab._id;

    return (
      <TouchableOpacity
        key={tab.id}
        onPress={() => this.handleTab(tab)}
        style={[styles.tab, isActive ? styles.active : null]}
      >
        <Text size={16} medium gray={!isActive} secondary={isActive}>
          {tab.name}
        </Text>
      </TouchableOpacity>
    );
  }

  addServiceToCart(service){
    this.props.addToCart(service);
  }

  isAlreadyInCart(serviceId){
    let already = false;
     if(this.props.cartServices && this.props.cartServices.length>0) {
       this.props.cartServices.forEach(ser => {
          if(ser._id === serviceId){
            already=true;
          }
       });
      }

      return already;
  }


  render(){
    const {categories, services} = this.props;
    return (
        <Block>
            <Block flex={false} margin={10}>
                <FlatList
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    data={categories}
                    renderItem={({ item }) => this.renderTab(item)}
                    keyExtractor={(item, index) => index.toString()}
                
                />
            </Block>
            <Block flex={false}>
                {
                     <Image source={this.state.active.image} style={{width: width, height: height/4}} /> 
                }
            </Block>
            <Block color={theme.colors.white} style={styles.servicesScrollView}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentInset={{top: 0, left: 0, bottom: 0, right: 0}}
                style={{margintop:30}}
                >
               
                    {services.filter(ser => ser.category._id === this.state.active._id).map(service => (
                        
                        <Block color="white" key={service._id} shadow style={styles.service}>
                        
                            <Text medium height={20} size={20}>
                                {service.name}
                            </Text>
                            <Block row space="between" >
                                <Text primary size={17} style={{paddingVertical: 10}}>
                                    Rs. {service.price}
                                </Text>
                                <Button style={{paddingBottom:20}}>
                                    <Text center accent>add-ons</Text>
                                </Button>
                                <Button color={(!this.isAlreadyInCart(service._id))?theme.colors.gray2:theme.colors.primary} 
                                  disabled={this.isAlreadyInCart(service._id)}
                                  onPress={() => this.addServiceToCart(service)}>
                                    <Text style={{ padding:20}} bold size={20}>{(!this.isAlreadyInCart(service._id))?'+':'added'}</Text>
                                </Button>
                            </Block>
                        </Block>
                
                    ))}
         
                </ScrollView>
            </Block>

        </Block>
    )
   }   
}

const mapStateToProps = (state) => ({
  categories: state.categoryReducer.categories,
  services : state.serviceReducer.services,
  cartServices: state.cartReducer.cartServices
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => fetchCategories(dispatch),
  fetchServices: () => fetchServices(dispatch),
  addToCart: (service) => addToCart(dispatch,service),
});

export default connect(mapStateToProps, mapDispatchToProps)(Services);

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2
  },
 
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base,
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3
  },
  services: {
    paddingTop: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base * 2
  },
  service: {
    // this should be dynamic based on screen width
    padding: theme.sizes.base,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: 1,
    marginBottom: theme.sizes.base & 0.5
  },
  servicesScrollView: {
      marginTop: -30,
      paddingTop:30,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
  }
});
