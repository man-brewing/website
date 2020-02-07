import React from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import NavBar from './NavBar'
import Content from './Content'
import Footer from './Footer'
import AgeVerification from './AgeVerification'

class Wrapper extends React.Component {

    render() {
        let { isAgeVerified } = this.props

        return (
            <>
                {!isAgeVerified && <AgeVerification/>}
                <Header />
                <NavBar />
                <Content>
                    {this.props.children}
                </Content>
                <Footer />
            </>
        )
    }
}

function mapStateToProps({ ageVerification }) {
    return { 
        isAgeVerified: ageVerification.isAgeVerified,
    }
}

export default connect(mapStateToProps)(Wrapper)