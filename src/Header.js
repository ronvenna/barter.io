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
          <div className="header__logo">
            <h3 className="header__logo_title"> Barter </h3>
          </div>
        </div>
        <div className="sub-header">
          <div class="sub-header__search">
             <input type="text" class="sub-header__search_term" placeholder="Search" />
             <button type="submit" class="sub-header__search_button">
               <i class="fa fa-search"></i>
            </button>
          </div>
          <div className="sub-header__links">
            <button onClick={this.show.bind(this)} className="sub-header__links_post_button">Post Your Item </button>
          </div>
        </div>
        <Rodal visible={this.state.visible} onClose={this.hide.bind(this)} animation="slideUp">
          <div className="postContainer">
            <div className="startBarter">
              <p className="startBarterTitle">START A BARTER:</p>
            </div>
            <div>
              <input type="text" placeholder="Item Name" className="postItemInput"/>
            </div>
            <div>
              <input type="text" placeholder="Quantity" className="postItemInput"/>
            </div>
            <div>
              <input type="text" placeholder="Expiration (in days)" className="postItemInput"/>
            </div>
            <div>
              <p>Upload an Image:</p>
            </div>
            <div className="submitItem">
              <button className="postButton">Post</button>
            </div>
          </div>
        </Rodal>
      </div>
    );
  }
}


export default Header;
