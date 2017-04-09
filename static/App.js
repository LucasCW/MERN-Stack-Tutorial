// var BugList = React.createClass({
// 	render() {
// 		return (
// 			<div>
// 				The bug list would come here.
// 			</div>
// 		)
// 	}
// });
class BugFilter extends React.Component {
	render() {
		return React.createElement(
			'div',
			null,
			'A way to filter the list of bugs would come here.'
		);
	}
};

class BugTable extends React.Component {
	render() {
		return React.createElement(
			'div',
			null,
			'The list of bugs as a table would come here.'
		);
	}
};

class BugAdd extends React.Component {
	render() {
		return React.createElement(
			'div',
			null,
			'A form to add a new bug would come here.'
		);
	}
};

class BugList extends React.Component {
	render() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'h1',
				null,
				'Bug Tracker'
			),
			React.createElement(BugFilter, null),
			React.createElement('hr', null),
			React.createElement(BugTable, null),
			React.createElement('hr', null),
			React.createElement(BugAdd, null)
		);
	}
};

ReactDOM.render(React.createElement(BugList, null), document.getElementById('main'));