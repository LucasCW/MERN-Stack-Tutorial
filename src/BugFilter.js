var React = require('react');
var ReactDOM = require('react-dom');

class BugFilter extends React.Component{
	render() {
		console.log("Rendering BugFilter");
		return (
			<div>
				A way to filter the list of bugs would come here.
			</div>
		)
	}
};

module.exports = BugFilter;