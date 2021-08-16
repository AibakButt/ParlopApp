import React from 'react'
import { connect } from 'react-redux'
import { Block, Text} from '../components'
import { theme } from '../constants'
import { StyleSheet, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { handleTextChange, submitContactUs } from './../redux/actions/contactUsActions';
import { useState } from 'react';

function ContactUs (props) {
   
    const { contactUs } = props

    const [isLoading, setIsLoading] = useState(false)

    return (
        <KeyboardAvoidingView flex={1} behavior="padding">
        <Block color={theme.colors.gray2}>
            <Block flex={0.9}>
                <ScrollView>
                    
                    <Block>
                        <Text style={styles.text}>Full Name<Text tertiary> *</Text></Text>
                        <TextInput
                            value={contactUs.fullName}
                            onChangeText={(value) => props.handleTextChange("fullName",value)}
                            style={styles.textInput}
                            placeholder="Full Name"           
                        />
                    </Block>
                    <Block>
                        <Text style={styles.text}>Email<Text tertiary> *</Text></Text>
                        <TextInput
                            style={styles.textInput}
                            value={contactUs.email}
                            onChangeText={(value) => props.handleTextChange("email",value)}
                            placeholder="Email"
                        />
                    </Block>
                    <Block>
                        <Text style={styles.text}>Nature of Subject<Text tertiary> *</Text></Text>
                       
                         <RNPickerSelect
                            style={{inputAndroid: styles.select, inputIOS: styles.select, }}
                            useNativeAndroidPickerStyle={false}
                            value={contactUs.natureOfSubject}
                            onValueChange={(value) => props.handleTextChange("natureOfSubject",value)}
                            items={[
                                {label: 'Complaint', value: 'complaint' },
                                {label: 'Suggesstion', value: 'suggesstion' },
                                {label: 'Bug Report', value: 'bug report' },
                                {label: 'Feature Request', value: 'feature request' },
                                {label: 'Other', value: 'other' },
                            ]}
                            
                        />
                    </Block>
                    <Block>
                        <Text style={styles.text}>Subject<Text tertiary> *</Text></Text>
                        <TextInput
                            style={styles.textInput}
                            value={contactUs.subject}
                            onChangeText={(value) => props.handleTextChange("subject",value)}
                            placeholder="Subject"
                        />
                    </Block>
                    <Block>
                        <Text style={styles.text}>Message<Text tertiary> *</Text></Text>
                        <TextInput
                            style={styles.textInput}
                            value={contactUs.message}
                            onChangeText={(value) => props.handleTextChange("message",value)}
                            placeholder="Message"
                            multiline
                            numberOfLines={4}
                        />
                    </Block>
                </ScrollView>
            </Block>
            <Block flex={0.1} >
                <TouchableOpacity style={styles.submitButton} disabled={isLoading} onPress={async () => {setIsLoading(true); await props.submitContactUs(); setIsLoading(false);}} >
                   
                        <Text white size={16} bold center> 
                          {
                              isLoading ? <ActivityIndicator size={15} color={theme.colors.white} /> : "Submit"
                          }
                        </Text>
                   
                </TouchableOpacity>
            </Block>
       </Block>
       </KeyboardAvoidingView>
    )
}

const mapStateToProps = (state) => ({
    contactUs: state.contactUsReducer.contactUs
})


const mapDispatchToProps = (dispatch) => ({
    handleTextChange: (field, value) => handleTextChange(dispatch, field, value),
    submitContactUs: () => submitContactUs(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs)

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
        backgroundColor: theme.colors.white,
        paddingHorizontal: theme.sizes.base,
        height: theme.sizes.base * 3,
        color:  theme.colors.black
       
    },
  
    textInput:{ 
        marginHorizontal: theme.sizes.base,
        borderRadius: 12,
        backgroundColor: theme.colors.white,
        paddingHorizontal: theme.sizes.base,
        fontSize: 15,
        height: theme.sizes.base * 3,
       
    },
    submitButton: {
        marginHorizontal: theme.sizes.base,
        padding: theme.sizes.base,
        borderRadius: 12,
        backgroundColor: theme.colors.accent,
        paddingVertical: theme.sizes.base
    }
})