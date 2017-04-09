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
			"div",
			null,
			"A way to filter the list of bugs would come here."
		);
	}
};

class BugRow extends React.Component {
	render() {
		console.log("Rendering BugRow:", this.props.bug);
		return React.createElement(
			"tr",
			null,
			React.createElement(
				"td",
				null,
				this.props.bug._id
			),
			React.createElement(
				"td",
				null,
				this.props.bug.status
			),
			React.createElement(
				"td",
				null,
				this.props.bug.priority
			),
			React.createElement(
				"td",
				null,
				this.props.bug.owner
			),
			React.createElement(
				"td",
				null,
				this.props.bug.title
			)
		);
	}
};

class BugTable extends React.Component {
	render() {
		var bugRows = this.props.bugs.map(bug => React.createElement(BugRow, { key: bug._id, bug: bug }));
		console.log("Rendering bug table, num items:", this.props.bugs.length);
		return React.createElement(
			"table",
			null,
			React.createElement(
				"thread",
				null,
				React.createElement(
					"tr",
					null,
					React.createElement(
						"th",
						null,
						"Id"
					),
					React.createElement(
						"th",
						null,
						"Status"
					),
					React.createElement(
						"th",
						null,
						"Priority"
					),
					React.createElement(
						"th",
						null,
						"Owner"
					),
					React.createElement(
						"th",
						null,
						"Title"
					)
				)
			),
			React.createElement(
				"tbody",
				null,
				bugRows
			)
		);
	}
};

class BugAdd extends React.Component {
	constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render() {
		console.log("Rendering BugAdd");
		return React.createElement(
			"form",
			{ name: "bugAdd" },
			React.createElement("input", { type: "text", name: "owner", placeholder: "Owner" }),
			React.createElement("input", { type: "text", name: "title", placeholder: "Title" }),
			React.createElement(
				"button",
				{ onClick: this.handleSubmit },
				" Add Bug "
			)
		);
	}

	handleSubmit(e) {
		e.preventDefault();
		let form = document.forms.bugAdd;
		this.props.addBug({ owner: form.owner.value, title: form.title.value, status: 'New', priority: 'P1' });
		form.owner.value = "";
		form.title.value = "";
	}
};

class BugList extends React.Component {
	constructor() {
		super();
		this.state = {
			bugs: []
		};
		this.addBug = this.addBug.bind(this);
	}

	componentDidMount() {
		$.ajax('/api/bugs').done(data => {
			this.setState({ bugs: data });
		});
	}
	// getInitialState: function () {
	// return {bugs:bugData};
	// },

	render() {
		console.log("Rendering bug list, num items:", this.state.bugs.length);
		return React.createElement(
			"div",
			null,
			React.createElement(
				"h1",
				null,
				"Bug Tracker"
			),
			React.createElement(BugFilter, null),
			React.createElement("hr", null),
			React.createElement(BugTable, { bugs: this.state.bugs }),
			React.createElement("hr", null),
			React.createElement(BugAdd, { addBug: this.addBug })
		);
	}

	addBug(bug) {
		console.log("Adding bug:", bug);

		bug.id = this.state.bugs.length + 1;
		$.ajax({
			type: 'POST', url: '/api/bugs', contentType: 'application/json',
			data: JSON.stringify(bug),
			success: data => {
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

ReactDOM.render(React.createElement(BugList, null), document.getElementById('main'));