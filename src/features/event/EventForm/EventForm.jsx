//This file is responsible for the edit section of the event
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { withFirestore } from 'react-redux-firebase'
import * as ReactQuill from 'react-quill'
import { Segment, Form, Button, Grid, Header, Image, Icon } from 'semantic-ui-react'
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from 'revalidate'
import { createEvent, updateEvent, cancelToggle, deleteEvent } from '../eventActions'
import TextInput from '../../../app/common/form/TextInput'
import TextArea from '../../../app/common/form/TextArea'
import SelectInput from '../../../app/common/form/SelectInput'
import RadioInput from '../../../app/common/form/RadioInput'

import logo from '../../../myphoto/pic4.gif'

const mapState = (state, ownProps) => {
  let event = {}

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0]
  }

  return {
    initialValues: event,
    event,
    loading: state.async.loading
  }
}

const actions = {
  createEvent,
  updateEvent,
  deleteEvent,
  cancelToggle
}

const category = [
  { key: 'development', text: 'Development', value: 'development' },
  { key: 'photoshooting', text: 'Photoshooting', value: 'photoshooting' },
  { key: 'interesting', text: 'Interesting', value: 'interesting' },
  { key: 'tips', text: 'Tips', value: 'tips' },
  { key: 'news', text: 'News', value: 'news' },
  { key: 'stories', text: 'Stories', value: 'stories' }
]

const validate = combineValidators({
  title: isRequired({ message: 'Ο τίτλος του άρθρου είναι απαραίτητος' }),
  category: isRequired({ message: 'Παρακαλώ επιλέξτε μια κατηγορία' }),
  description: composeValidators(
    isRequired({ message: 'Παρακαλώ προσθέστε το κείμενο του άρθρου' }),
    hasLengthGreaterThan(4)({
      message: 'Θα πρέπει το άρθρο να είναι μεγαλύτερο από 5 χαρακτήρες'
    })
  )()
})

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false,
    texting:'',
    
  }
  handleChange = this.handleChange.bind(this)
 

  async componentDidMount() {
    const { firestore, match } = this.props
    await firestore.setListener(`events/${match.params.id}`)
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props
    await firestore.unsetListener(`events/${match.params.id}`)
  }

  handleScriptLoaded = () => this.setState({ scriptLoaded: true })

  onFormSubmit = values => {
    values.venueLatLng = this.state.venueLatLng
    values.description = this.state.texting
    if (this.props.initialValues.id) {
      if (Object.keys(values.venueLatLng).length === 0) {
        values.venueLatLng = this.props.event.venueLatLng
      }
      this.props.updateEvent(values)
      this.props.history.goBack()
    } else {
      this.props.createEvent(values)
      this.props.history.push('/events')
    }
  }
 handleChange(value) {
    this.setState({ texting: value })
 
  }
  render() {
    const {
      invalid,
      submitting,
      pristine,
      event,
      cancelToggle,
      loading
    } = this.props
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Λεπτομερειες αρθρου" />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                name="title"
                type="text"
                component={TextInput}
                placeholder="Τίτλος άρθρου"
              />
              <Field
                name="category"
                type="text"
                component={SelectInput}
                options={category}
                placeholder="Σε ποιά κατηγορία ανήκει"
              />
              {/* 
              <Field
                name="description"
                type="txt"
                component={TextArea}
                rows={3}
                placeholder="Κύριο μέρος του άρθρου"
                
              />
            */}
               <ReactQuill value={this.state.texting} onChange={this.handleChange}  placeholder="Κύριο μέρος του άρθρου" 
                 />
                <br />
                <Form.Group inline>
                  <label>Youtube video: </label>
                  <Field
                    name="video"
                    type="radio"
                    value="video"
                    label="Ναι"
                    component={RadioInput}
                  />
                  <Field
                    name="video"
                    type="radio"
                    value=""
                    label="Όχι"
                    component={RadioInput}
                  />
                </Form.Group>
                <Field
                name="yturl"
                type="text"
                component={TextInput}
                placeholder="Url βίντεο χωρίς το https://www.youtube.com/watch?v="
                />
                <br/>
                <Button animated='fade'  loading={loading}
                //disabled={invalid || submitting || pristine}
                primary
                type="submit"
               >
                <Button.Content hidden>Δημοσίευση</Button.Content>
                <Button.Content visible>
                &nbsp; &nbsp;&nbsp;  <Icon name='checkmark' />&nbsp; &nbsp; &nbsp; 
                </Button.Content>
              </Button>
              <Button animated='fade' disabled={loading} onClick={this.props.history.goBack}>
                <Button.Content hidden>Ακύρωση</Button.Content>
                <Button.Content visible>
                &nbsp; &nbsp; &nbsp;  <Icon name='cancel' />&nbsp; &nbsp; &nbsp; 
                </Button.Content>
              </Button>
              {event.id && (
                <Button animated='fade' onClick={() => deleteEvent(event.id)} floated="right" color="red" inverted>
                  <Button.Content hidden>Διαγραφή</Button.Content>
                  <Button.Content visible>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Icon name='trash' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                  </Button.Content>
                </Button>
              )}{event.id && (
                <Button
                  onClick={() => cancelToggle(!event.cancelled, event.id)}
                  type="button"
                  color={event.cancelled ? 'teal' : 'red'}
                  floated="right"
                  content={
                    event.cancelled ? 'Επανεργοποίηση' : 'Απενεργοποίηση'
                  }
              />)}
              
            </Form>
          </Segment>
        </Grid.Column>
        <Grid.Column width={10}>
          <Image src={logo} />
        </Grid.Column>
      </Grid>
    )
  }
}

export default withFirestore(
  connect(
    mapState,
    actions
  )(
    reduxForm({ form: 'eventForm', enableReinitialize: true, validate })(
      EventForm
    )
  )
)
