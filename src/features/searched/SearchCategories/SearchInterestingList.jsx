import React, { Component } from 'react'
import EventListItem from '../../event/EventList/EventListItem'

class SearchInterestingList extends Component {
    state = {
        category: 'interesting'
    }
  render() {
    const { events, deleteEvent } = this.props
    return (
      <div>
        {events &&
          events
            .sort((a, b) => a.date < b.date)
            .map(event => (
                <React.Fragment>
                {event.category === this.state.category && (
              <EventListItem
                key={event.id}
                event={event}
                deleteEvent={deleteEvent}
              />
              )}
              </React.Fragment>
            ))}
      </div>
    )
  }
}
export default SearchInterestingList
