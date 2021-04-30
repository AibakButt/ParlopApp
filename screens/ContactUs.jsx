import React from 'react'
import { connect } from 'react-redux'
import { Block, Text} from '../components'
import { theme } from '../constants'
import { StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

function ContactUs (props) {
    return (
        <Block color={theme.colors.gray2}>
            <Block flex={0.9}>
                <ScrollView>
                    
                    <Block>
                        <Text style={styles.text}>Full Name<Text tertiary> *</Text></Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={() => {}}
                            placeholder="Full Name"           
                        />
                    </Block>
                    <Block>
                        <Text style={styles.text}>Email<Text tertiary> *</Text></Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={() => {}}
                            placeholder="Email"
                        />
                    </Block>
                    <Block>
                        <Text style={styles.text}>Nature of Subject<Text tertiary> *</Text></Text>
                        <DropDownPicker
                            items={[
                                {label: 'Complaint', value: 'complaint' },
                                {label: 'Suggesstion', value: 'suggesstion' },
                                {label: 'Bug Report', value: 'bug report' },
                                {label: 'Feature Request', value: 'feature request' },
                                {label: 'Other', value: 'other' },
                            ]}
                            defaultValue='complaint'
                            containerStyle={{ height: 45, zIndex:5}}
                            style={{...styles.textInput, borderWidth: 0, borderRadius: 12 }}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{backgroundColor: theme.colors.white, marginHorizontal: theme.sizes.base, borderRadius: 12}}
                            onChangeItem={item => console.log(item)}
                        />
                    </Block>
                    <Block>
                        <Text style={styles.text}>Subject<Text tertiary> *</Text></Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={() => {}}
                            placeholder="Subject"
                        />
                    </Block>
                    <Block>
                        <Text style={styles.text}>Message<Text tertiary> *</Text></Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={() => {}}
                            placeholder="Message"
                            multiline
                            numberOfLines={4}
                        />
                    </Block>
                </ScrollView>
            </Block>
            <Block flex={0.1} >
                <TouchableOpacity style={styles.submitButton} >
                   
                        <Text white size={16} bold center> 
                           Submit
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
        backgroundColor: theme.colors.whtie,
        paddingHorizontal: theme.sizes.base,
        paddingVertical: theme.sizes.base,
        fontSize: 18,
        fontWeight: "600"
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
 
    }
})