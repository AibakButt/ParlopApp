import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import { fetchCategories } from "./../redux/actions/categoryActions";
import { fetchServices } from './../redux/actions/serviceActions';
import {  addToCart } from './../redux/actions/cartActions';
import { Card, Badge, Button, Block, Text } from "../components";
import Modal from 'react-native-modal';
import { theme, mocks } from "../constants";
import Icon from './../components/Icon';

const { width, height } = Dimensions.get("window");

const myservices = [{
  _id: "6080576ea9b0a300042f7608",
  name: "Acne facial",
  category: {
      _id: "6080570ca9b0a300042f7602",
      name: "Facial",
      picture: "https://www.beautysecrets.com.pk/assets/images/our-services/large/facial.jpg",
      icon: "https://www.beautysecrets.com.pk/assets/images/our-services/large/facial.jpg",
      created_at: "2021-04-21T16:47:08.090Z",
      updatedAt: "2021-04-21T16:47:08.090Z"
   
  },
  description: "We have a team of experienced & professional beauty expert that use most advance & a custom technique to offer soft, smooth & fresh face for every everyone.",
  price: 300,
  availability: true,
  addons: [
    { name: "Extra 1 ", price: 200},
    { name: "Extra 2 ", price: 300},
    { name: "Extra 3 ", price: 500},
  ],
 
},]

function Services(props) {
  
  const [active, setActive] = useState(props.route.params)
  const [modalShow, setModalShow] = useState(false)

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
        <Text size={16} medium gray={!isActive} secondary={isActive}>
          {tab.name}
        </Text>
      </TouchableOpacity>
    );
  }

  const addServiceToCart = (service) => {
    props.addToCart(service);
  }

  const isAlreadyInCart = (serviceId) => {
    let already = false;
     if(props.cartServices && props.cartServices.length>0) {
       props.cartServices.forEach(ser => {
          if(ser._id === serviceId){
            already=true;
          }
       });
      }
      return already;
  }

 
  
  
  const renderAddonModal = (addons) => {
    return (
        <Modal
          transparent={true}
          isVisible={modalShow}
          style={styles.modalView}
        > 
        
            <Block center middle row >
              <Text h1 >Add Ons</Text>
              
            
                <Icon.Button
                  name="close"
                  color="black"
                  backgroundColor="white"
                  onPress={() => setModalShow(!modalShow)}
                  
                />
            
          
              
              
            </Block>
            <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{margintop:30}}
            >
            {
              addons.map(addon => (
                          
                      <Block color="white" row key={addon._id} shadow style={styles.service}>
                        <Block flex={8}>
                          <Text medium height={20} size={20}>
                              {addon.name}
                          </Text>
                          <Text primary size={17} style={{paddingVertical: 10}}>
                                  Rs. {addon.price}
                              </Text>
                          </Block>
                          <Block flex={2} center middle>
                            <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
                              <Icon
                                name={'heart-outline'}
                                type="materialCommunity"
                                size={22}
                                color={theme.colors.white}
                              />
                              <Text numberOfLines={1} style={styles.actionText}>
                                Favorite
                              </Text>
                            </TouchableOpacity>
                          </Block>
                      </Block>
              
                  ))
              }
          </ScrollView>
        </Modal>
       
      
    )
  }

  
    const {categories, services} = props;
    return (
        <Block>
          
            <Block flex={false} margin={10}>
                <FlatList
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    data={categories}
                    renderItem={({ item }) => renderTab(item)}
                    keyExtractor={(item, index) => index.toString()}
                
                />
            </Block>
            <Block flex={false}>
                {
                  <Image source={{uri: active.image}} style={{width: width, height: height/4}} /> 
                }
            </Block>
            <Block color={theme.colors.white} style={styles.servicesScrollView}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentInset={{top: 0, left: 0, bottom: 0, right: 0}}
                style={{margintop:30}}
                >
               
                    {services.filter(ser => ser.category._id === active._id).map(service => (
                        
                        <Block color="white" key={service._id} shadow style={styles.service}>
                            {renderAddonModal(service.addons)}
                           
                            <Text medium height={20} size={20}>
                                {service.name}
                            </Text>
                            <Block row space="between" >
                                <Text bold size={17} style={{paddingVertical: 10}}>
                                    Rs. {service.price}
                                </Text>
                                <Button style={{paddingBottom:20}} onPress={() => setModalShow(true)}>
                                    <Text center accent>add-ons</Text>
                                </Button>
                                {/* <Button color={(!isAlreadyInCart(service._id))?theme.colors.gray2:theme.colors.primary} 
                                  disabled={isAlreadyInCart(service._id)}
                                  onPress={() => addServiceToCart(service)}>
                                    <Text style={{ padding:20}} bold size={20}>{(!isAlreadyInCart(service._id))?'+':'added'}</Text>
                                </Button> */}
                                <TouchableOpacity style={styles.actionButton} disabled={isAlreadyInCart(service._id)} onPress={() => addServiceToCart(service)}>
                                  <Icon
                                    name={isAlreadyInCart(service._id) ? 'done':'plus'}
                                    type={isAlreadyInCart(service._id) ? 'material': 'materialCommunity'}
                                    size={22}
                                    color={isAlreadyInCart(service._id) ? theme.colors.secondary: theme.colors.black}
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
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: 1,
    marginBottom: theme.sizes.base & 0.5
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
    padding: 40,
  },
});
