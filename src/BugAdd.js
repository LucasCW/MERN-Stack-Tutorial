var React = require('react');
var ReactDOM = require('react-dom');

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

module.exports = BugAdd;