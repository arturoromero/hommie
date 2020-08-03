import React from 'react';
import { Col } from 'react-bootstrap';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import credentials from '../credentials';
import Homes from '../Homes/Homes';


export default class Map extends React.Component {

	constructor (props) {
		super(props);
		this.state= {
			isActive: false
		}
	};
	
	handleIsActive = () => {
		this.setState({isActive: true});
		console.log(this.state);
	}

	handleIsNotActive = () => {
		this.setState({ isActive: false });
	}

	state = {
		loading: true,
		homes: null,
	};

  async componentDidMount() {
    const url = 'https://us-central1-homie-front-test.cloudfunctions.net/homes';
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ homes: data.homes, loading: false });
  }
  render(onUnmount) {
    if (this.state.loading) {
      return <div>Cargando...</div>;
    }

    if (!this.state.homes) {
      return <div>No se pudo cargar mapa.</div>;
    }
    let CurrencyFormat = require('react-currency-format');
    return (
      <div>
        <Col>
          <LoadScript googleMapsApiKey={credentials.mapKey}>
            <GoogleMap
              mapContainerStyle={{
                width: '100%',
                height: '100vh',
              }}
              center={{ lat: 19.422854, lng: -99.170265 }}
              zoom={12}
            >
              {this.state.homes.map(map => (
                <Marker
                  ref={this.textInput}
                  onClick={()=> this.handleIsActive()}
                  key={'home' + map.id.toString()}
                  position={{
                    lat: map.location.lat,
                    lng: map.location.lng,
                  }}
                >
                  <InfoWindow>
                    <div>
                      <CurrencyFormat
                        value={map.price}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                      />
                    </div>
                  </InfoWindow>
                </Marker>
              ))}
              <></>
            </GoogleMap>
          </LoadScript>
        </Col>
        ))} ;
      </div>
    );
  }
}
