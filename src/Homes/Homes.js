import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Home from './Home'

export default class Homes extends React.Component {
  state = {
    loading: true,
    homes: null,
  };
  constructor (props) {
		super(props);
		this.state= {
			isActive: false
		}
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
		return <div>No se pudo cargar el hogar.</div>;
		}
		return (
      <div>
        <Container>
          <Row>
            <Col>
              <Container id="scrollable" className="home_scrollable">
                <Row>
                  {this.state.homes.map(home => (
                    <Home key={"home"+home.id} items={home} />
                  ))}
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    );
	}
}
