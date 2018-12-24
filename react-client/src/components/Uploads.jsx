import React from 'react';
import { Button } from 'semantic-ui-react';

const Uploads = ({ isLoggedIn }) => {

	if (isLoggedIn) {
		return (
			<div>
				<Button content="Submit a Recipe"/>
			</div>
		)
	}

}

export default Uploads;