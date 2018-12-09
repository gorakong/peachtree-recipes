import React from 'react';

const Uploads = ({ isLoggedIn }) => {

	if (isLoggedIn) {
		return (
			<div>
				Uploads component
			</div>
		)
	}

}

export default Uploads;