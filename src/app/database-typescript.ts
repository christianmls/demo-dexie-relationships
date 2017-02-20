import Dexie from 'dexie';
import relationships from 'dexie-relationships';


interface IGenres {
  id ?: number;
  name: string;
}

interface IBands {
  id ?: number;
  name: string;
  genreId: number;
}
interface IAlbums{
  id ?: number;
  name: string;
  bandId: number;
  year: number
}

export class MyDB extends Dexie {
  public genres : Dexie.Table< IGenres, number >
  public bands : Dexie.Table< IBands, number >
  public albums : Dexie.Table< IAlbums, number >

  constructor(){
    super( 'MusicBandsTypescript', { addons: [ relationships ] } );

    this.version(1).stores({
        genres: 'id, name',
        bands: 'id, name, genreId -> genres.id',
        albums: 'id, name, bandId -> bands.id, year'
    });

    this.transaction('rw', this.bands, this.albums, this.genres, () => {
        // Genres
        this.genres.bulkPut([{
            id: 1,
            name: "Rock"
        },{
            id: 2,
            name: "Schlager"
        }])

        // Bands
        this.bands.bulkPut([{
            id: 1,
            name: 'Beatles',
            genreId: 1
        },{
            id: 2,
            name: 'Abba',
            genreId: 2
        }])

        // Albums
        this.albums.bulkPut([{
            id: 1,
            name: 'Abbey Road',
            year: 1969,
            bandId: 1
        }, {
            id: 2,
            name: 'Let It Be',
            year: 1970,
            bandId: 1
        }, {
            id: 3,
            name: 'Super Trouper',
            bandId: 2,
            year: 1980
        }, {
            id: 4,
            name: 'Waterloo',
            bandId: 2,
            year: 1974
        }])
    });

  }

  allGenres(): any {
    return this.genres.orderBy( 'id' ).reverse().toArray();
  }

}
