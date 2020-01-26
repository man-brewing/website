import React from 'react'
import Header from './Header'
import NavBar from './NavBar'
import Content from './Content'
import Footer from './Footer'
import Chart from './Chart'

export default class Fermentorium extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <NavBar />
                <Content>
                    <Chart />
                </Content>
                <Footer />
            </div>
        )
    }
}