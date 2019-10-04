import React, { Component } from 'react'
import { Card, Image, Header, Segment, Item } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { getEventsForDashboard } from '../../event/eventActions'
import { Link } from 'react-router-dom'

const mapState = state => ({
  events: state.firestore.ordered.events,
  activities: state.firestore.ordered.activity
})

const actions = {
  getEventsForDashboard
}

class SearchedDashboard extends Component {
  state = {
    moreEvents: false,
    loadedEvents: [],
    contextRef: {},
    categorytips: 'tips',
    categorydev: 'development',
    categorynews: 'news',
    categoryint: 'interesting',
    categoryphoto: 'photoshooting',
    categorystor: 'stories'
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
      <React.Fragment>
        <Segment.Group>
          <Segment>    
            <Item.Header as="h1">Κατηγορία: Development</Item.Header>   
          </Segment>
          <Segment>
            <Card.Group itemsPerRow={5}>
              {events &&
                events.map(event => (
                  <React.Fragment>
                    {event.category === this.state.categorydev && (
                      <Card as={Link} to={`/event/${event.id}`} key={event.id}>
                        <Image
                          src={`/assets/categoryImages/${event.category}.jpg`}
                        />
                        <Card.Content>
                          <Card.Header textAlign="center">
                            {event.title}
                          </Card.Header>
                        </Card.Content>
                      </Card>
                    )}
                  </React.Fragment>
                ))}
            </Card.Group>
          </Segment>
        </Segment.Group>
        <Segment.Group>
          <Segment>
            <Item.Header as="h1">Κατηγορία: Photoshooting</Item.Header>
          </Segment>
          <Segment>
            <Card.Group itemsPerRow={5}>
              {events &&
                events.map(event => (
                  <React.Fragment>
                    {event.category === this.state.categoryphoto && (
                      <Card as={Link} to={`/event/${event.id}`} key={event.id}>
                        <Image
                          src={`/assets/categoryImages/${event.category}.jpg`}
                        />
                        <Card.Content>
                          <Card.Header textAlign="center">
                            {event.title}
                          </Card.Header>
                        </Card.Content>
                      </Card>
                    )}
                  </React.Fragment>
                ))}
            </Card.Group>
          </Segment>
        </Segment.Group>
        <Segment.Group>
          <Segment>
            <Item.Header as="h1">Κατηγορία: Tips</Item.Header>
          </Segment>
          <Segment>
            <Card.Group itemsPerRow={5}>
              {events &&
                events.map(event => (
                  <React.Fragment>
                    {event.category === this.state.categorytips && (
                      <Card as={Link} to={`/event/${event.id}`} key={event.id}>
                        <Image
                          src={`/assets/categoryImages/${event.category}.jpg`}
                        />
                        <Card.Content>
                          <Card.Header textAlign="center">
                            {event.title}
                          </Card.Header>
                        </Card.Content>
                      </Card>
                    )}
                  </React.Fragment>
                ))}
            </Card.Group>
        </Segment>
        </Segment.Group>
        <Segment.Group>
          <Segment>
            <Item.Header as="h1">Κατηγορία: Interesting</Item.Header>
          </Segment> 
          <Segment> 
            <Card.Group itemsPerRow={5}>
              {events &&
                events.map(event => (
                  <React.Fragment>
                    {event.category === this.state.categoryint && (
                      <Card as={Link} to={`/event/${event.id}`} key={event.id}>
                        <Image
                          src={`/assets/categoryImages/${event.category}.jpg`}
                        />
                        <Card.Content>
                          <Card.Header textAlign="center">
                            {event.title}
                          </Card.Header>
                        </Card.Content>
                      </Card>
                    )}
                  </React.Fragment>
                ))}
            </Card.Group>
          </Segment>
        </Segment.Group>
        <Segment.Group>
          <Segment>
            <Item.Header as="h1">Κατηγορία: Stories</Item.Header>
          </Segment>
         <Segment>
           <Card.Group itemsPerRow={5}>
            {events &&
              events.map(event => (
                <React.Fragment>
                  {event.category === this.state.categorystor && (
                    <Card as={Link} to={`/event/${event.id}`} key={event.id}>
                      <Image
                        src={`/assets/categoryImages/${event.category}.jpg`}
                      />
                      <Card.Content>
                        <Card.Header textAlign="center">
                          {event.title}
                        </Card.Header>
                      </Card.Content>
                    </Card>
                  )}
                </React.Fragment>
              ))}
            </Card.Group>
          </Segment>
        </Segment.Group>
        <Segment.Group>
          <Segment>
            <Item.Header as="h1">Κατηγορία: News</Item.Header>          
          </Segment>
          <Segment>         
            <Card.Group itemsPerRow={5}>
              {events &&
                events.map(event => (
                  <React.Fragment>
                    {event.category === this.state.categorynews && (
                      <Card as={Link} to={`/event/${event.id}`} key={event.id}>
                        <Image
                          src={`/assets/categoryImages/${event.category}.jpg`}
                        />
                        <Card.Content>
                          <Card.Header textAlign="center">
                            {event.title}
                          </Card.Header>
                        </Card.Content>
                      </Card>
                    )}
                  </React.Fragment>
                ))}
            </Card.Group>
          </Segment> 
        </Segment.Group>
      </React.Fragment>
    )
  }
}

export default connect(
  mapState,
  actions
)(
  firestoreConnect([{ collection: 'events' }, { collection: 'activity' }])(
    SearchedDashboard
  )
)
