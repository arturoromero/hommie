import React, { Component } from 'react';
import './App.scss';
import { Container, Col, Row } from 'react-bootstrap';
import Homes from './Homes/Homes';
import Map from './Map/Map';



class App extends Component {
  render(){
    return (
      <div>
        <Container className="app_container">
          <Row>
            <Col className="min_width" md={6}>
              <Homes />
            </Col>
            <Col className="min_width" md={6}>
				<Map />
			</Col>
          </Row>
        </Container>
      </div>
    );
  }
}
 

export default App;
