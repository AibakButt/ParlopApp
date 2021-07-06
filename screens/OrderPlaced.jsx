import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Block, Text } from "../components";
import Icon from "../components/Icon";
import { theme } from '../constants';

export default function OrderPlaced(props) {
    return (
        <Block  flex={1} color={theme.colors.white}> 
                <Block flex={7} center middle>
                <Icon
                    name={'checkmark-done'}
                    type="ionicon"
                    size={40}
                    color={theme.colors.accent}
                />
                <Text gray center size={20} style={{padding: theme.sizes.base}}>Your Order is placed Successfully!</Text>
                </Block>
                <Block top flex={3} marginHorizontal={theme.sizes.base*3}>
                    <TouchableOpacity style={styles.done} onPress={() => props.navigation.replace("HomeTabs")}>
                    <Text white bold>Done</Text>
                </TouchableOpacity>
                </Block>
        </Block>
    )
}

const styles = StyleSheet.create({

    done: {
        backgroundColor: '#e91e63',
        height: 50,
        marginHorizontal: theme.sizes.base,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
      },
})