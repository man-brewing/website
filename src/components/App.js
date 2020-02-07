import React from 'react';
import Home from './Home'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Fermentorium from './Fermentorium';
import { handleInitialState } from '../actions/shared';
import { connect } from 'react-redux';
import { CssBaseline, MuiThemeProvider, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    },
})

class App extends React.Component {

    componentDidMount() {
        this.props.dispatch(handleInitialState())
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossOrigin="anonymous"
                    />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&amp;display=swap" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                    {this.props.loading === true
                        ? null
                        :
                        <Switch>
                            <Route path="/fermentorium" component={Fermentorium} />
                            <Route exact path="/" component={Home} />
                        </Switch>
                    }
                </Router>
            </MuiThemeProvider>
        )
    }
}

function mapStateToProps({ ageVerification }) {
    return {
        loading: ageVerification === null,
    }
}

export default connect(mapStateToProps)(App)
