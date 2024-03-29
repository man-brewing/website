import React from 'react'
import { setVerifiedAge } from '../actions/ageVerification'
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

/**
 * Component that handles the slide up transition.
 */
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

/**
 * An age verification dialog.
 */
class AgeVerification extends React.Component {
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props)

        const { cookies } = this.props;
        this.state = {
            modalIsOpen: cookies.get('ageVerified') === 'true' ? false : true,
        };
    }

    /**
     * Updates the redux store saying we are 21 or over.
     */
    handleClose = () => {
        this.props.dispatch(setVerifiedAge(true));

        const { cookies } = this.props;
        cookies.set('ageVerified', 'true', {path: '/'});
    }

    /**
     * Renders this component.
     */
    render() {
        return (
            <Dialog
                open={this.state.modalIsOpen}
                TransitionComponent={Transition}
                keepMounted
            >
                <DialogTitle>Age Verification</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you 21 or older?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button fullWidth={true} variant="contained" onClick={this.handleClose}>Yes</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

/**
 * Maps the redux store to component props.
 * @param {*} param0 The redux store.
 */
function mapStateToProps({ ageVerification }) {
    return {
        isAgeVerified: ageVerification.isAgeVerified,
    }
}

// Connects this component to the redux store.
export default withCookies(connect(mapStateToProps)(AgeVerification));