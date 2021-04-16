import React from 'react'
import { connect } from 'react-redux'
import { Block, Text } from './../components/index';

const Menu = (props) => {
    return (
        <Block>
            <Text>Menu</Text>
        </Block>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
