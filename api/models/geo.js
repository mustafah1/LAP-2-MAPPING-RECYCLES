const db = require('../database/connect')

class Geo {

    constructor ( {id, name, address, city, state, zip, geom}) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.geom = geom;
    }

    static async getData() {
        const response = await db.query("SELECT * FROM restaurant_locations");
        return response.rows.map(p => new Geo(p));
    }
}

module.exports = Geo;

// id SERIAL PRIMARY KEY,
// name TEXT,
// address TEXT,
// city TEXT,
// state TEXT,
// zip TEXT,
// geom GEOMETRY(Point, 4326)