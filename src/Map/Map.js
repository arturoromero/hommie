import React from 'react';
import { Col } from 'react-bootstrap';
import {
  GoogleMap,
  LoadScript,
} from '@react-google-maps/api';
import credentials from '../credentials';
import Mark from './Mark';


export default class Map extends React.Component {

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
  render() {
    if (this.state.loading) {
      return <div>Cargando...</div>;
    }

    if (!this.state.homes) {
      return <div>No se pudo cargar mapa.</div>;
    }
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
                <Mark
                  key={'mark' + map.id.toString()}
                  mark={map}
                />
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
