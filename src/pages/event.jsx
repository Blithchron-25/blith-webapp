import React from 'react';
import './stylesheets/event.css';
import { BrowserRouter as Router, Link, useLocation } from 'react-router-dom';

function useQuery() {
	const { search } = useLocation();
	return React.useMemo(() => new URLSearchParams(search), [search]);
}

const events = {
	Panache: {
		name: 'Panache',
		description:
			"Fashion is a way of expressing an inner truth or belief about an idea, oneself, or the world through the medium of clothing. Blithchron's Panache promises to perfectly embody this idea with incredible concept ramp walk performances by participants from colleges around the country making it one of the most theatrical and crowd-pleasing shows.",
		rulebook: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
		register: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
	},
	Synchronize: {
		name: 'Synchronize',
		description:
			'Sync Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae debitis dolor repellat aspernatur maxime expedita adipisci tempora? Consequatur, unde ullam vero beatae reprehenderit, eveniet atque distinctio, nostrum quibusdam numquam accusamus! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae debitis dolor repellat aspernatur.',
		rulebook: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
		register: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
	},
	String_Theory: {
		name: 'String Theory',
		description:
			'String Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae debitis dolor repellat aspernatur maxime expedita adipisci tempora? Consequatur, unde ullam vero beatae reprehenderit, eveniet atque distinctio, nostrum quibusdam numquam accusamus! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae debitis dolor repellat aspernatur.',
		rulebook: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
		register: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
	},
};

function EventPage() {
	let query = useQuery();
	const eventname = query.get('eventname');
	//fetch object of eventname from firebase here
	const event = events[eventname];

	return (
		<div className="container">
			<div className="event-img-cont">
				<img className="event-img" src={`${event.name}.jpg`} alt="" />
			</div>
			<h1 className="event-name">{event.name}</h1>
			<p className="event-des">{event.description}</p>
			<div className="bottom">
				<a href={event.rulebook}>
					<div className="rulebook">
						<h2>Rulebook</h2>
					</div>
				</a>
				<a href={event.register}>
					<div className="register">
						<h2>Register</h2>
					</div>
				</a>
			</div>
		</div>
	);
}

export default EventPage;
