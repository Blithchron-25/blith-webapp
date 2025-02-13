import "./Banner.css";

const Banner = () => {
	return (
		<div className="banner">
			<div className="banner-content">
				<div className="banner-message">
					<div>
						<h2>Blithchron 2025</h2>
						<p>Please open this website on a mobile phone for using the app.</p>
					</div>
				</div>
				<div className="banner-image">
					<img src="/404-error.jpg" alt="Use mobile" />
				</div>
			</div>
		</div>
	);
};

export default Banner;
