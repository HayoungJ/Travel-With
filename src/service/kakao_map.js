const { kakao } = window;
let displayedMarkers = {
  search: [],
  custom: [],
};

class KakaoMap {
  createMap(container) {
    const mapContainer = document.getElementById(container),
      mapOption = {
        center: new kakao.maps.LatLng(37.5663, 126.9779),
        level: 3,
      };

    const map = new kakao.maps.Map(mapContainer, mapOption);

    return map;
  }

  repositionMap(map, search) {
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(search, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        map.panTo(coords);
      }
    });
  }

  search(map, keyword, handleMarkerClick) {
    const placeSearch = new kakao.maps.services.Places();
    placeSearch.keywordSearch(keyword, placesSearchCB);

    this.removePreviousMarkers('search');

    function placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }

    const infoWindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    function displayMarker(place) {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            '</div>'
        );
        infoWindow.open(map, marker);
        handleMarkerClick(place);
      });

      displayedMarkers.search.push(marker);
    }
  }

  createCustomMarker(map, markers) {
    const imageSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
    const infoWindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const bounds = new kakao.maps.LatLngBounds();

    this.removePreviousMarkers('custom');

    for (let i = 0; i < markers.length; i++) {
      const imageSize = new kakao.maps.Size(24, 35);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      const position = new kakao.maps.LatLng(markers[i].y, markers[i].x);
      const marker = new kakao.maps.Marker({
        map: map,
        position: position,
        image: markerImage,
      });
      bounds.extend(position);

      kakao.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            markers[i].place_name +
            '</div>'
        );
        infoWindow.open(map, marker);
      });

      displayedMarkers.custom.push(marker);
    }

    displayedMarkers.custom.length > 0 && map.setBounds(bounds);
  }

  removePreviousMarkers(type) {
    let removeMarkers = displayedMarkers[type];
    for (let i = 0; i < removeMarkers.length; i++) {
      removeMarkers[i].setMap(null);
    }
    displayedMarkers[type] = [];
  }
}

export default KakaoMap;
