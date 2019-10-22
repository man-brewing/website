import { slide as Menu } from 'react-burger-menu'

class BurgerMenu extends React.Component {

  showSettings (event) {
    event.preventDefault();
  }

  render() {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return React.createElement(Menu, null, React.createElement("a", {
      id: "home",
      className: "menu-item",
      href: "/"
    }, "Home"), React.createElement("a", {
      id: "about",
      className: "menu-item",
      href: "/about"
    }, "About"), React.createElement("a", {
      id: "contact",
      className: "menu-item",
      href: "/contact"
    }, "Contact"), React.createElement("a", {
      onClick: this.showSettings,
      className: "menu-item--small",
      href: ""
    }, "Settings"));
  }
}

ReactDom.render(React.createElement(BurgerMenu), document.getElementById('burger-menu'))
