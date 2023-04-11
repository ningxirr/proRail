import React, { createContext, useState } from 'react';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState(null);
    const [nearestStation, setNearestStation] = useState(null);

  return (
    <LocationContext.Provider value={{ location, setLocation, nearestStation, setNearestStation }}>
      {children}
    </LocationContext.Provider>
  );
};
