//This file is responsible for the settings menu that a user can choose
import React from 'react'
import { Grid, Menu, Header, Image } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import logo from '../../../myphoto/pic9.gif'

const SettingsNav = () => {
  return (
    <Grid.Column width={4}>
      <Menu vertical>
        <Header
          icon="user"
          attached
          inverted
          color="teal"
          content="Το προφίλ μου"
        />
        <Menu.Item as={NavLink} to="/settings/basic">
          Βασικά στοιχεία
        </Menu.Item>
        <Menu.Item as={NavLink} to="/settings/about">
          Σχετικά με εμένα
        </Menu.Item>
        <Menu.Item as={NavLink} to="/settings/photos">
          Οι φωτογραφίες μου
        </Menu.Item>
      </Menu>
      <Menu vertical>
        <Menu.Item>
          <Image src={logo} />
        </Menu.Item>
      </Menu>
      <Grid.Row />
      <Menu vertical>
        <Header
          icon="settings"
          attached
          inverted
          color="teal"
          content="Ρυθμίσεις λογαριασμού"
        />
        <Menu.Item as={NavLink} to="/settings/account">
          Αλλαγή κωδικού
        </Menu.Item>
      </Menu>
    </Grid.Column>
  )
}

export default SettingsNav
