import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { googleMapAPI } from './utils/keys';

const GlobalStyle = createGlobalStyle`
  html {
    width: 100%;
    height: 100%;
  }

  body {
    width: 100%;
    height: 100%;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }

  #root {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    & > div {
      margin: 1rem;
      position: relative;
      height: calc(100% - 2rem);
      width: calc(100% - 2rem);
    }
  }
`;

const mapStyles = {
  width: '100%',
  height: '100%',
};

export class MapContainer extends React.Component {
  render() {
    const { google } = this.props;

    return (
      <>
        <GlobalStyle />
        <Map
          google={google}
          zoom={14}
          style={mapStyles}
        />
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: googleMapAPI,
})(MapContainer);