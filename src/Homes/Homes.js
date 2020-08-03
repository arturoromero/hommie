import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import BedroomImage from '../assets/images/icons/bedroom.png';
import BathroomImage from '../assets/images/icons/bathrooms.png';
import ParkingImage from '../assets/images/icons/parking.png';
import PetImage from '../assets/images/icons/pet.png';


export default class Homes extends React.Component {

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
		return <div>No se pudo cargar el hogar.</div>;
	}
	let CurrencyFormat = require('react-currency-format');
	return (
		<div>
			<Container>
			<Row>
				<Col>
				<Container className="home_scrollable">
					<Row>
					{this.state.homes.map(home => (
						<Col
						md={6}
						key={'home' + home.id.toString()}
						>
						<div className="home_wrapper">
							<Row>
							<div
								style={{
								backgroundImage: 'url(' + home.photos[0] + ')',
								}}
								className="photo_wrapper"
							>
								<div className="price_wrapper">
								<CurrencyFormat
									value={home.price}
									displayType={'text'}
									thousandSeparator={true}
									prefix={'$'}
								/>
								<div className="icons icon_heart"></div>
								</div>
								{home.is_homie_exclusive && (
								<div className="exclusive_wrapper">
									<span>Exclusivo de Homie</span>
								</div>
								)}
							</div>
							</Row>
							<Row className="home_name_wrapper">
							<p className="home_name">{home.abbr_address}</p>
							<ul className="feature">
								<li className="feature_item">
								<span>{home.bedrooms}</span>
								<img
									className="icon-feature size-35"
									src={BedroomImage}
									alt="A Bedroom Icon"
								/>
								</li>
								<li className="feature_item">
								<span>{home.bathrooms}</span>
								<img
									className="icon-feature size-22"
									src={BathroomImage}
									alt="A Bathroom Icon"
								/>
								</li>
								<li className="feature_item">
								<span>{home.parkings}</span>
								<img
									className="icon-feature size-45"
									src={ParkingImage}
									alt="A Parking Icon"
								/>
								</li>
								<li className="feature_item">
								<span>{home.pet_friendly ? 'Si' : 'No'}</span>
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
