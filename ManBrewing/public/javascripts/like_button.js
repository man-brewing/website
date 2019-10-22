'use strict';

class LikeButton extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
          liked: false
        }
    }

    onToggleLike() {
      this.setState((currentState) => {
        return {
          liked: true
        }
      })
    }

    render() {
        if (this.state.liked) {
            return 'You liked this.'
        }

        return React.createElement(
          'button',
          { onClick: () => this.setState({ liked: true }) },
          'Like'
        )
    }
}

ReactDOM.render(React.createElement(LikeButton), document.getElementById('like_button_container'))
