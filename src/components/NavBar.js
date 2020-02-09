import React from 'react'
import { Paper, Tabs, Tab } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'

/**
 * Navigation bar with links to other pages.
 */
export default class Navigation extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value: 0
        }
    }

    handleChange = (event, newValue) => {
        this.setState({
            value: newValue,
        })
    }

    render() {
        return (
            <Paper style={{ flexGrow: 1 }} square>
                <Tabs
                    value={false}
                    centered
                    onChange={this.handleChange}
                >
                    <Tab label='Home' component={RouterLink} to='/'/>
                    <Tab label='Fermentorium' component={RouterLink} to='/fermentorium' />
                </Tabs>
            </Paper>
        )
    }
}