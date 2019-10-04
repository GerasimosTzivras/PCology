//This page is responsible for the first page that user see when he types the site
import React from 'react'
import {Item} from 'semantic-ui-react'
import who from '../../myphoto/who.jpg'
import target from '../../myphoto/target.png'
import contact from '../../myphoto/contact.jpg'

const HomePage = ({ history }) => {
  return (
    <div>
      <div className="ui inverted vertical masthead center aligned segment">
        <div className="ui text container">
          <h1 className="ui inverted stackable header">
            <img
              className="ui image massive"
              src="/assets/logo.png"
              alt="logo"
            />
            <div className="content">PCology</div>
          </h1>
          <h2 className="ccontent">Η "επιστημονική" πλευρά των υπολογιστών</h2>
          <div
            onClick={() => history.push('/events')}
            className="ui huge white inverted button"
          >
            Ξεκινάμε
            <i className="right arrow icon" />
          </div>
        </div>
      </div>
  {/*This line is responsible for stepper 
    import HorizontalNonLinearAlternativeLabelStepper from './Steps'
    ////////////////////////////////////////////
      <HorizontalNonLinearAlternativeLabelStepper />*/}
      <div>
      <br/>
        <Item.Group>
          <Item>
            <Item.Image size='medium' src={who} />
            <Item.Content>
              <Item.Header as='a'>Ποιοί είμαστε</Item.Header>
              <Item.Description>
                Είμαστε μια ομάδα ατόμων που μας ενώνει η αγάπη μας για την
                τεχνολογία και η διαρκής αναζήτηση πληροφοριών και γνώσεων
                για το αντικείμενο που λατρεύουμε. Θέλουμε να μοιραστούμε με
                τους άλλους τις υπάρχουσες γνώσεις μας αλλά και να
                αποκτήσουμε καινούργιες μέσα από το pcology.
              </Item.Description>
            </Item.Content>
          </Item>
          <br/>
          <div class="ui divider" />
          <br/>
          <Item>
            <Item.Image size='medium' src={target} />
            <Item.Content>
              <Item.Header as='a'>Ο στόχος μας</Item.Header>
              <Item.Description>
                Στόχος μας είναι η δημιουργία μιας κοινότητας με κοινά
                ενδιαφέροντα, όπου ο καθένας θα μπορεί να δημοσιεύει το δικό
                του άρθρο, να σχολιάζει άρθρα άλλων, να δηλώνει αν του
                αρέσει το άρθρο που διαβάζεις και να ακολουθεί τους
                αγαπημένους του συντάκτες.
              </Item.Description>
            </Item.Content>
          </Item>
          <br/>
          <div class="ui divider" />
          <br/>
          <Item>
            <Item.Image size='medium' src={contact} />
            <Item.Content>
            <Item.Header as='a'>Επικοινωνία</Item.Header>
            <Item.Description>
              Επικοινωνήστε μαζί μας για οποιοδήποτε πρόβλημα και αν
              αντιμετωπίζετε, αλλά και ιδεές για βελτίωση του pcology.gr{' '}
              <a href="mailto:vg.appsolution@gmail.com">
                vg.appsolution@gmail.com
              </a>{' '}
            </Item.Description>
            </Item.Content>
          </Item>
          <br/>
        </Item.Group>
      </div>
    </div>
    
  )
}
export default HomePage
