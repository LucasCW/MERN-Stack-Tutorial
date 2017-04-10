var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var BugFilter = require('./BugFilter');
var BugAdd = require('./BugAdd');

class BugRow extends React.Component {
	render() {
		console.log("Rendering BugRow:", this.props.bug);
		return (
			<tr>
				<td>{this.props.bug._id}</td>
				<td>{this.props.bug.status}</td>
				<td>{this.props.bug.priority}</td>
				<td>{this.props.bug.owner}</td>
				<td>{this.props.bug.title}</td>
			</tr>
		)
	}
};

class BugTable extends React.Component{
	render() {
		var bugRows = this.props.bugs.map(bug => <BugRow key={bug._id} bug={bug} />)
		console.log("Rendering bug table, num items:", this.props.bugs.length);
		return (
			<table>
				<thead>
					<tr>
						<th>Id</th>
						<th>Status</th>
						<th>Priority</th>
						<th>Owner</th>
						<th>Title</th>
					</tr>
				</thead>
				<tbody>
					{bugRows}
				</tbody>
			</table>
		)
	}
};


class BugList extends React.Component{
	constructor() {
		super();
		this.state = {
			bugs: []
		};
		this.addBug = this.addBug.bind(this);
		this.loadData = this.loadData.bind(this);
	}

	componentDidMount() {
		this.loadData({priority: "P1", status: "New"});
		console.log('hahahhaah');
	}

	loadData(filter) {
		$.ajax('/api/bugs', {data: filter}).done((data) => {
			this.setState({ bugs:data });
		});
	}
	// getInitialState: function () {
		// return {bugs:bugData};
	// },

	render() {
		console.log("Rendering bug list, num items:", this.state.bugs.length);
		return (
			<div>
				<h1>Bug Tracker</h1>
				<BugFilter submitHandler={this.loadData}/>
				<hr />
				<BugTable bugs={this.state.bugs}/>
				<hr />
				<BugAdd addBug={this.addBug}/>
			</div>
		)
	}

	addBug(bug) {
		console.log("Adding bug:", bug);

		bug.id = this.state.bugs.length + 1;
		$.ajax({
			type: 'POST', url: '/api/bugs', contentType: 'application/json',
			data: JSON.stringify(bug),
			success: (data) => {
				var bug = data;
				var bugsModified = this.state.bugs.concat(bug);
				this.setState({ bugs: bugsModified });
			},
			error: (xhr, status, err) => {
				console.log("Error adding bug:", err);
			}
		});
	}

};

module.exports = BugList;