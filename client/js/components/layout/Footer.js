import React from "react"
import HeartIcon from 'material-ui/svg-icons/action/favorite'

export default class Footer extends React.Component{

	render() {
		const iconStyle = {
			position: "relative",
			top: "2px"
		};

		return (
			<footer>Made with <HeartIcon color="red" style={{height: 16, width: 18, position: "relative", top: 3}}/> in Waterloo, ON</footer>
		);
	}
}
