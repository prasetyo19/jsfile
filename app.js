/* Initial Map */
var map = L.map('map').setView([0.5113353576556057, 101.44718066054918],17); //lat, long, zoom , 
      
/* Tile Basemap */
var basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //attribution akan muncul di pojok kanan bawah
  attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
basemap.addTo(map);

function onLocationFound(e) {
	
  var lokasikantor = [0.5108212678283479, 101.44722849471867];

  /* Menghitung jarak antar 2 koordinat dengan satuan km
      Untuk satuan meter tidak perlu dibagi 1000 */
  var distance = (L.latLng(e.latlng).distanceTo(lokasikantor) / 1000).toFixed(2);

  var radius = (e.accuracy / 2).toFixed(1);
  
  // Membuat marker sesuai koordinat lokasi
  locationMarker = L.marker(e.latlng);
  locationMarker.addTo(map);
  locationMarker.bindPopup("<p class='text-center'>Anda berada <b>" + distance + " km</b><br>dari Kantor.<br>Akurasi GPS " + radius + " meter.</p>");
  locationMarker.openPopup();

  // Membuat garis antara koordinat lokasi dengan lokasi kantor
  var latlongline = [e.latlng,lokasikantor];
  var polyline = L.polyline(latlongline, {
    color: 'red',
    weight: 5,
    opacity: 0.7,
  });
  polyline.addTo(map);
}

function onLocationError(e) {
  alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({setView: true, maxZoom: 15});
