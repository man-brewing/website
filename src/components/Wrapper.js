import React from 'react'
import Header from './Header'
import NavBar from './NavBar'
import Content from './Content'
import Footer from './Footer'

export default class Wrapper extends React.Component {
    render() {
        return (
            <>            
                <Header />
                <NavBar />
                <Content />
                <Footer />
            </>
        )
    }
}