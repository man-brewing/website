

class Example extends React.Component {
  showSettings(event) {
    event.preventDefault();
  }

  render() {
    return React.createElement(BurgerMenu, null, React.createElement("a", {
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

ReactDOM.render(React.createElement(Example), document.getElementById('burger'));
