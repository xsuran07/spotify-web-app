/**
 * @brief Component for displaying data
 * and statistices connected to particular artist.
 *
 * @author Jakub Šuráň (xsuran07@stud.fit.vutbr.cz)
 * @file Artist.jsx
 */

import { useState, useEffect, createContext } from 'react';

import { ArstistInfoTable } from './ArtistInfoTable';

/**
 * @brief Calculates three statistics (oldest, newest and
 * average number of tracks) from array with albums.
 *
 * @param arr Array with albums to process.
 * @returns array with values of all three statistics.
 */
const getStats = (arr) => {
  if(!arr.length) {
      return [0,0,0]
  }

  let stats = arr.reduce((acc, curr, idx) => {
    acc[0] = (curr.date < arr[acc[0]].date)? idx : acc[0]; // min
    acc[1] = (curr.date > arr[acc[1]].date)? idx : acc[1]; // max
    acc[2] = acc[2] + curr.tracks; // sum

    return acc;
  }, [0, 0, 0]);

  return [arr[stats[0]].name, arr[stats[1]].name, stats[2] / arr.length];
}

/**
 * @brief Convenient function which converts given pair of arguments
 * into object. That simplifies work with artist's properties.
 *
 * @param propName Name of the particular artist's property.
 * @param propValue Value of the particular artist's property.
 * @returns object filled with provided values.
 */
const createProp = (propName, propValue) => {
  return { propName, propValue }
}

/**
 * @brief Context with data connected to particular artist.
 */
export const ArtistContext = createContext();

/**
 * @brief Component which displays information and statistics about
 * particular artist.
 *
 * @param artist State variable storing fetch data about arist.
 * @param albums State variable storing array of artist's albums.
 */
export const Artist = ({ artist, albums }) => {
  const [ image, setImage ] = useState(null);
  const [ artistProps, setArtistProps ] = useState([]);

  useEffect(() => {
    if(!artist || !albums.length) {
      setArtistProps([])
      return;
    }

    // extract relevant data about artist
    const [ minimum, maximum, average ] = getStats(albums);
    let newProps = [
      createProp('Name', artist.name),
      createProp('Followers on spotify', artist.followers.total),
      createProp('Genres', artist.genres.slice(0, 6).join(', ')),
      createProp('Oldest album', minimum),
      createProp('Newest album', maximum),
      createProp('Tracks in album by average', average.toFixed(2)),
      createProp('Total number of albums', albums.length)
    ];

    setArtistProps(newProps);
    setImage((artist.images.length)? artist.images[artist.images.length - 1].url : null);
  }, [artist, albums]);

  return (
    <ArtistContext.Provider
      value={{ header: 'Basic information about artist', props: artistProps, image:image }}
    >
      <ArstistInfoTable />
    </ArtistContext.Provider>
  );
}
