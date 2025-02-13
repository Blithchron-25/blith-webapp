import React from 'react';
import './stylesheets/events.css';
import { useState } from 'react';

const events = [
	{
		id: 'Panache',
		name: 'Panache',
		tagline: 'Epitome of elegance',
	},
	{
		id: 'Synchronize',
		name: 'Synchronize',
		tagline: 'Unleash the rythm wihtin',
	},
	{
		id: 'String_Theory',
		name: 'String Theory',
		tagline: 'Drum, strum, triumph',
	},
];

function EventCard(props) {
	return (
		<div className="event-cont">
			<img
				className="events-img"
				src={`${props.event.name}.jpg`}
				alt=""
			/>
			<h2 className="events-name">{props.event.name}</h2>
			<p className="events-tag">{props.event.tagline}</p>
		</div>
	);
}
function EventsList(props) {
	const listItems = props.events.map((event) => (
		<a href={`../event?eventname=${event.id}`}>
			<EventCard event={event} key={event.id} />
		</a>
	));
	return <div className="list-cont">{listItems}</div>;
}
function Pronites() {
	return (
		<div className="pronites-cont">
			<h1 className="coming-soon">COMING SOON</h1>
		</div>
	);
}

const styles = [{ borderBottom: '2px solid #ac28ea', color: '#fff' }, {}];

function EventsPage() {
	//fetch events array from firebase here

	const [Flag, setFlag] = useState(0);
	return (
		<div className="container">
			<div
				className="toggle"
				onClick={() => {
					setFlag(1 - Flag);
				}}
			>
				<div className="events-toggle" style={styles[Flag]}>
					EVENTS
				</div>
				<div className="pronites-toggle" style={styles[1 - Flag]}>
					PRONITES
				</div>
			</div>
			{Flag ? <Pronites /> : <EventsList events={events} />}
		</div>
	);
}

export default EventsPage;
