import React from 'react';
import { Button } from 'semantic-ui-react';

const Uploads = ({ isLoggedIn }) => {

	if (isLoggedIn) {
		return (
			<div>
				You have been directed to the uploads page
			</div>
		)
	}

}

export default Uploads;