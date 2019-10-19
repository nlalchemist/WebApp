// @flow

import React, { useState } from 'react';
import {
  GoogleApiWrapper, InfoWindow, Marker, Map,
} from 'google-maps-react';

import { googleMapAPI } from '../../assets/keys';

// import CurrentLocation from './CurrentLocation';

function MapContainer({ google }) {
  const [state, setState] = useState({
    showInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  });

  const {
    activeMarker,
    showInfoWindow,
    selectedPlace: {
      name,
    } = {},
  } = state;

  const onMarkerClick = (props: Props, marker: object) => {
    setState({
      showInfoWindow: true,
      activeMarker: marker,
      selectedPlace: props,
    });
  };

  const onClose = () => {
    if (showInfoWindow) {
      setState({
        ...state,
        showInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  return (
    <Map
      google={google}
      // centerAroundCurrentLocation
    >
      <Marker
        onClick={onMarkerClick}
        name="Current location"
      />
      <InfoWindow
        marker={activeMarker}
        visible={showInfoWindow}
        onClose={onClose}
      >
        <div>
          <h4>{name}</h4>
        </div>
      </InfoWindow>
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: googleMapAPI,
})(MapContainer);
