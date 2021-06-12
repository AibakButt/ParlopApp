import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Block, Text } from './../components/index';
import { TouchableOpacity, useWindowDimensions, NativeModules, Platform, StyleSheet, ScrollView, Animated, Image, Dimensions} from 'react-native';
import {Collapse, CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { theme } from '../constants';
import Icon from '../components/Icon';
import Modal from 'react-native-modal';
import { endServiceTime, startServiceTime, fetchOrders } from './../redux/actions/orderActions';
const { width, height } = Dimensions.get("window");

const { StatusBarManager } = NativeModules;

const Bookings = (props) => {

    useEffect(() => {

        props.fetchBookings();
        
      }, []);

    const [modalShow, setModalShow] = useState(null)

    const getAMPM = (hours) => {
      
        let ampm = hours >= 12 ? 'PM' : 'AM';
        return ampm;
    }
    
    const renderEmployeeData = (booking) => {
        return (
            <Modal
                transparent={false}
                isVisible={modalShow === booking.orderNo}
                style={styles.modalView}
            >
                <Block padding={theme.sizes.base} >
                    <Block flex={1} row right  style={{borderBottomColor: theme.colors.gray2, borderBottomWidth: 1}}>
                        <Icon
                            name="close"
                            color={theme.colors.accent}
                            backgroundColor="white"
                            onPress={() => setModalShow(null)}
                            size={22}
                        /> 
                    </Block>
                    <Block flex={6} center paddingTop={theme.sizes.body}>
                        <Image source={{uri: booking.employee.profilePicture}} style={{width: 150, height: 150, borderRadius: 75}} />
                        <Text style={{paddingVertical: theme.sizes.body}} bold>{booking.employee.name}</Text>
                    </Block>
                    <Block flex={3} center>
                        <Text><Text bold>Email: </Text>{booking.employee.email}</Text>
                        <Text><Text bold>Phone: </Text>+{booking.employee.phone}</Text>
                    </Block>
                </Block>
            </Modal>    
        )
    }

    const renderOrderServices = (services) => {
        return (
            <Block flex={8}  style={{borderRadius:12}} margin={[0,20,0,20]} > 
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentInset={{top: 0, left: 0, bottom: 0, right: 0}}
                        style={{margintop:theme.sizes.base*2, borderRadius:12}}
                    >
                        {
                            services.map( (service, sindex) => (
                                <Block key={sindex} color={theme.colors.white} style={{ marginBottom: theme.sizes.base*0.5, borderRadius: 12}}>
                                    <Block row >
                                        <Block flex={6} >
                                            <Block padding={theme.sizes.base} space="around">
                                                <Block color="accent" center middle style={{ alignSelf: 'flex-start',borderRadius: 12, paddingHorizontal:10, paddingVertical: 1}}><Text center white>{service.category.name}</Text></Block>
                                                <Block padding={5}><Text>{service && service.name?service.name:''}</Text></Block>
                                                <Block paddingHorizontal={5}><Text accent h3>Rs. {service.price}</Text></Block>
                                            </Block>
                                        </Block>
                                        <Block flex={4} row center middle>
                                        
                                            <Text h4 center style={styles.actionText}>Qty: </Text>
                                            <Text h3 center style={styles.actionText}>{service.quantity}</Text>
                                            
                                        </Block>
                                    </Block>
                                    {
                                        service.addons.length >= 1 && (
                                            service.addons.map((addon, index) => (
                                                <Block key={index} row padding={[theme.sizes.base * 0.5, theme.sizes.base*3]} >
                                                    <Block flex={7} >
                                                        <Block  space="around">
                                                            <Text>{addon.name}</Text>
                                                            <Text accent h4>Rs. {addon.price}</Text>
                                                        </Block>
                                                    </Block>
                                                    <Block flex={3} row  space="" center middle>
                                                   
                                                        
                                                    
                                                    <Text h4 center middle style={styles.actionText2}>Qty: </Text>
                                                    <Text h5 center middle style={styles.actionText2}>{addon.quantity}</Text>
                                                   
                                                        
                                                   
                                                    </Block>
                                                </Block>
                                            ))
                                        )
                                    }
                                </Block>
                            ))
                        }
                    </ScrollView>
               
                </Block>
        )
    }

    const renderBookingCard = (booking) => {
        return (
            
                    <Block key={booking._id} color={theme.colors.white} padding={theme.sizes.base} margin={[theme.sizes.base * 0.5,theme.sizes.base,theme.sizes.base*0.5,theme.sizes.base]} style={{borderRadius: 12}}>
                        {booking && booking.employee && renderEmployeeData(booking)}
                        <Block row space="between">
                            <Block>
                                <Block row center>
                                    <Text size={17} bold>Order No. {booking.orderNo}</Text>
                                    <Text  gray bold size={10}> {booking.status}</Text>
                                </Block>
                                <Text size={12} >Order Date. {new Date(booking.date).toLocaleDateString() + " at " + 
                                (((new Date(booking.time).getHours() % 12) + "" ).length === 1 ? ("0"+(new Date(booking.time).getHours() % 12)) : (new Date(booking.time).getHours() % 12)) + 
                                    ":" + (((new Date(booking.time).getMinutes()) + "" ).length === 1 ? ("0"+(new Date(booking.time).getMinutes() )) : (new Date(booking.time).getMinutes() ))  + 
                                    "  " + getAMPM(new Date(booking.time).getHours())
                            }</Text>
                            
                            </Block>
                            
                        </Block>
                        <Block >
                            <Block>
                                <Text bold gray size={13}>{booking.code}</Text>
                            </Block>
                        </Block>
                        <Block row space="between" paddingTop={theme.sizes.base*0.75}>
                            <TouchableOpacity onPress={() => setModalShow(booking.orderNo)}>
                                <Text gray center>Beauticain: <Text bold black>{booking.employee ? booking.employee.name : booking.status}</Text></Text>
                            </TouchableOpacity>
                            <Text center>Total: <Text bold >Rs.</Text><Text bold accent>{booking.orderTotal}</Text></Text>
                        </Block>
                        {
                            booking.start_time && booking.start_time !== "" ? (
                                <Block center marginTop={theme.sizes.body}>
                                    
                                    <Text style={{alignSelf: 'flex-start'}} size={12} gray>Beautician started service started at <Text bold>{(((new Date(booking.start_time).getHours() % 12) + "" ).length === 1 ? ("0"+(new Date(booking.start_time).getHours() % 12)) : (new Date(booking.start_time).getHours() % 12)) + 
                                    ":" + (((new Date(booking.start_time).getMinutes()) + "" ).length === 1 ? ("0"+(new Date(booking.start_time).getMinutes() )) : (new Date(booking.start_time).getMinutes() ))  + 
                                    "  " + getAMPM(new Date(booking.start_time).getHours())}</Text></Text>
                                    <TouchableOpacity style={styles.startButton} onPress={() => props.endServiceTime(booking)}>
                                        <Text style={{marginVertical: 3}} center white size={16}>End</Text>
                                    </TouchableOpacity>
                                </Block>
                            ) : (
                                <Block center marginTop={theme.sizes.body}>
                                    
                                    <Text style={{alignSelf: 'flex-start'}} size={12} gray>When your beautician arrives press the start button</Text>
                                    <TouchableOpacity style={styles.startButton} onPress={() => props.startServiceTime(booking) }>
                                        <Text style={{marginVertical: 3}} center white size={16}>Start</Text>
                                    </TouchableOpacity>
                                </Block>
                                
                            )
                        }
                        <Collapse>
                            <CollapseHeader>
                                <Block style={{ borderTopWidth: 1, borderColor: theme.colors.gray, padding: 5}} center >
                                    <Text size={12} gray style={{textDecorationLine: "underline"}}>View Order Details</Text>
                                </Block>
                            </CollapseHeader>
                            <CollapseBody>
                                {renderOrderServices(booking.service)}
                            </CollapseBody>
                        </Collapse>
                </Block>
                
            
        )
    }

    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'active', title: 'Active' },
        { key: 'past', title: 'Past' },
    ]);

    const ActiveBookings = () => {
        if(props.bookings && props.bookings.filter(booking => booking.status==='Pending' || booking.status === 'Working' || booking.status === 'Assigned').length === 0){
            return(
                <Block center middle flex={1} color={theme.colors.white}> 
                    <Icon
                        name="book"
                        type="ant"
                        color={theme.colors.gray}
                        size={40}
                    /> 
                    <Text gray center size={20} style={{padding: theme.sizes.base}}>No Active Bookings</Text>
                </Block>
            )       
        }
        else{
            return (
                <Block color={theme.colors.gray2}>
                    <ScrollView>
                        {
                            props.bookings && props.bookings.filter(booking => booking.status==='Pending' || booking.status === 'Working' || booking.status === 'Assigned').map((booking ,index) => (
                               renderBookingCard(booking)
                            ))
                        }
                    </ScrollView>
                </Block>
            )
        }
    };
      
      const PastBookings = () => {
        if(props.bookings && props.bookings.filter(booking => booking.status==='Cancel' || booking.status === 'Completed').length === 0){
            return(
                <Block center middle flex={1} color={theme.colors.white}> 
                    <Icon
                        name="book"
                        type="ant"
                        color={theme.colors.gray}
                        size={40}
                    /> 
                    <Text gray center size={20} style={{padding: theme.sizes.base}}>No Past Bookings</Text>
                </Block>
            )       
        }
        return (
            <Block color={theme.colors.gray2}>
                    <ScrollView>
                        {
                            props.bookings && props.bookings.filter(booking => booking.status==='Cancel' || booking.status === 'Completed' ).map((booking, index) => (
                               renderBookingCard(booking)
                            ))
                        }
                    </ScrollView>
            </Block>
        )    
    };

    const renderScene = SceneMap({
        active: ActiveBookings,
        past: PastBookings,
    });
    
    const renderTabBar = (props) => {
        const inputRange = props.navigationState.routes.map((x, i) => i);
    
        return (
          <Block flex={false} space="around" row middle>
            {props.navigationState.routes.map((route, i) => {
              const opacity = props.position.interpolate({
                inputRange,
                outputRange: inputRange.map((inputIndex) =>
                  inputIndex === i ? 1 : 0.5
                ),
              });
    
              return (
                <TouchableOpacity
                  style={styles.tabItem}
                  onPress={() => setIndex(i)}>
                  <Animated.Text style={{opacity}}>{route.title}</Animated.Text>
                </TouchableOpacity>
              );
            })}
          </Block>
        );
      };


   

    return (
        <Block style={styles.header} >
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={renderTabBar}
                style={{backgroundColor: theme.colors.white}}
            />
        </Block>
    )
}

const mapStateToProps = (state) => ({
    bookings: state.orderReducer.orders,
})

const mapDispatchToProps = (dispatch) => ({
    fetchBookings: () => fetchOrders(dispatch),
    startServiceTime: (booking) => startServiceTime(dispatch, booking),
    endServiceTime: (booking) => endServiceTime(dispatch, booking)
})

export default connect(mapStateToProps, mapDispatchToProps)(Bookings)

const styles = StyleSheet.create({
    header: {
      paddingTop: Platform.OS === 'ios' ? 25 : StatusBarManager.HEIGHT * 1.5,
      paddingBottom: theme.sizes.base
    },
   
    tabItem: {
        alignItems: 'center',
        padding: theme.sizes.base,
      },
    startButton: {
        backgroundColor: theme.colors.accent,
        borderRadius: 12,
        width: theme.sizes.base*4,
        margin: theme.sizes.base*0.5
    },
    modalView: {
        margin: theme.sizes.base*3,
        marginVertical: height/4,
        backgroundColor: theme.colors.white,
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
  });
  