const db = require("../database/connect");

class Geo {

    constructor(type, features) {
      this.type = type;
      this.data = {
        type: "FeatureCollection",
        features: features,
      };
    }
  
    addFeature(properties, geometry) {
      const feature = {
        type: "Feature",
        properties: properties,
        geometry: geometry,
      };
      this.data.features.push(feature);
    }

    static async getFeatures() {

        const response = await db.query("SELECT description, icon, ST_AsGeoJSON(geom) as geom FROM points")

        let features = response.rows.map( p => (
            {
              type: "Feature",
              properties: {
                description: p.description,
                icon: p.icon,
              },
              geometry: JSON.parse(p.geom)
              ,
            }
        ))

          console.log(features)

        return new Geo("geojson", features)

  }
    static async getIdDescription() {
        
      const response = await db.query("SELECT points_id, description FROM points")

      let idDescr = response.rows

      return idDescr
    }
}

module.exports = Geo;
