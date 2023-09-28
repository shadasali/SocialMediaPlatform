import React from 'react';
import { useMap } from "react-map-gl";

function Navigation() {
    const { current: map } = useMap();
  
    map.flyTo({ zoom: 8 });
  
    return <div />;
};

export default Navigation;