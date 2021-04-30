import React, {useState} from 'react'
import { connect } from 'react-redux'
import { Block, Text } from '../components'
import { Switch, Platform, NativeModules, StyleSheet } from 'react-native';
import { theme } from '../constants';

const { StatusBarManager } = NativeModules;

function Settings (props) {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <Block flex={1}>
            <Block flex={1} style={{borderRadius: 12}} space="between" row color={theme.colors.white} margin={theme.sizes.base}>
                <Text size={20} bold style={{padding: theme.sizes.base}}>Push Notifications</Text>
                <Switch
                    style={{padding: theme.sizes.base}}
                    trackColor={{ false: "#767577", true: theme.colors.accent }}
                    thumbColor={"#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                
            </Block>
            <Block flex={8} marginHorizontal={theme.sizes.base}>
                <Text gray>Turn off to stop receiving notifications</Text>
            </Block>
        </Block>
        
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

const styles = StyleSheet.create({
    header: {
        paddingTop: Platform.OS === 'ios' ? 25 : StatusBarManager.HEIGHT * 1.5,
        borderRadius: 12,
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)

