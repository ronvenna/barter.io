import React from 'react';
import Rodal from 'rodal';
// include styles
import 'rodal/lib/rodal.css';
import PostItem from './PostItem';

class Header extends React.Component {
  constructor(props) {
  super(props);
    this.state = { visible: false };

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.hideAndRefresh = this.hideAndRefresh.bind(this);
  }

  show() {
    this.setState({ visible: true });
  }

  hide() {
    this.setState({ visible: false });
  }

  hideAndRefresh() {
    this.hide();
    this.props.refresh();
  }

  render(){
    return(
      <div>
        <div className="header">
          <div className="header__logo">
            <h3 className="header__logo_title"> Barter </h3>
          </div>
        </div>
        <div className="sub-header">
          <div className="sub-header__search">
             <input type="text" className="sub-header__search_term" placeholder="Search" />
             <button type="submit" className="sub-header__search_button">
               <i className="fa fa-search"></i>
            </button>
          </div>
          <div className="sub-header__links">
            <button onClick={this.show} className="sub-header__links_post_button">Post Your Item </button>
          </div>
        </div>
        <Rodal visible={this.state.visible} onClose={this.hide.bind(this)} animation="slideUp">
          <PostItem
            onSubmit={this.hideAndRefresh}
          />
        </Rodal>
      </div>
    );
  }
}


export default Header;
