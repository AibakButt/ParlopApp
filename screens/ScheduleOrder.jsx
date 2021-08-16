import React, { useRef, useEffect, useState} from 'react'
import { Picker, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Block, Text } from '../components'
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, TextInput, Platform } from 'react-native';
import { theme } from '../constants';
import Icon from '../components/Icon';
import { showMessage, hideMessage } from "react-native-flash-message";
import { handleTextChange } from './../redux/actions/orderActions';
import { getCurrentCustomer } from '../redux/actions/authentication';
import RNPickerSelect from 'react-native-picker-select';




function ScheduleOrder(props) {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let phoneInput = useRef();

    const [customer, setCustomer] = useState(null)

    useEffect( () => {

        const getCustomer = async () => {
            try {
                setCustomer(await getCurrentCustomer())
            } catch (error) {
                console.log(error)
            }
    
        }
        
        getCustomer()

        
    }, []);


    const onChangeDate = (selectedDate) => {
        setShowDatePicker(false);
        
        //when cancel button press
        if(!selectedDate) return 

        let now  = new Date()
        if(selectedDate.getTime() < now.getTime()){
            showMessage({
                message: "Date can only be selected onwards from today",
                type: "danger",
                floating: true
              });
            setDate(date);
        }else{
            setDate(selectedDate);
            props.handleTextChange(selectedDate,"date")
        }
    }

    const onChangeTime = (selectedTime) => {

        let startTime = 9
        let endTime = 21
        let diff = 4

        setShowTimePicker(false);

        //when cancel button press
        if(!selectedTime) return 

        const currentTime = selectedTime || time;
        let now  = new Date()
        let sameDay = date.getTime() === now.getTime()

        if(sameDay){
            //selected time on a same day should greater than now...
            if(selectedTime.getHours() < new Date().getHours()){
                showMessage({
                    message: "Selected time should be 4 hours greater than now",
                    type: "danger",
                    floating: true
                  });
            }
            // if(selectedTime.getHours() < )
            if(selectedTime.getHours() + diff  >= startTime && selectedTime.getHours() + diff <= endTime ){
                setTime(currentTime);
                props.handleTextChange(selectedTime,"time")
            }
            else{
                showMessage({
                    message: "On a same day order time should be 4 hours after than now  be selected from 4:59 AM to 4:59 PM",
                    type: "danger",
                    floating: true
                  });
            }
        }
        else{
            if(selectedTime.getHours() >= startTime && selectedTime.getHours() <= endTime ){
                setTime(currentTime);
                props.handleTextChange(selectedTime,"time")
            }
            else{
                showMessage({
                    message: "Time can only be selected from 8:59 AM to 8:59 PM",
                    type: "danger",
                    floating: true
                  });
            }
        }
        
    }

    const getAMPM = (hours) => {
      
        let ampm = hours >= 12 ? 'PM' : 'AM';
        return ampm;
      }
   
    const validate = () => {
        const { order } = props;
        if(order.date == ""){
            showMessage({
                message: "Please select the date",
                type: "error",
                floating: true
            });
            return
        }   
        if(order.time == ""){
            showMessage({
                message: "Please select the time",
                type: "error",
                floating: true
            });
            return
        }
        
        if(order.address == ""){
            showMessage({
                message: "Please enter the address",
                type: "error",
                floating: true
            });
            return
        }
        if(order.area == ""){
            showMessage({
                message: "Please select the area",
                type: "error",
                floating: true
            });
            return
        }
        
        props.navigation.push("Order Summary")
    } 

    const {order} = props;
    
    return (

       <Block color={theme.colors.gray2} style={{marginBottom: theme.sizes.base * 1.65}}>
            <Block flex={0.9}>
                <ScrollView>
                    {/* {console.log("------------------Order--------------------",order)} */}
                    <Block flex={false}>
                        <Text style={styles.text}>Select Date</Text>
                        <TouchableOpacity  onPress={()=>setShowDatePicker(true)} >
                            <Block row color={theme.colors.white} space="between" style={{marginHorizontal: theme.sizes.base, borderRadius :12}}>
                                <Text style={[styles.select , {textAlign: 'center', paddingTop: 12}]}>{ date.toDateString().split(' ')[1] + ". " + date.getDate() + ",  " + days[date.getDay()]}</Text>
                                <Icon
                                    name={'plus'}
                                    type={ 'entypo'}
                                    size={26}
                                    color={theme.colors.black}
                                    style={[styles.select, {paddingTop: 12}]}
                                />
                            </Block>
                        </TouchableOpacity>
                        {
                            showDatePicker && (
                                <DateTimePicker
                                    testID="datePicker"
                                    value={date}
                                    mode={'date'}
                                    is24Hour={true}
                                    display="default"
                                    onChange={ (e,date)=> onChangeDate(date)}
                                />
                            )
                        }
                    </Block>
                    <Block flex={false}>
                        <Text style={styles.text}>Select Time</Text>
                        <TouchableOpacity  onPress={()=>setShowTimePicker(true)} >
                            <Block row color={theme.colors.white} space="between" style={{marginHorizontal: theme.sizes.base, borderRadius :12}}>
                               
                                    <Text style={[styles.select , {textAlign: 'center', paddingTop: 12}]}>
                                        { (((time.getHours() % 12) + "" ).length === 1 ? ("0"+(time.getHours() % 12)) : (time.getHours() % 12)) + 
                                        " : " + (((time.getMinutes()) + "" ).length === 1 ? ("0"+(time.getMinutes() )) : (time.getMinutes() ))  + 
                                        "  " + getAMPM(time.getHours())}
                                    </Text>
                                    <Icon
                                        name={'plus'}
                                        type={ 'entypo'}
                                        size={26}
                                        color={theme.colors.black}
                                        style={[styles.select, {paddingTop: 12}]}
                                    />
                               
                            </Block>
                        </TouchableOpacity>
                        {
                            showTimePicker && (
                                <DateTimePicker
                                    value={time}
                                    mode={'time'}
                                    is24Hour={false}
                                    display="default"
                                    onChange={ (e,time)=> onChangeTime(time)}
                                />
                            )
                        }
                    </Block>
                    <Block>
                        <Text style={styles.text}>Contact Number</Text>
                        <Block row style={{marginHorizontal: theme.sizes.base}}>
                            <TextInput
                                keyboardType="numeric"
                                maxLength={10}
                                style={[styles.phoneInput, {width: '20%', color: 'black', borderTopLeftRadius: 12,borderBottomLeftRadius: 12,}]}
                                value="+92"
                                editable={false}
                            />
                            <TextInput
                                editable={!customer}
                                style={[styles.phoneInput, {width: '80%', color: 'black', letterSpacing: 4, borderTopRightRadius: 12,borderBottomRightRadius: 12,}]}
                                onChangeText={(value) => props.handleTextChange("phone",value)}
                                placeholder="Phone Number"
                                value={customer && customer.phone? customer.phone.substr(3,customer.phone.length-1): order.phone}
                                keyboardType="numeric"
                                maxLength={10}
                            />
                        </Block>
                    </Block>
                    <Block>
                        <Text style={styles.text}>Address</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(value) => props.handleTextChange("address",value)}
                            placeholder="Block XYZ Street 123, Johar Town, Lahore"
                            multiline
                            numberOfLines={3}
                            value={order.address}
                        />
                    </Block>
                    <Block>
                        <Text style={styles.text}>Area</Text>
                        
                        <Block style={styles.picker} middle >
                            
                            <RNPickerSelect
                                style={{inputAndroid: styles.select, inputIOS: styles.select, }}
                                useNativeAndroidPickerStyle={false}
                                value={order.area}
                                onValueChange={(value) => props.handleTextChange("area",value)}
                                items={[
                                    {label: "Johar Town", value: "Johar Town" },
                                    {label: 'Gulberg', value: 'Gulberg' },
                                    {label: 'Iqbal Town', value: 'Iqbal Town' },
                                    {label: 'DHA', value: 'DHA' },
                                    {label: 'Upper Mall', value: 'Upper Mall' },
                                    {label: 'Other', value: 'Other' },
                                ]}
                                
                            />
                        </Block>
                        
                        <Text gray style={{padding: theme.sizes.base}}>Note: Travel Charges may apply on areas other than listed above</Text>
                    </Block>
                    <Block>
                        <Text style={styles.text}>Special Instructions</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(value) => props.handleTextChange("specialInstructions",value)}
                            placeholder="Special instruction to your beautician"
                            multiline
                            numberOfLines={3}
                            value={order.specialInstructions}
                        />
                    </Block>
                </ScrollView>
            </Block>
            <Block flex={0.1} >
                <TouchableOpacity style={styles.orderButton} onPress={() => validate()}>
                   
                        <Text white size={16} bold center> 
                            Place your order
                        </Text>
                   
                </TouchableOpacity>
            </Block>
       </Block>
    )
}

const mapStateToProps = (state) => ({
    order: state.orderReducer.order
})

const mapDispatchToProps = (dispatch) => ({
    handleTextChange: (field, value) => handleTextChange(dispatch, field, value)
})

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleOrder)

const styles = StyleSheet.create({
    text:{
        color: theme.colors.black,
        height: 30,
        marginHorizontal: 20,
        marginVertical: 10,
        fontWeight: 'bold',
        fontSize: 18
    },
    select:{
        marginHorizontal: theme.sizes.base,
        borderRadius: 12,
        backgroundColor: theme.colors.whtie,
        paddingHorizontal: theme.sizes.base,
        paddingVertical: theme.sizes.base,
        fontSize: 18,
        fontWeight: "600"
    },
    phoneInput:{ 
        backgroundColor: theme.colors.white,
        paddingHorizontal: theme.sizes.base,
        paddingVertical: theme.sizes.base,
        fontSize: 15,

    },
    textInput:{ 
        marginHorizontal: theme.sizes.base,
        borderRadius: 12,
        backgroundColor: theme.colors.white,
        paddingHorizontal: theme.sizes.base,
        fontSize: 15,
        height: theme.sizes.base * 4,
       
    },
    orderButton: {
        marginHorizontal: theme.sizes.base,
        padding: theme.sizes.base,
        borderRadius: 12,
        backgroundColor: theme.colors.accent,
 
    },
    select:{
        marginHorizontal: theme.sizes.base,
        borderRadius: 12,
        backgroundColor: theme.colors.white,
        paddingHorizontal: theme.sizes.base,
        height: theme.sizes.base * 3,
        color:  theme.colors.black
       
    },
})