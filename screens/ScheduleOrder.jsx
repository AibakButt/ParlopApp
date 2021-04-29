import React, { useRef } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Block, Text } from '../components'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { theme } from '../constants';
import Icon from '../components/Icon';
import PhoneInput from "react-native-phone-number-input";
import Input from './../components/Input';


function ScheduleOrder(props) {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let phoneInput = useRef();


    const onChangeDate = (date) => {
        setDate(date)
        setShowDatePicker(false)
    }

    const onChangeTime = (time) => {
        setTime(time)
        setShowTimePicker(false)
    }

    const getAMPM = (hours) => {
      
        let ampm = hours >= 12 ? 'PM' : 'AM';
        return ampm;
      }
   

    return (
       <Block color={theme.colors.gray2}>
            <Block flex={0.9}>
                <ScrollView>
                    <Block flex={false}>
                        <Text style={styles.text}>Select Date</Text>
                        <TouchableOpacity  onPress={()=>setShowDatePicker(true)} >
                            <Block row color={theme.colors.white} space="between" style={{marginHorizontal: theme.sizes.base, borderRadius :12}}>
                                <Text style={[styles.select , {textAlign: 'center'}]}>{ date.toDateString().split(' ')[1] + ". " + date.getDate() + ",  " + days[date.getDay()]}</Text>
                                <Icon
                                    name={'plus'}
                                    type={ 'entypo'}
                                    size={26}
                                    color={theme.colors.black}
                                    style={styles.select}
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
                                <Text style={[styles.select , {textAlign: 'center'}]}>
                                    { (((time.getHours() % 12) + "" ).length === 1 ? ("0"+(time.getHours() % 12)) : (time.getHours() % 12)) + 
                                    " : " + (((time.getMinutes()) + "" ).length === 1 ? ("0"+(time.getMinutes() )) : (time.getMinutes() ))  + 
                                    "  " + getAMPM(time.getHours())}
                                </Text>
                                <Icon
                                    name={'plus'}
                                    type={ 'entypo'}
                                    size={26}
                                    color={theme.colors.black}
                                    style={styles.select}
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
                                style={[styles.phoneInput, {width: '20%', color: 'black', borderTopLeftRadius: 12,borderBottomLeftRadius: 12,}]}
                                value="     +92"
                                editable={false}
                            />
                            <TextInput
                                style={[styles.phoneInput, {width: '80%', color: 'black', letterSpacing: 4, borderTopRightRadius: 12,borderBottomRightRadius: 12,}]}
                                onChangeText={() => {}}
                                placeholder="Phone Number"
                                
                            />
                        </Block>
                    </Block>
                    <Block>
                        <Text style={styles.text}>Address</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={() => {}}
                            placeholder="Home Address"
                            multiline
                            numberOfLines={3}
                        />
                    </Block>
                    <Block>
                        <Text style={styles.text}>Special Instructions</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={() => {}}
                            placeholder="Special instruction to your beautician"
                            multiline
                            numberOfLines={3}
                        />
                    </Block>
                </ScrollView>
            </Block>
            <Block flex={0.1} >
                <TouchableOpacity style={styles.orderButton} >
                   
                        <Text white size={16} bold center> 
                            Place your order
                        </Text>
                   
                </TouchableOpacity>
            </Block>
       </Block>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

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
 
    }
})