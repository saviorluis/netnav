'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface Venue {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
}

interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  venue?: Venue;
}

interface EventMapProps {
  events: Event[];
  onEventClick?: (event: Event) => void;
}

export default function EventMap({ events, onEventClick }: EventMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      version: 'weekly',
    });

    loader.load().then(() => {
      if (!mapRef.current) return;

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 35.7596, lng: -79.0193 }, // Center on North Carolina
        zoom: 6, // Initial zoom level for NC view
        minZoom: 3, // Prevent zooming out too far
        maxZoom: 18,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'administrative.locality',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }], // Show city labels
          },
          {
            featureType: 'administrative.province',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }], // Show state labels
          }
        ],
        restriction: {
          latLngBounds: {
            north: 49.3457868, // US northern border
            south: 24.396308, // US southern border
            east: -66.93457, // US eastern border
            west: -124.848974 // US western border
          },
          strictBounds: true
        }
      });

      setMap(map);
      setInfoWindow(new google.maps.InfoWindow());
    });
  }, []);

  useEffect(() => {
    if (!map || !infoWindow) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));

    // Create new markers for events with venues
    const newMarkers = events
      .filter(event => event.venue)
      .map(event => {
        const marker = new google.maps.Marker({
          position: {
            lat: event.venue!.latitude,
            lng: event.venue!.longitude,
          },
          map,
          title: event.title,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#3B82F6',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          },
        });

        marker.addListener('click', () => {
          infoWindow.setContent(`
            <div class="p-2">
              <h3 class="font-semibold">${event.title}</h3>
              <p class="text-sm text-gray-600">${event.venue!.name}</p>
              <p class="text-sm text-gray-600">${new Date(event.startDate).toLocaleDateString()}</p>
            </div>
          `);
          infoWindow.open(map, marker);
          onEventClick?.(event);
        });

        return marker;
      });

    setMarkers(newMarkers);

    // Fit bounds to show all markers
    if (newMarkers.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      newMarkers.forEach(marker => bounds.extend(marker.getPosition()!));
      map.fitBounds(bounds);
    }
  }, [map, events, infoWindow, onEventClick]);

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
} 