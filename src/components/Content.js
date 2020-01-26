import React from 'react'

export default class Content extends React.Component {
    render() {
        return (
            <div style={{ minHeight: 'calc(100vh - 300px - 56px)', backgroundColor: 'rgb(128,128,128)' }}>
                {this.props.children}
            </div>
        )
    }
}