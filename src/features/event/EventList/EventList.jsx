import React, { Component } from 'react'
import EventListItem from './EventListItem'

class EventList extends Component {
  render() {
    const { events, deleteEvent } = this.props
    return (
      <div>
        {events &&
          events
            .sort((a, b) => a.date < b.date)
            .map(event => (
              <EventListItem
                key={event.id}
                event={event}
                deleteEvent={deleteEvent}
              />
            ))}
      </div>
    )
  }
}
export default EventList
