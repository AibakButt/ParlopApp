import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { Block, Text } from '../components'
import { theme } from '../constants'

function FAQS (props) {
    return (
        <Block>
            <ScrollView>
                <Block>
                    <Text bold style={{paddingHorizontal: theme.sizes.base, paddingVertical: theme.sizes.base/2}} size={18}>How Can You Contact Us?</Text>
                    <Text style={{paddingHorizontal: theme.sizes.base, lineHeight: 25}} size={16}>
                        You can contact us using the following numbers:{'\n'}
                        1. 0311-1333921{'\n'}
                        2. 0302-0480459
                    </Text>
                    <Text style={{paddingHorizontal: theme.sizes.base, paddingVertical: theme.sizes.base/2}} size={18} bold>How do I book a service?</Text>
                    <Text style={{paddingHorizontal: theme.sizes.base, lineHeight: 25}} size={16}>
                        Appointment have to be made four hours in advance! Once your request is submitted, it will be processed and placed
                        with the Parlor at home booking system as pending.
                        Our team will confirm your order by calling or through whatsapp. After confirmation we assign you a beautician, who arrives
                        at your address (you mentioned in your booking) and start serving you.
                    </Text>

                    <Text bold style={{paddingHorizontal: theme.sizes.base, paddingVertical: theme.sizes.base/2}} size={18}>
                        What are the hours of operation? 
                    </Text>
                    <Text style={{paddingHorizontal: theme.sizes.base, lineHeight: 25}} size={16}>
                        Our hours of operation are 9AM to 9PM and are open from Monday - Sunday
                    </Text>

                    <Text bold style={{paddingHorizontal: theme.sizes.base, paddingVertical: theme.sizes.base/2}} size={18}>What services do you provide?</Text>
                    <Text style={{paddingHorizontal: theme.sizes.base, lineHeight: 25}} size={16}>We provide various services from Manicures & Pedicures, Blowdry, Facial, Waxing, Makeup and Organic body scrub!</Text>

                    <Text bold style={{paddingHorizontal: theme.sizes.base, paddingVertical: theme.sizes.base/2}} size={18}>What is your mode of paymeny?</Text>
                    <Text style={{paddingHorizontal: theme.sizes.base, lineHeight: 25}} size={16}>We are currently operating on a cash based model but are looking for integrating an online payment system. </Text>

                    <Text bold style={{paddingHorizontal: theme.sizes.base, paddingVertical: theme.sizes.base/2}} size={18}>Can I choose my beautician?</Text>
                    <Text style={{paddingHorizontal: theme.sizes.base, lineHeight: 25}} size={16}>
                        Currently, we do not offer such functionalitiy, but if you want to get a personal beautician you can call us and
                        our team will try its best to accommodate your request.
                     </Text>

                    <Text bold style={{paddingHorizontal: theme.sizes.base, paddingVertical: theme.sizes.base/2}} size={18}>Do I tip the beautician?</Text>
                    <Text style={{paddingHorizontal: theme.sizes.base, lineHeight: 25}} size={16}>
                        We highly advise you not to tip the beautician. Parlor at Home is a social enterprise that enables independent beauticians to run 
                        their own beauty bussiness.
                    </Text>

                   


                    <Text bold style={{paddingHorizontal: theme.sizes.base, paddingVertical: theme.sizes.base/2}} size={18}>Are there any transport charges?</Text>
                    <Text style={{paddingHorizontal: theme.sizes.base, lineHeight: 25}} size={16}>
                        Following areas have no transport charges:
                            1. DHA
                            2. Gulberg
                            3. Johar Town
                            4. Iqbal Town
                            5. Upper Mall
                        Other areas in lahore apply transport charges that changes at time.
                    </Text>
                </Block>
            </ScrollView>
        </Block>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(FAQS)
