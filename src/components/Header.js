import React from 'react'
import Background from '../images/hops_banner.jpg'

let headerStyle = {
    backgroundImage: `url(${Background})`,
    height: '200px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative'
}

let companyNameStyle = {
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'black',
    fontSize: '80px',
}

export default class Header extends React.Component {
    render () {
        return (
            <div style={ headerStyle }>
                <div style={ companyNameStyle }>
                    M.A.N. Brewing
                </div>
            </div>
        )
    }
}