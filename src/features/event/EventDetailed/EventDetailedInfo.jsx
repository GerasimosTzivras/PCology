import React, { Component } from 'react'
import { Segment, Grid, Icon, Embed } from 'semantic-ui-react'


class EventDetailedInfo extends Component {
  state = {
    showMap: false
  }

  componentWillUnmount() {
    this.setState({
      showMap: false
    })
  }

  showMapToggle = () => {
    this.setState(prevState => ({
      showMap: !prevState.showMap
    }))
  }

  render() {
    const { event } = this.props
    return (
      <Segment.Group>
        <Segment attached="top">
          <Grid>
            <Grid.Column width={1}>
              <Icon size="large" color="teal" name="book" />
            </Grid.Column>
            <Grid.Column width={15}>
              {/*This line is specially made for converting html to text
                 formatted text to text
                 /////////////////////////////////////////////////////// */}
              <p dangerouslySetInnerHTML={{__html: event.description}} />
              {/*////////////////////////////////////////////////////////*/}
            </Grid.Column>
          </Grid>
          {event.video && (
               <Grid>
               <Grid.Column>
                  <Embed id={event.yturl} source='youtube' />
               </Grid.Column>
             </Grid>
              )}
          
        </Segment>
      </Segment.Group>
    )
  }
}

export default EventDetailedInfo
