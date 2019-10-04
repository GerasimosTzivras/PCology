import React, { Component } from 'react'
import EventListItem from '../../event/EventList/EventListItem'

class SearchNewsList extends Component {
    state = {
        category: 'news'
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
export default SearchNewsList
