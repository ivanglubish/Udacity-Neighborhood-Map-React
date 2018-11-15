/* global google */

import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={8}
      zoom={props.zoom}
      //defaultCenter={{ lat: -34.397, lng: 150.644 }}
      center={props.center}
    >
      {props.markers &&
        props.markers.filter(marker => marker.isVisible).map((marker, idx, arr) => {
          const venueInfo = props.venues.find(venue => venue.id === marker.id);
          return (
            <Marker
              key={idx}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => props.handleMarkerClick(marker)}
              animation={arr.length === 1 ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP}
            >
              {marker.isOpen &&
                venueInfo.bestPhoto && (
                  <InfoWindow>
                    <React.Fragment>
                      <img
                        src={`${venueInfo.bestPhoto.prefix}200x200${
                          venueInfo.bestPhoto.suffix
                          }`}
                        alt={"restaurant"}
                      />
                      <p>{venueInfo.name}</p>
                    </React.Fragment>
                  </InfoWindow>
                )}
            </Marker>
          );
        })}
    </GoogleMap>
  ))
);
// used to run map
export default class Map extends Component {
  render() {
    return (<MyMapComponent
        {...this.props}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCL7mkd7EqsomL-3NXwW9NM7difQuNzw5c"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div id="map" role="application" aria-label="Google Maps" />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}