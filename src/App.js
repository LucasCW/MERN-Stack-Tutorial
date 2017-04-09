// var BugList = React.createClass({
// 	render() {
// 		return (
// 			<div>
// 				The bug list would come here.
// 			</div>
// 		)
// 	}
// });
class BugFilter extends React.Component{
	render() {
		return (
			<div>
				A way to filter the list of bugs would come here.
			</div>
		)
	}
};

class BugTable extends React.Component{
	render() {
		return (
			<div>
				The list of bugs as a table would come here.
			</div>
		)
	}
};

class BugAdd extends React.Component{
	render() {
		return (
			<div>
				A form to add a new bug would come here.
			</div>
		)
	}
};


class BugList extends React.Component{
	render() {
		return (
			<div>
				<h1>Bug Tracker</h1>
				<BugFilter />
				<hr />
				<BugTable />
				<hr />
				<BugAdd />
			</div>
		)
	}
};

ReactDOM.render(
	<BugList />,
	document.getElementById('main')
);