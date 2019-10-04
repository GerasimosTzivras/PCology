/*The following file is responsible for the follow / unfollow section at a user's
  page, and the edit page for the user that is signed in */
import React from 'react'
import { Button, Grid, Segment, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const UserDetailedSidebar = ({
  isCurrentUser,
  followUser,
  profile,
  isFollowing,
  unfollowUser
}) => {
  return (
    <Grid.Column width={4}>
      <Segment>
        {isCurrentUser && (
          <Button animated="fade" as={Link} to="/settings" color="teal" fluid >
            <Button.Content visible>Επεξεργασία προφίλ</Button.Content>
            <Button.Content hidden>
            &nbsp;&nbsp;&nbsp;<Icon name='write' />&nbsp;&nbsp;&nbsp; 
            </Button.Content>
          </Button>
        )}
        {!isCurrentUser && !isFollowing && (
          <Button animated="fade" onClick={() => followUser(profile)} color="teal" fluid >
            <Button.Content hidden>Ακολούθηση</Button.Content>
            <Button.Content visible>
            &nbsp;&nbsp;&nbsp;<Icon name='handshake' />&nbsp;&nbsp;&nbsp; 
            </Button.Content>
          </Button>
        )}
        {!isCurrentUser && isFollowing && (
          <Button animated="fade" onClick={() => unfollowUser(profile)} color="teal" fluid >
            <Button.Content hidden>Άρση ακολούθησης</Button.Content>
            <Button.Content visible>
            &nbsp;&nbsp;&nbsp;<Icon name='ban' />&nbsp;&nbsp;&nbsp; 
            </Button.Content>
          </Button>
        )}
      </Segment>
    </Grid.Column>
  )
}

export default UserDetailedSidebar
