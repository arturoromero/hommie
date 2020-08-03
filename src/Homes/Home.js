import React from 'react';
import { Col, Row } from 'react-bootstrap';
import BedroomImage from '../assets/images/icons/bedroom.png';
import BathroomImage from '../assets/images/icons/bathrooms.png';
import ParkingImage from '../assets/images/icons/parking.png';
import PetImage from '../assets/images/icons/pet.png';


export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
  }

 
  handleIsActive = e => {
    let _this = this;  
    let home_wrappers = document.getElementsByClassName('home_item');
    let markWrappers = document.getElementsByClassName('marker_item');
    for (var i = 0; i < markWrappers.length; i++) {
      markWrappers[i].classList.remove('active');
    }   
    let marker_item = document.getElementById(
       "marker" + _this.props.items.id.toString()
    );
    marker_item.classList.add('active');
    for (var i = 0; i < home_wrappers.length; i++) {
      home_wrappers[i].classList.remove('active');
    }   
  
    e.preventDefault();
    _this.setState({
      isActive: !_this.state.isActive,
    });
  };


  render() {
    let CurrencyFormat = require('react-currency-format');
    let _this = this;
    let activeStatus = this.state.isActive;
    return (
        <Col
          md={6}
          key={'home' + this.props.items.id.toString()}
          onClick={_this.handleIsActive.bind(this)}
          className={`home_item ${activeStatus ? 'active' : ''}`}
          id={this.props.items.id.toString()}
        >
          <div className="home_wrapper">
            <Row>
              <div
                style={{
                  backgroundImage: 'url(' + this.props.items.photos[0] + ')',
                }}
                className="photo_wrapper"
              >
                <div className="price_wrapper">
                  <CurrencyFormat
                    value={this.props.items.price}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                  />
                  <div className="icons icon_heart"></div>
                </div>
                {this.props.items.is_homie_exclusive && (
                  <div className="exclusive_wrapper">
                    <span>Exclusivo de Homie</span>
                  </div>
                )}
              </div>
            </Row>
            <Row className="home_name_wrapper">
              <p className="home_name">{this.props.items.abbr_address}</p>
              <ul className="feature">
                <li className="feature_item">
                  <span>{this.props.items.bedrooms}</span>
                  <img
                    className="icon-feature size-35"
                    src={BedroomImage}
                    alt="A Bedroom Icon"
                  />
                </li>
                <li className="feature_item">
                  <span>{this.props.items.bathrooms}</span>
                  <img
                    className="icon-feature size-22"
                    src={BathroomImage}
                    alt="A Bathroom Icon"
                  />
                </li>
                <li className="feature_item">
                  <span>{this.props.items.parkings}</span>
                  <img
                    className="icon-feature size-45"
                    src={ParkingImage}
                    alt="A Parking Icon"
                  />
                </li>
                <li className="feature_item">
                  <span>{this.props.items.pet_friendly ? 'Si' : 'No'}</span>
                  <img
                    className="icon-feature size-35"
                    src={PetImage}
                    alt="A Pet Icon"
                  />
                </li>
              </ul>
            </Row>
          </div>
        </Col>
    );
  }
}
