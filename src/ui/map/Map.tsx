"use client";

import {
  AdvancedMarker,
  APIProvider,
  InfoWindow,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import { useState } from "react";

export default function Location() {
  const position1 = { lat: 19.461_198_913_258_265, lng: -70.678_519_503_415_3 };
  const position2 = { lat: 19.448_487_453_885_21, lng: -70.651_230_445_729_95 };
  const [openInfoWindow, setOpenInfoWindow] = useState({
    pos1: false,
    pos2: false,
  });

  const centerPosition = {
    lat: (position1.lat + position2.lat) / 2,
    lng: (position1.lng + position2.lng) / 2,
  };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ""}>
      <div className="flex flex-col items-center justify-center w-full h-screen px-3 py-32 bg-grayBackground lg:px-36">
        <Map
          defaultZoom={15}
          defaultCenter={centerPosition}
          mapId={process.env.NEXT_PUBLIC_DESIGN_MAP_ID}
        >
          <AdvancedMarker
            position={position1}
            onClick={() => setOpenInfoWindow({ ...openInfoWindow, pos1: true })}
          >
            <Pin />
            {openInfoWindow.pos1 && (
              <InfoWindow
                position={position1}
                onCloseClick={() =>
                  setOpenInfoWindow({ ...openInfoWindow, pos1: false })
                }
              >
                <p>C. E. León Jimenez, Isolashes Reparto Este</p>
              </InfoWindow>
            )}
          </AdvancedMarker>

          <AdvancedMarker
            position={position2}
            onClick={() => setOpenInfoWindow({ ...openInfoWindow, pos2: true })}
          >
            <Pin />
            {openInfoWindow.pos2 && (
              <InfoWindow
                position={position2}
                onCloseClick={() =>
                  setOpenInfoWindow({ ...openInfoWindow, pos2: false })
                }
              >
                <p>Los Laureles C/3, Isolashes Los Laureles</p>
              </InfoWindow>
            )}
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
}
