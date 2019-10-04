import React from 'react'
import { Segment, Image, Item, Header, Button, Label, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const eventImageStyle = {
  filter: 'brightness(30%)'
}

const eventImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
}

const EventDetailedHeader = ({
  openModal,
  authenticated,
  loading,
  event,
  isHost,
  isGoing,
  goingToEvent,
  cancelGoingToEvent
}) => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${event.category}.jpg`}
          fluid
          style={eventImageStyle}
        />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={event.title}
                  style={{ color: 'white' }}
                />
                <p>
                  Δημιουργήθηκε από <strong>{event.hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment>
      {!isHost && (
        <div>
          {isGoing && !event.cancelled && (
            <Button animated='fade' onClick={() => cancelGoingToEvent(event)} color="teal">
              <Button.Content hidden>Δεν μου αρέσει</Button.Content>
              <Button.Content visible>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Icon name="thumbs down outline" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Button.Content>
            </Button>
          )}

          {!isGoing && authenticated && (
            <Button animated='fade' loading={loading} onClick={() => goingToEvent(event)} color="teal">
              <Button.Content hidden>Μου αρέσει</Button.Content>
              <Button.Content visible>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Icon name="like" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Button.Content>
            </Button>
          )}

          {!authenticated && !event.cancelled && (
          <Button animated='fade' loading={loading} onClick={() => openModal('UnauthModal')} color="teal">
              <Button.Content hidden>Μου αρέσει</Button.Content>
              <Button.Content visible>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Icon name="like" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Button.Content>
          </Button>
          )}

          {event.cancelled && !isHost && (
            <Label
              size="large"
              color="red"
              content="Το άρθρο έχει αποσυρθεί"
            />
          )}
        </div>
        )}

        {isHost && (
          <Button animated='fade' as={Link} to={`/manage/${event.id}`} color="teal">
            <Button.Content hidden>Επεξεργασία</Button.Content>
            <Button.Content visible>
              &nbsp; &nbsp;&nbsp;  <Icon name='compose' />&nbsp; &nbsp; &nbsp;
            </Button.Content>
          </Button>
        )}
      </Segment>
    </Segment.Group>
  )
}

export default EventDetailedHeader
