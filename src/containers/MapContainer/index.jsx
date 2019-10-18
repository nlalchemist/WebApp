// @flow

import React from 'react';
import {
  GoogleApiWrapper, InfoWindow, Marker, Map,
} from 'google-maps-react';

import { googleMapAPI } from '../../assets/keys';

// import CurrentLocation from './CurrentLocation';

type Props = {
  google: any,
};

type State = {
  showInfoWindow: boolean,
  activeMarker: object,
  selectedPlace: object,
};

class MapContainer extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      showInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }

  onMarkerClick = (props: Props, marker: object) => this.setState({
    showInfoWindow: true,
    activeMarker: marker,
    selectedPlace: props,
  });

  onClose = () => {
    const { showInfoWindow } = this.state;

    if (showInfoWindow) {
      this.setState({
        showInfoWindow: false,
        activeMarker: null,
      });
    }
  }

  render() {
    const { google } = this.props;

    const {
      activeMarker,
      showInfoWindow,
      selectedPlace: {
        name,
      },
    } = this.state;

    console.log(this.state);

    return (
      <Map
        google={google}
        // centerAroundCurrentLocation
      >
        <Marker
          onClick={this.onMarkerClick}
          name="Current location"
        />
        <InfoWindow
          marker={activeMarker}
          visible={showInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{name}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: googleMapAPI,
})(MapContainer);
