import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

const Map = () => {
  const [markers, setMarkers] = useState([]);
  const [newMarker, setNewMarker] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setNewMarker({ position: e.latlng });
        setIsDialogOpen(true);
      },
    });
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const description = e.target.description.value;
    setMarkers([...markers, { ...newMarker, name, description }]);
    setNewMarker(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="p-4 bg-background border-b">
        <h1 className="text-2xl font-bold">Interactive Map Application</h1>
      </header>
      <main className="flex-grow relative">
        <MapContainer center={[40.7128, -74.0060]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapEvents />
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.position}>
              <Popup>
                <div>
                  <h3 className="font-bold">{marker.name}</h3>
                  <p>{marker.description}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </main>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="z-[1000]">
          <DialogHeader>
            <DialogTitle>Add New Location</DialogTitle>
            <DialogDescription>
              Enter details for the new location.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input id="description" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Location</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Map;