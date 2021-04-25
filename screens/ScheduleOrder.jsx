import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Block, Text } from '../components'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { theme } from '../constants';
import Icon from '../components/Icon';
import { onChange } from 'react-native-reanimated';

const ScheduleOrder = (props) => {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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
                            <Block row color={theme.colors.white} space="between">
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
                            <Block row color={theme.colors.white} space="between">
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
                        <Text style={styles.text}>Contact Details</Text>
                    </Block>
                    <Block>
                        <Text style={styles.text}>Your Address</Text>
                    </Block>
                    <Block>
                        <Text style={styles.text}>Special Instructions</Text>
                    </Block>
                </ScrollView>
            </Block>
            <Block flex={0.1}>
                <TouchableOpacity>
                    <Text>
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
        height: 50,
        marginHorizontal: 20,
        marginVertical: 5,
        fontWeight: 'bold',
        fontSize: 20
    },
    select:{
        backgroundColor: theme.colors.whtie,
        paddingHorizontal: theme.sizes.base,
        paddingVertical: theme.sizes.base,
        fontSize: 18,
        fontWeight: "600"
    }
})