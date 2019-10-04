import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { getEventsForDashboard } from '../../event/eventActions'
import SearchStoriesList from './SearchStoriesList'
//import EventActivity from '../EventActivity/EventActivity'

const mapState = state => ({
  events: state.firestore.ordered.events,
  activities: state.firestore.ordered.activity
})

const actions = {
  getEventsForDashboard
}

class SearchStoriesDashboard extends Component {
  state = {
    moreEvents: false,
    loadedEvents: [],
    contextRef: {}
  }

  async componentDidMount() {
    let next = await this.props.getEventsForDashboard()

    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true,
        loadingInitial: false
      })
    }
  }

  handleContextRef = contextRef => this.setState({ contextRef })

  render() {
    const { events } = this.props
    return (
      <Grid>
        <Grid.Column width={16}>
          <SearchStoriesList events={events} />
        </Grid.Column>
      </Grid>
    )
  }
}
export default connect(
  mapState,
  actions
)(
  firestoreConnect([{ collection: 'events' }, { collection: 'activity' }])(
    SearchStoriesDashboard
  )
)
