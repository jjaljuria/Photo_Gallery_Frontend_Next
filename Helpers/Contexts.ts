import React from 'react';

export const LogIn = React.createContext({ loggedIn: false });
export const CheckedsHandler = React.createContext({
	checked: (id: string) => { },
	unchecked: (id: string) => { }
});