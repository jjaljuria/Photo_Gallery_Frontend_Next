import React from 'react'
import {Logout as logoutService} from '../Services/LoginService';

export default function Logout() {
	return (
		<div>
			<button className="btn btn-secondary" onClick={()=> logoutService()}>Log out</button>
		</div>
	)
}
