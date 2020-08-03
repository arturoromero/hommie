
import React from 'react';
import {
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

export default class Mark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
  }

  state = {
    loading: true,
    homes: null,
  };
  handleIsActive = () => {
	let _this = this;
    let container = document.getElementById('scrollable');
    let rowToScrollTo = document.getElementById(_this.props.mark.id.toString());
	container.scrollTop = rowToScrollTo.offsetTop;
	let home_wrappers = document.getElementsByClassName('home_item');
	for (var i = 0; i < home_wrappers.length; i++) {
		home_wrappers[i].classList.remove('active');
	}
	rowToScrollTo.classList.add('active');
    _this.setState({
      isActive: !_this.state.isActive,
    });
  };

  render() {
   	let _this = this;
   	let activeStatus = this.state.isActive;
    let CurrencyFormat = require('react-currency-format');
    return (
      <Marker
		onClick={_this.handleIsActive.bind(this)}
		key={"map"+this.props.mark.id}
        className={`${activeStatus ? 'active' : ''}`}
        position={{
          lat: this.props.mark.location.lat,
          lng: this.props.mark.location.lng,
        }}
      >
        <InfoWindow>
          <div>
            <CurrencyFormat
              value={this.props.mark.price}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$'}
            />
          </div>
        </InfoWindow>
      </Marker>
    );
  }
}
