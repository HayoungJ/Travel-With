const { kakao } = window;

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
}

export default KakaoMap;
