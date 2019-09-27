import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { googleMapAPI } from './utils/keys';

const mapStyles = {
  width: '100%',
  height: '100%',
};

export class MapContainer extends React.Component {
  render() {
    const { google } = this.props;

    return (
      <Map
        google={google}
        zoom={14}
        style={mapStyles}
        className="map"
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: googleMapAPI,
})(MapContainer);