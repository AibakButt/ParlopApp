import React from 'react'
import { Block, Text } from "../components";
import Icon from "../components/Icon";
import { theme } from '../constants';

export default function OrderPlaced() {
    return (
        <Block center middle flex={1} color={theme.colors.white}> 
                <Icon
                    name={'tick'}
                    type="fontAwesome"
                    size={40}
                    color={theme.colors.accent}
                />
                <Text gray center size={20} style={{padding: theme.sizes.base}}>Your Order is placed Successfully!</Text>
        </Block>
    )
}
