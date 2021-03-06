import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ImageBackground
} from "react-native";
import { connect } from "react-redux";
import { fetchCategories } from "./../redux/actions/categoryActions";
import { fetchServices } from './../redux/actions/serviceActions';
import {  addToCart , addAddOns} from './../redux/actions/cartActions';
import { Card, Badge, Button, Block, Text } from "../components";
import Modal from 'react-native-modal';
import { theme, mocks } from "../constants";
import Icon from './../components/Icon';

const { width, height } = Dimensions.get("window");


function Services(props) {
  
  const [active, setActive] = useState(props.route.params)
  const [modalShow, setModalShow] = useState(null)

  useEffect(() => {

    props.fetchServices()
    
  }, []);


  const renderTab = (tab) => {

    const isActive = active._id === tab._id;

    return (
      <TouchableOpacity
        key={tab.id}
        onPress={() => setActive(tab)}
        style={[styles.tab, isActive ? styles.active : null]}
      >
        <Text size={16}  accent={isActive}>
          {tab.name}
        </Text>
      </TouchableOpacity>
    );
  }

  const addServiceToCart = (service) => {
    props.addToCart(service);
  }

  const addAddonsToServiceToCart = (addon, serviceId) => {
   
    props.addAddOns(addon,serviceId);
  }

  const isAddonInCart = (serviceId, addonName) => {
    let already = false;
     if(props.cartServices && props.cartServices.length > 0) {
       props.cartServices.forEach(ser => {
          if(ser._id === serviceId){
            ser.addons.forEach(addon => {
              if(addon.name === addonName)
              already = true
            });
          }
       });
      }
      return already;
  }

 
  
  
  const renderAddonModal = (service, ser_id) => {
    if(service.addons.length === 0 ){
      return(
        <Modal
          transparent={true}
          isVisible={modalShow === service._id}
          style={styles.modalView}
        > 
        <Block flex={false} center middle row sapce="between" padding={theme.sizes.base} style={{borderBottomColor: theme.colors.gray2, borderBottomWidth: 1}}>
              <Block flex={7} center >
                <Text h1 >Addons</Text>
              </Block>
              <Block>
                <Icon
                    name="close"
                    color={theme.colors.accent}
                    backgroundColor="white"
                    onPress={() => setModalShow(null)}
                    size={22}
                  /> 
              </Block>
              
            </Block>
            <Block center middle flex={1} color={theme.colors.white}> 
                <Image source={require('../assets/images/no-addon.jpg')} style={{width: 70, height: 70}} />
                <Text gray center size={16} style={{padding: theme.sizes.base}}>No addon for this service</Text>
            </Block>
        </Modal>
      )
    }
    return (
        <Modal
          transparent={true}
          isVisible={modalShow === service._id}
          style={styles.modalView}
        > 
        
            <Block flex={false} center middle row sapce="between" padding={theme.sizes.base} style={{borderBottomColor: theme.colors.gray2, borderBottomWidth: 1}}>
              <Block flex={7} center >
                <Text h1 >Addons</Text>
              </Block>
              <Block>
                <Icon
                    name="close"
                    color={theme.colors.accent}
                    backgroundColor="white"
                    onPress={() => setModalShow(null)}
                    size={22}
                  /> 
              </Block>
              
            </Block>
            <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{margintop:30}}
            >
            {
              service.addons.map((addon,index) => (
                          
                      <Block color="white" row key={index} shadow style={styles.service}>
                        <Block flex={8}>
                          <Text medium height={20} size={18}>
                              {addon['name'+index]}
                          </Text>
                          <Text accent size={15} style={{paddingVertical: 5}}>
                                  Rs. {addon['price'+index]}
                              </Text>
                          </Block>
                          <Block flex={2} center middle>
                            <TouchableOpacity style={styles.actionButton} disabled={isAddonInCart(ser_id, addon['name'+index])} onPress={() => addAddonsToServiceToCart({name:addon['name'+index],price:addon['price'+index],quantity:1},ser_id)}>
                              <Icon
                                name={isAddonInCart(ser_id, addon['name'+index]) ? 'done':'plus'}
                                type={isAddonInCart(ser_id, addon['name'+index])  ? 'material': 'materialCommunity'}
                                size={22}
                                color={theme.colors.accent}
                              />
                              
                            </TouchableOpacity>
                          </Block>
                          
                      </Block>
              
                  ))
              }
          </ScrollView>
        </Modal>
       
      
    )
  }

  
    const {categories, services, cartServices} = props;
    return (
        <Block>
          <ImageBackground
           source={{uri: active.picture}}
           style={{width: width, height: height/3}}
           >
            <Block flex={false} margin={10}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={categories}
                    renderItem={({ item }) => renderTab(item)}
                    keyExtractor={(item, index) => index.toString()}
                
                />
            </Block>
            </ImageBackground>
            <Block color={theme.colors.white} style={styles.servicesScrollView}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentInset={{top: 0, left: 0, bottom: 0, right: 0}}
                style={{margintop:30}}
                >
               
                    {services.filter(ser => ser.category._id === active._id).map(service => (
                        
                        <Block color="white" key={service._id} shadow style={styles.service}>
                            {renderAddonModal(service, service._id)}
                           
                            <Text medium height={20} size={18}>
                                {service.name}
                            </Text>
                            <Block row space="between" >
                                <Text bold accent size={17} style={{paddingVertical: 10}}>
                                    Rs. {service.price}
                                </Text>
                                <Button style={{paddingBottom:20}} onPress={() => setModalShow(service._id)}>
                                    <Text center accent>add-ons</Text>
                                </Button>
                             
                                <TouchableOpacity style={styles.actionButton} disabled={cartServices.find(ser => ser._id == service._id)} onPress={() => addServiceToCart(service)}>
                                  <Icon
                                    name={cartServices.find(ser => ser._id == service._id) ? 'done':'plus'}
                                    type={cartServices.find(ser => ser._id == service._id)  ? 'material': 'materialCommunity'}
                                    size={22}
                                    color={theme.colors.accent}
                                  />
                                  
                                </TouchableOpacity>
                            </Block>
                        </Block>
                
                    ))}
         
                </ScrollView>
            </Block>

        </Block>
    )
      
}

const mapStateToProps = (state) => ({
  categories: state.categoryReducer.categories,
  services : state.serviceReducer.services,
  cartServices: state.cartReducer.cartServices
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => fetchCategories(dispatch),
  fetchServices: () => fetchServices(dispatch),
  addAddOns: (addons, serviceId) => addAddOns(dispatch,addons,serviceId),
  addToCart: (service) => addToCart(dispatch,service),
});

export default connect(mapStateToProps, mapDispatchToProps)(Services);

const styles = StyleSheet.create({
  centeredView: {
    position: "absolute",
    top: 10
  },
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
    paddingBottom: theme.sizes.base * 0.5,
  },
  active: {
    borderBottomColor: theme.colors.accent,
    borderBottomWidth: 3
  },
  services: {
    paddingTop: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base * 2
  },
  service: {
    // this should be dynamic based on screen width
    padding: theme.sizes.base,
    paddingLeft: theme.sizes.base * 1.5,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: 1,
    marginBottom: theme.sizes.base & 0.5,
    elevation: 10
  },
  servicesScrollView: {
      marginTop: -30,
      paddingTop:30,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
  },
  addonsContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  modalView: {
    margin: theme.sizes.base*3,
    backgroundColor: "white",
    borderRadius: 20,

 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  actionButton: {
  
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.gray2,
    paddingHorizontal: 10,
    borderRadius: theme.sizes.base * 0.7
  },
  actionText: {
    textAlign: 'center',
    maxWidth: 70,
    paddingTop: 5,
    fontSize: 14,
    color: theme.colors.black,
  },
  actionTextStyle: {
    padding: 40
  },
});