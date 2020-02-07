import React from 'react'
import Wrapper from './Wrapper'
import BeerScience from '../images/beer_science.jpg'

export default class Home extends React.Component {
    render() {
        return (
            <Wrapper>
                <div>
                    <img style={{ width: '100%' }} src={BeerScience} alt='Beer Science' />                   
                </div>
            </Wrapper>
        )
    }
}