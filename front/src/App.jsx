import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import React from 'react';
import './App.css'
import axios from 'axios';

function App() {

const [x,setX] = React.useState(62.47);
const [y,setY] = React.useState(22.49);
let coordinateList = [x,y];


function go() {
  setTimeout(() => {
    axios.get('http://localhost:3000').then(res => {
      setX(() => res.data.X + 0.3156);
      setY(() => res.data.Y + 0.329);
    });
  }, 2500);
}
React.useEffect(() =>{
  go()
  console.log(x,y, coordinateList);
});

  return (
    <>
     <MapContainer center={coordinateList} zoom={8} scrollWheelZoom={true}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  />
    <Marker position={coordinateList}>
       <Popup>
          Im <br /> here
        </Popup>
    </Marker>
</MapContainer>
    </>
  )
}

export default App



