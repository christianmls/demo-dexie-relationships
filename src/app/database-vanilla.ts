import Dexie from 'dexie';
import relationships from 'dexie-relationships';

export class MyDB {
  private db:Dexie = new Dexie('MusicBands', {addons: [relationships]})

  constructor() {

    this.db.version(1).stores({
        genres: 'id, name',
        bands: 'id, name, genreId -> genres.id',
        albums: 'id, name, bandId -> bands.id, year'
    });

    this.db.transaction('rw', this.db.table('bands'), this.db.table('albums'), this.db.table('genres'), () => {
        // Genres
        this.db.table('genres').bulkPut([{
            id: 1,
            name: "Rock"
        },{
            id: 2,
            name: "Schlager"
        }])

        // Bands
        this.db.table('bands').bulkPut([{
            id: 1,
            name: 'Beatles',
            genreId: 1
        },{
            id: 2,
            name: 'Abba',
            genreId: 2
        }])

        // Albums
        this.db.table('albums').bulkPut([{
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
    return this.db.table('genres').orderBy( 'id' ).reverse().toArray()
  }

}
