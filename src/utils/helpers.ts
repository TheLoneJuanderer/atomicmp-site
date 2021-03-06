import { CRS, LatLng, Point } from 'leaflet';

// 100,000 -> 2048
// -100,000 -> 0

interface IPlayerCoords {
  x_pos: number;
  y_pos: number;
}

function playerCoordsToImg({ x_pos, y_pos }: IPlayerCoords): {x: number, y: number} {
  const ratio = (200000/ 2048)
  const x = (x_pos + 100000) / ratio;
  const y = (y_pos + 100000) / ratio;
  return {
    x, y
  }
}


/**
 * 
 * @param param0 
 */
function mapImagePointToLatLng({x, y}: {x: number, y: number}): LatLng {
  return CRS.Simple.unproject(new Point(x, -(y - 2048)))
}

export {
  playerCoordsToImg,
  mapImagePointToLatLng
}