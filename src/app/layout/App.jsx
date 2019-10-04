//This file is responsible for making the rootes inside our app
import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import { Route, Switch } from 'react-router-dom'
import EventDashboard from '../../features/event/EventDashboard/EventDashboard'
import NavBar from '../../features/nav/NavBar/NavBar'
import EventForm from '../../features/event/EventForm/EventForm'
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard'
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage'
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard'
import EventDetailedPage from '../../features/event/EventDetailed/EventDetailedPage'
import HomePage from '../../features/home/HomePage'
import TestComponent from '../../features/testarea/TestComponent'
import ModalManager from '../../features/modals/ModalManager'
import { UserIsAuthenticated } from '../../features/auth/authWrapper'
import SearchDashboard from '../../features/searched/SearchDashboard/SearchDashboard'
import SearchForm from '../../features/searched/SearchForm/SearchForm'
import SearchDevelopmentDashboard from '../../features/searched/SearchCategories/SearchDevelopmentDashboard'
import SearchNewsDashboard from '../../features/searched/SearchCategories/SearchNewsDashboard'
import SearchTipsDashboard from '../../features/searched/SearchCategories/SearchTipsDashboard'
import SearchStoriessDashboard from '../../features/searched/SearchCategories/SearchStoriesDashboard'
import SearchInterestingDashboard from '../../features/searched/SearchCategories/SearchInterestingDashboard'
import SearchPhotoshootingDashboard from '../../features/searched/SearchCategories/SearchPhotoshootingDashboard'


class App extends Component {
  render() {
    return (
      <div>
        <ModalManager />
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
        <Route
          path="/(.+)"
          render={() => (
            <div>
              <NavBar />
              <Container className="main">
                <Switch>
                  <Route path="/events" component={EventDashboard} />
                  <Route path="/searches" component={SearchDashboard} />
                  <Route path="/search" component={SearchForm} />
                  <Route path="/development" component={SearchDevelopmentDashboard} />
                  <Route path="/news" component={SearchNewsDashboard} />
                  <Route path="/tips" component={SearchTipsDashboard} />
                  <Route path="/stories" component={SearchStoriessDashboard} />
                  <Route path="/interesting" component={SearchInterestingDashboard} />
                  <Route path="/photoshooting" component={SearchPhotoshootingDashboard} />
                  <Route path="/test" component={TestComponent} />
                  <Route path="/event/:id" component={EventDetailedPage} />
                  <Route
                    path="/manage/:id"
                    component={UserIsAuthenticated(EventForm)}
                  />
                  <Route
                    path="/people"
                    component={UserIsAuthenticated(PeopleDashboard)}
                  />
                  <Route
                    path="/profile/:id"
                    component={UserIsAuthenticated(UserDetailedPage)}
                  />
                  <Route
                    path="/settings"
                    component={UserIsAuthenticated(SettingsDashboard)}
                  />
                  <Route
                    path="/createEvent"
                    component={UserIsAuthenticated(EventForm)}
                  />
                </Switch>
              </Container>
            </div>
          )}
        />
      </div>
    )
  }
}

export default App
