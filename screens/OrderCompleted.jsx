import React from 'react'
import { Block, Text } from "../components";
import Icon from "../components/Icon";

export default function OrderCompleted() {
    return (
        <Block center middle flex={1} color={theme.colors.white}> 
                <Icon
                    name={'smile-o'}
                    type="fontAwesome"
                    size={40}
                    color={theme.colors.accent}
                />
                <Text gray center size={20} style={{padding: theme.sizes.base}}>Thank You! for using our service</Text>
        </Block>
    )
}
