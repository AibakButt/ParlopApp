import React from 'react'
import { connect } from 'react-redux'
import { Block, Text } from './../components/index';
import { StyleSheet, NativeModules, ScrollView, Image, TouchableOpacity } from 'react-native';
import { theme } from '../constants';
import { Platform } from 'react-native';
import Icon from '../components/Icon';

const { StatusBarManager } = NativeModules;

const Menu = (props) => {
    return (
        <Block flex={1} style={styles.header}>
                <Block row flex={1.5} color={theme.colors.white} style={{borderRadius:12}} margin={[0,10,0,10]} center middle>
                    <Block style={{paddingHorizontal: 12}} flex={2}>
                        <Image source={require('../assets/images/user.png')} style={styles.logo}/>
                    </Block>
                    <Block flex={6}>
                        <Text size={22}>Guest User</Text>
                    </Block>
                    <Block flex={2}>
                        <TouchableOpacity>
                            <Text size={12} accent>
                                Signin / Signup
                            </Text>
                        </TouchableOpacity>
                    </Block>
                </Block>
                <Block flex={8} color="white" style={{borderRadius:12}} margin={[5,10,0,10]} > 
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentInset={{top: 0, left: 0, bottom: 0, right: 0}}
                        style={{margintop:theme.sizes.base*2, borderRadius:12}}
                    >
                       
                       <TouchableOpacity style={styles.menuItem}>
                            <Block row>
                            <Icon
                                name={'play'}
                                type={'feather'}
                                size={22}
                                color={theme.colors.accent}
                            />
                            <Text style={{paddingLeft: 12}} size={18}>Play Intro</Text>
                            </Block>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.menuItem} onPress={()=>props.navigation.navigate("Coupons")}>
                            <Block row>
                            <Icon
                                name={'pricetag'}
                                type={'ionicon'}
                                size={22}
                                color={theme.colors.accent}
                            />
                            <Text style={{paddingLeft: 12}} size={18}>Coupons</Text>
                            </Block>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.menuItem}>
                            <Block row>
                            <Icon
                                name={'questioncircleo'}
                                type={'ant'}
                                size={22}
                                color={theme.colors.accent}
                            />
                            <Text style={{paddingLeft: 12}} size={18}>FAQ's</Text>
                            </Block>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.menuItem} onPress={()=>props.navigation.navigate("Settings")}> 
                            <Block row>
                                <Icon
                                    name={'settings'}
                                    type={'feather'}
                                    size={22}
                                    color={theme.colors.accent}
                                />
                                <Text style={{paddingLeft: 12}} size={18}>Settings</Text>
                            </Block>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.menuItem} onPress={() => props.navigation.navigate("ContactUs")}>
                            <Block row>
                            <Icon
                                name={'phone'}
                                type={'materialCommunity'}
                                size={22}
                                color={theme.colors.accent}
                            />
                            <Text style={{paddingLeft: 12}} size={18}>Contact Us</Text>
                            </Block>
                       </TouchableOpacity>
                    </ScrollView>
               
                </Block>
               
            </Block>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)


const styles = StyleSheet.create({
    header: {
        paddingTop: Platform.OS === 'ios' ? 25 : StatusBarManager.HEIGHT * 1.5,
        borderRadius: 12,
    },
    logo: {
        width: 60,
        height: 60,
        borderRadius:30
    },
    menuItem: {
        padding: theme.sizes.base
    }
})