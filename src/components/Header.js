import React from 'react'
import Background from '../images/hops_banner.jpg'
import { Textfit } from 'react-textfit'

let headerStyle = {
    backgroundImage: `url(${Background})`,
    height: '200px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative'
}

export default class Header extends React.Component {
    render () {
        return (
            <div style={ headerStyle }>
                <Textfit mode='single' style={{ height: '200px', top: '50%', left: '50%', textAlign: 'center' }}>
                    M.A.N. Brewing
                </Textfit>
            </div>
        )
    }
}