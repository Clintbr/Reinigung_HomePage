/**
 * Interactive Contact Mini-Map
 * Messelbergstraße 4, 73098 Rechberghausen
 * Supports zooming, touch swiping/panning, custom marker and route planning
 */

export function initContactMap() {
    const mapElement = document.getElementById('contact-mini-map');
    if (!mapElement) return;

    // Check if Leaflet is loaded
    if (typeof window.L === 'undefined') {
        console.warn('Leaflet library (L) is not loaded.');
        return;
    }

    const LAT = 48.7188;
    const LNG = 9.6155;
    const DEFAULT_ZOOM = 14;

    // Initialize Map with Touch Swiping and Zooming
    const map = window.L.map('contact-mini-map', {
        center: [LAT, LNG],
        zoom: DEFAULT_ZOOM,
        scrollWheelZoom: false, // Prevents accidental page-scroll hijacking
        touchZoom: true,        // Allows pinch-to-zoom on mobile
        dragging: true,         // Allows swiping and panning
        tap: true,
        zoomControl: true
    });

    // Move zoom controls to top-left
    map.zoomControl.setPosition('topleft');

    // Add OpenStreetMap tiles
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'
    }).addTo(map);

    // Subtle radius circle showing core service area around Rechberghausen (~6km immediate radius)
    window.L.circle([LAT, LNG], {
        color: '#2563EB',
        fillColor: '#3B82F6',
        fillOpacity: 0.08,
        weight: 1.5,
        dashArray: '4, 6',
        radius: 4500
    }).addTo(map);

    // Custom SVG Pin Marker
    const pinHtml = `
        <div class="custom-map-pin">
            <div class="map-pin-pulse"></div>
            <div class="map-pin-marker" title="ProKlar Glasreinigung">
                <svg viewBox="0 0 24 24" width="34" height="42" fill="none">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 24 12 24s12-15 12-24c0-6.627-5.373-12-12-12z" fill="#2563EB"/>
                    <circle cx="12" cy="11" r="5" fill="#FFFFFF"/>
                    <circle cx="12" cy="11" r="2.5" fill="#1D4ED8"/>
                </svg>
            </div>
        </div>
    `;

    const customIcon = window.L.divIcon({
        className: 'leaflet-custom-marker-wrapper',
        html: pinHtml,
        iconSize: [36, 44],
        iconAnchor: [18, 42],
        popupAnchor: [0, -42]
    });

    // Create marker
    const marker = window.L.marker([LAT, LNG], { icon: customIcon }).addTo(map);

    // Popup content
    const popupContent = `
        <div style="font-family: inherit; font-size: 0.85rem; line-height: 1.45; min-width: 190px;">
            <strong style="color: #1C1917; font-size: 0.95rem; display: block; margin-bottom: 2px;">ProKlar Glasreinigung</strong>
            <span style="color: #57534E; font-size: 0.82rem; display: block;">Messelbergstraße 4<br>73098 Rechberghausen</span>
            <span style="color: #16A34A; font-weight: 600; font-size: 0.775rem; display: block; margin-top: 4px;">✓ Basis unseres 25-Min.-Einsatzgebiets</span>
            <a href="https://www.google.com/maps/dir/?api=1&destination=Messelbergstra%C3%9Fe+4,+73098+Rechberghausen" target="_blank" rel="noopener" style="display: inline-block; margin-top: 8px; color: #2563EB; font-weight: 700; font-size: 0.82rem; text-decoration: none;">Route in Google Maps &rarr;</a>
        </div>
    `;
    marker.bindPopup(popupContent);

    // Re-center button listener
    const recenterBtn = document.getElementById('btn-recenter-map');
    if (recenterBtn) {
        recenterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            map.flyTo([LAT, LNG], DEFAULT_ZOOM, {
                duration: 0.8,
                easeLinearity: 0.25
            });
            setTimeout(() => {
                marker.openPopup();
            }, 850);
        });
    }

    // Enable wheel zoom on click/focus so visitors can zoom via mouse wheel when intentional
    map.on('focus', () => { map.scrollWheelZoom.enable(); });
    map.on('blur', () => { map.scrollWheelZoom.disable(); });

    // Refresh size on load & resize
    setTimeout(() => {
        map.invalidateSize();
    }, 250);

    window.addEventListener('resize', () => {
        map.invalidateSize();
    }, { passive: true });
}
