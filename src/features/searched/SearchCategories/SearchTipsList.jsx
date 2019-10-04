import React, { Component } from 'react'
import EventListItem from '../../event/EventList/EventListItem'

class SearchTipsList extends Component {
    state = {
        category: 'tips'
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
export default SearchTipsList
