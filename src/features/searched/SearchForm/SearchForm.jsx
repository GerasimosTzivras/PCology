import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { withFirestore } from "react-redux-firebase";
import { Segment, Form, Grid, Header } from "semantic-ui-react";
import { combineValidators, isRequired } from "revalidate";
//import SelectInput from '../../../app/common/form/SelectInput'

const validate = combineValidators({
  category: isRequired({ message: "Παρακαλώ επιλέξτε μια κατηγορία" }),
});

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "development" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <Grid>
        <Grid.Column>
          <Segment>
            <Header sub color="teal" content="Επιλογη κατηγοριας" />
            <Form onSubmit={this.handleSubmit}>
              <select
                value={this.state.value}
                onChange={this.handleChange}
                placeholder="Παρακαλώ επιλέξτε κατηγορία"
              >
                <option value="development">Development</option>
                <option value="photoshooting">Photoshooting</option>
                <option value="interesting">Interesting</option>
                <option value="tips">Tips</option>
                <option value="news">News</option>
                <option value="stories">Stories</option>
              </select>
              <input type="submit" value="Submit" />
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withFirestore(
  reduxForm({ form: "eventForm", enableReinitialize: true, validate })(
    SearchForm
  )
);
