import React from 'react'
import { connect } from 'react-redux'
import { Block, Text } from './../components/index';

const Cart = (props) => {
    return (
        <Block>
            <Text>Cart</Text>
        </Block>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
