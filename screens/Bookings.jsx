import React from 'react'
import { connect } from 'react-redux'
import { Block, Text } from './../components/index';

const Bookings = (props) => {
    return (
        <Block>
            <Text>Bookings</Text>
        </Block>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookings)
