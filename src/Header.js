import React from 'react';
import Rodal from 'rodal';
// include styles
import 'rodal/lib/rodal.css';

class Header extends React.Component {
  constructor(props) {
  super(props);
    this.state = { visible: false };
  }

  show() {
    this.setState({ visible: true });
  }

  hide() {
    this.setState({ visible: false });
  }

  render(){
    return(
      <div>
        <div className="header">
          <div />
          <div className="header__logo">
            <h3 className="header__logo_title"> Barter </h3>
          </div>
          <div className="header__links">
            <button onClick={this.show.bind(this)} className="header__links_post_button">Post Your Item </button>
          </div>
        </div>
        <Rodal visible={this.state.visible} onClose={this.hide.bind(this)} animation="slideUp">
          <div>Content</div>
        </Rodal>
      </div>
    );
  }
}


export default Header;
