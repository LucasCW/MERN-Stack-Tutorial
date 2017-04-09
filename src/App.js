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
				<thread>
					<tr>
						<th>Id</th>
						<th>Status</th>
						<th>Priority</th>
						<th>Owner</th>
						<th>Title</th>
					</tr>
				</thread>
				<tbody>
					{bugRows}
				</tbody>
			</table>
		)
	}
};

class BugAdd extends React.Component{
	constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render() {
		console.log("Rendering BugAdd");
		return (
			<form name="bugAdd">
				<input type="text" name="owner" placeholder="Owner" />
				<input type="text" name="title" placeholder="Title" />
				<button onClick={ this.handleSubmit }> Add Bug </button>
			</form>
		)
	}

	handleSubmit(e) {
		e.preventDefault();
		let form = document.forms.bugAdd;
		this.props.addBug({owner: form.owner.value, title: form.title.value, status: 'New', priority: 'P1'});
		form.owner.value = "";
		form.title.value = "";
	}
};

class BugList extends React.Component{
	constructor() {
		super();
		this.state = {
			bugs: []
		};
		this.addBug = this.addBug.bind(this);
	}

	componentDidMount() {
		$.ajax('/api/bugs').done((data) => {
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
				<BugFilter />
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

function addBug() {
	console.log("add bug");
}

ReactDOM.render(
	<BugList />,
	document.getElementById('main')
);