import * as L from 'leaflet';

export const leafletConfig = {
  initMap: (mapId: string) => {
    // Fix des icônes
    const iconUrl = 'assets/leaflet-images/marker-icon.png';
    const iconRetinaUrl = 'assets/leaflet-images/marker-icon-2x.png';
    const shadowUrl = 'assets/leaflet-images/marker-shadow.png';
    
    L.Icon.Default.mergeOptions({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    // Création de la carte
    const map = L.map(mapId).setView([36.8065, 10.1815], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    
    return map;
  }
};