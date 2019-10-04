//This file is responsible for the main menu , 
//except everything that it has to do with the user
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFirebase } from 'react-redux-firebase'
import { Menu, Container, Button, Icon, Dropdown  } from 'semantic-ui-react'
import { NavLink, Link, withRouter } from 'react-router-dom'
import SignedOutMenu from '../Menus/SignedOutMenu'
import SignedInMenu from '../Menus/SignedInMenu'
import { openModal } from '../../modals/modalActions'

const actions = {
  openModal
}

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
})

class NavBar extends Component {
  handleSignIn = () => {
    this.props.openModal('LoginModal')
  }

  handleRegister = () => {
    this.props.openModal('RegisterModal')
  }

  handleSignOut = () => {
    this.props.firebase.logout()
    this.props.history.push('/')
  }

  render() {
    const { auth, profile } = this.props
    const authenticated = auth.isLoaded && !auth.isEmpty
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={Link} to="/" header>
            <img src="/assets/logo.png" alt="logo" />
            PCology
          </Menu.Item>
          <Menu.Item as={NavLink} to="/events" name="Άρθρα" />
          <Menu.Item as={NavLink} to="/searches" name="Κατηγορίες" />
          <Dropdown item>
            <Dropdown.Menu floating>
              <Menu.Item as={NavLink} to="/development" name="Development" />
              <Menu.Item as={NavLink} to="/photoshooting" name="Photoshooting" />
              <Menu.Item as={NavLink} to="/tips" name="Tips" />
              <Menu.Item as={NavLink} to="/interesting" name="Interesting" />
              <Menu.Item as={NavLink} to="/stories" name="Stories" />
              <Menu.Item as={NavLink} to="/news" name="News" />
            </Dropdown.Menu>
          </Dropdown>
          {authenticated && (
            <Menu.Item as={NavLink} to="/people" name="Κοινότητα" />
          )}
          {authenticated && (
            <Menu.Item>
              <Button animated='fade' as={Link} to="/createEvent" floated="right" color="#150734" inverted>
                <Button.Content hidden>Δημιουργία</Button.Content>
                <Button.Content visible>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Icon name='compose' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                </Button.Content>
              </Button>
            </Menu.Item>
          )}
          {authenticated ? (
            <SignedInMenu
              auth={auth}
              profile={profile}
              signOut={this.handleSignOut}
            />
          ) : (
            <SignedOutMenu
              register={this.handleRegister}
              signIn={this.handleSignIn}
            />
          )}
        </Container>
      </Menu>
    )
  }
}

export default withRouter(
  withFirebase(
    connect(
      mapState,
      actions
    )(NavBar)
  )
)
