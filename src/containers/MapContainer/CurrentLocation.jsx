// @flow

import React from 'react';
import ReactDOM from 'react-dom';

const mapStyles = {
  map: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
};

type Props = {
  zoom?: number,
  initialCenter?: {
    lat: number,
    lng: number,
  },
  centerAroundCurrentLocation?: boolean,
  visible?: boolean,
  google: any,
}

type State = {
  currentLocation: {
    lat: number,
    lng: number,
  },
}

export default class CurrentLocation extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    const {
      initialCenter: {
        lat,
        lng,
      } = {},
    } = this.props;

    this.state = {
      currentLocation: {
        lat,
        lng,
      },
    };
  }

  componentDidMount() {
    const { centerAroundCurrentLocation } = this.props;

    if (centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const {
            coords: {
              latitude,
              longitude,
            } = {},
          } = pos;

          this.setState({
            currentLocation: {
              lat: latitude,
              lng: longitude,
            },
          });
        });
      }

      this.loadMap();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { google } = this.props;

    if (prevProps.google !== google) {
      this.loadMap();
    }

    const { currentLocation } = this.state;
    if (prevState.currentLocation !== currentLocation) {
      this.recenterMap();
    }
  }

  loadMap = () => {
    const { google } = this.props;
    if (this.props && google) {
      const {
        google: { maps } = {},
        zoom,
      } = this.props;

      const mapRef = this.refs.map;

      const node = ReactDOM.findDOMNode(mapRef);

      const {
        currentLocation: { lat, lng } = {},
      } = this.state;

      const center = new maps.LatLng(lat, lng);
      const mapConfig = {
        center,
        zoom,
      };

      this.map = new maps.Map(node, mapConfig);
    }
  }

  recenterMap = () => {
    const { map } = this;
    const {
      currentLocation: {
        lat,
        lng,
      } = {},
    } = this.state;

    const {
      google: {
        maps,
      } = {},
    } = this.props;

    if (map) {
      const center = new maps.LatLng(lat, lng);
      map.panTo(center);
    }
  }

  renderChildren = () => {
    const { children, google } = this.props;

    const { currentLocation } = this.state;

    if (children) {
      return React.Children.map(children, (c) => {
        if (c) {
          return React.cloneElement(c, {
            map: this.map,
            google,
            mapCenter: currentLocation,
          });
        }
        return c;
      });
    }
    return children;
  };

  render() {
    return (
      <div>
        <div style={mapStyles.map} ref="map">
          Loading map...
        </div>
        { this.renderChildren() }
      </div>
    );
  }
}

CurrentLocation.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: 52.379189,
    lng: 4.899431,
  },
  centerAroundCurrentLocation: false,
  visible: true,
};
