//This file is responsible for the photos that a user can upload
//accessible with: ../profile/photos
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import {
  Image,
  Segment,
  Header,
  Divider,
  Grid,
  Button,
  Card,
  Icon
} from 'semantic-ui-react'
import { toastr } from 'react-redux-toastr'
import Dropzone from 'react-dropzone'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { uploadProfileImage, deletePhoto, setMainPhoto } from '../userActions'

const query = ({ auth }) => {
  return [
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{ collection: 'photos' }],
      storeAs: 'photos'
    }
  ]
}

const actions = {
  uploadProfileImage,
  deletePhoto,
  setMainPhoto
}

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  photos: state.firestore.ordered.photos,
  loading: state.async.loading
})

class PhotosPage extends Component {
  state = {
    files: [],
    fileName: '',
    cropResult: null,
    image: {}
  }

  cancelCrop = () => {
    this.setState({
      files: [],
      image: {}
    })
  }

  uploadImage = async () => {
    try {
      await this.props.uploadProfileImage(this.state.image, this.state.fileName)
      this.cancelCrop()
      toastr.success('Έγινε', 'Η φωτογράφια σας ανέβηκε')
    } catch (error) {
      toastr.error('Ωχ', error.message)
    }
  }

  handlePhotoDelete = photo => async () => {
    try {
      this.props.deletePhoto(photo)
    } catch (error) {
      toastr.error('Ωχ', error.message)
    }
  }

  handleSetMainPhoto = photo => async () => {
    try {
      await this.props.setMainPhoto(photo)
    } catch (error) {
      toastr.error('Ωχ', error.message)
    }
  }

  cropImage = () => {
    if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
      return
    }

    this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      let imageUrl = URL.createObjectURL(blob)
      this.setState({
        cropResult: imageUrl,
        image: blob
      })
    }, 'image/jpeg')
  }

  onDrop = files => {
    this.setState({
      files,
      fileName: files[0].name
    })
  }

  render() {
    const { photos, profile, loading } = this.props
    let filteredPhotos
    if (photos) {
      filteredPhotos = photos.filter(photo => {
        return photo.url !== profile.photoURL
      })
    }
    return (
      <Segment>
        <Header dividing size="large" content="Οι φωτογραφίες μου" />
        <Grid>
          <Grid.Row />
          <Grid.Column width={4}>
            <Header color="teal" secondary content="Επιλογή" />
            <Dropzone onDrop={this.onDrop} multiple={false}>
              <div style={{ paddingTop: '30px', textAlign: 'center' }}>
                <Icon name="upload" size="huge" />
                <Header content="Κλίκ εδώ ή drag'n'drop" />
              </div>
            </Dropzone>
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header color="teal" content="Περικοπή" />
            {this.state.files[0] && (
              <Cropper
                style={{ height: 200, width: '100%' }}
                ref="cropper"
                src={this.state.files[0].preview}
                aspectRatio={1}
                viewMode={0}
                dragMode="move"
                guides={false}
                scalable={true}
                cropBoxMovable={true}
                cropBoxResizable={true}
                crop={this.cropImage}
              />
            )}
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header color="teal" content="Ολοκλήρωση" />
            {this.state.files[0] && (
              <div>
                <Image
                  style={{ minHeight: '200px', minWidth: '200px' }}
                  src={this.state.cropResult}
                />
                <Button.Group>
                  <Button
                    loading={loading}
                    onClick={this.uploadImage}
                    style={{ width: '100px' }}
                    color="teal"
                    icon="check"
                  />
                  <Button
                    disabled={loading}
                    onClick={this.cancelCrop}
                    style={{ width: '100px' }}
                    icon="close"
                  />
                </Button.Group>
              </div>
            )}
          </Grid.Column>
        </Grid>

        <Divider />
        <Header color="teal" content="Όλες οι φωτογραφίες μου" />

        <Card.Group itemsPerRow={5}>
          <Card>
            <Image src={profile.photoURL || '/assets/user.png'} />
            <Button color="teal">Κεντρική φωτογραφία</Button>
          </Card>
          {photos &&
            filteredPhotos.map(photo => (
              <Card key={photo.id}>
                <Image src={photo.url} />
                <div className="ui two buttons">
                  <Button
                    loading={loading}
                    onClick={this.handleSetMainPhoto(photo)}
                    basic
                    color="green"
                  >
                    Κεντρική
                  </Button>
                  <Button
                    onClick={this.handlePhotoDelete(photo)}
                    basic
                    icon="trash"
                    color="red"
                  />
                </div>
              </Card>
            ))}
        </Card.Group>
      </Segment>
    )
  }
}

export default compose(
  connect(
    mapState,
    actions
  ),
  firestoreConnect(auth => query(auth))
)(PhotosPage)
