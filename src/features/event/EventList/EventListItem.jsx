//This file is responsible for the list of events that are shown
import React, { Component } from 'react'
import { Segment, Item, Button, Label, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
//import EventListAttendee from './EventListAttendee'
//import format from 'date-fns/format'
//import { objectToArray } from '../../../app/common/util/helpers'

class EventListItem extends Component {
  render() {
    const { event } = this.props
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              {/*<Item.Image size="tiny" circular src={event.hostPhotoURL} />*/}
              <Item.Image size="tiny" src={`/assets/categoryImages/${event.category}.jpg`} />
              <Item.Content>
                <Item.Header as={Link} to={`/event/${event.id}`}>
                  {event.title}
                </Item.Header>
                <Item.Description>

                </Item.Description>
                {/* 
                <Item.Description>
                  Δημοσιοποιήθηκε από{' '}
                  <Link to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link>
                </Item.Description>
                */}
                {event.cancelled && (
                  <Label
                    style={{ top: '-40px' }}
                    ribbon="right"
                    color="red"
                    content="Το άρθρο έχει αποσυρθεί"
                  />
                )}
               {event.cancelled ? (
                <Button disabled animated as={Link} to={`/event/${event.id}`} color="teal" floated="right" >
                  <Button.Content hidden>Προβολή</Button.Content>
                  <Button.Content visible>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Icon name='folder open outline ' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                    </Button.Content>
                </Button>
                ) : (
                <Button animated as={Link} to={`/event/${event.id}`} color="teal" floated="right" >
                  <Button.Content hidden>Προβολή</Button.Content>
                  <Button.Content visible>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Icon name='folder open outline ' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                  </Button.Content>
                </Button>
                )
               }    
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        {/* 
        <Segment clearing>
          {event.cancelled ? (
           <Button disabled animated as={Link} to={`/event/${event.id}`} color="teal" floated="right" >
           <Button.Content hidden>Προβολή</Button.Content>
           <Button.Content visible>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Icon name='folder open outline ' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
           </Button.Content>
         </Button>
          ) : (
            <Button animated as={Link} to={`/event/${event.id}`} color="teal" floated="right" >
              <Button.Content hidden>Προβολή</Button.Content>
              <Button.Content visible>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Icon name='folder open outline ' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
              </Button.Content>
            </Button>
            
          )}
        </Segment>*/}
      </Segment.Group>
    )
  }
}

export default EventListItem
