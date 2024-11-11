import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import {WebView} from 'react-native-webview';

const HERE_API_KEY = 'FDSrRQkvtZ4QPx6QMNN1384RW_SNr8tPZfWsFs-HMS8';

const LocationComponent = () => {
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        if (position.coords) {
          const {latitude, longitude} = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          reverseGeoCode(latitude, longitude);
        }
      },
      error => console.error(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  const reverseGeoCode = async (lat: number, long: number) => {
    const api = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${long}&lang=vi-VI&apiKey=${HERE_API_KEY}`;
    try {
      const res = await axios.get(api);
      if (res && res.status === 200 && res.data) {
        const items = res.data.items;
        if (items.length > 0) {
          setCurrentLocation(items[0]);
        }
      }
    } catch (error) {
      console.log('Error fetching address:', error);
    }
  };

  const handleMapClick = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.lat && data.lng) {
      setLatitude(data.lat);
      setLongitude(data.lng);
      reverseGeoCode(data.lat, data.lng);
    }
  };

  const mapHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://js.api.here.com/v3/3.1/mapsjs-core.js"></script>
      <script src="https://js.api.here.com/v3/3.1/mapsjs-service.js"></script>
      <script src="https://js.api.here.com/v3/3.1/mapsjs-ui.js"></script>
      <script src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js"></script>
      <style>
        html, body { margin: 0; padding: 0; height: 100%; overflow: hidden; }
        #map { width: 100%; height: 100%; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        const platform = new H.service.Platform({ apikey: '${HERE_API_KEY}' });
        const defaultLayers = platform.createDefaultLayers();
        const map = new H.Map(
          document.getElementById('map'),
          defaultLayers.vector.normal.map,
          {
            center: { lat: ${latitude || 10.8231}, lng: ${
    longitude || 106.6297
  } },
            zoom: 14,
          }
        );
        const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
        const ui = H.ui.UI.createDefault(map, defaultLayers);

        map.addEventListener('tap', function (evt) {
          const coords = map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
          window.ReactNativeWebView.postMessage(JSON.stringify({ lat: coords.lat, lng: coords.lng }));
        });
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <View style={{height: 400, width: '100%'}}>
        <WebView
          source={{html: mapHtml}}
          style={{flex: 1}}
          onMessage={handleMapClick}
        />
      </View>
      <View style={styles.infoContainer}>
        {currentLocation ? (
          <>
            <Text style={styles.title}>{currentLocation.title}</Text>
            <Text style={styles.label}>{currentLocation.address.label}</Text>
          </>
        ) : (
          <Text>Loading current location...</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  infoContainer: {marginTop: 20, alignItems: 'center'},
  title: {fontSize: 18, fontWeight: 'bold'},
  label: {fontSize: 14, color: '#888'},
});

export default LocationComponent;
