import React from 'react'
import Wrapper from './Wrapper'

export default class About extends React.Component {

    render() {
        return(
            <Wrapper>
                <p style={{ width: '50%', }}>
                    What started as a couple of buddies brewing too much beer for their own consumption turned into a couple of buddies brewing
                    way too much beer for their own consumption.
                </p>
            </Wrapper>
        )
    }
}