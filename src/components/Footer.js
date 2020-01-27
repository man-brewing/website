import React from 'react'

let footerStyle = {
    height: '100px',
    backgroundColor: 'black'
}

let tableFooterStyle = {
    marginLeft: 'auto',
    marginRight: 'auto'
}

export default class Footer extends React.Component {
    render() {
        return (
            <footer style= { footerStyle }>
                <table style={ tableFooterStyle }>
                    <tbody>
                        <tr>
                            <td>
                                <a target='blank' href='https://www.google.com/maps/place/2837+N+Pierce+St,+Milwaukee,+WI+53212/@43.0698428,-87.9069123,15z/data=!4m5!3m4!1s0x8805192fc89a6315:0xab2810b41f950d70!8m2!3d43.0701594!4d-87.9030329'>Find Us</a>
                            </td>                        
                        </tr>
                        <tr>
                            <td>
                                <a target='blank' href='mailto:webmaster@krimthered.ddns.net'>Contact Us</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </footer>
        )
    }
}