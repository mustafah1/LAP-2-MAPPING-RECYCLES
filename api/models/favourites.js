const db = require('../database/connect');

class Favourites {

    constructor({ fav_id, user_id, points_id }) {
        this.fav_id = fav_id;
        this.user_id = user_id;
        this.points_id = points_id;
    }

    //need to call this on login?
    static async getFavouritesByUser(id) {
        const response = await db.query("SELECT * FROM favourites WHERE user_id = $1", [id]);
        console.log(response.rows)

        const result = { user_id: response.rows[0].user_id, points_id: [] };
  
        for (let i = 0; i < response.rows.length; i++) {
          result.points_id.push(response.rows[i].points_id);
        }

        console.log(result)
        return new Favourites(result);
    }

    //this one isnt working - remove it?
    static async getFavourites() {
        const response = await db.query("SELECT * FROM favourites;");
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new Favourites(response.rows[0]);
    }

    static async getFavouriteById(fav_id) {
        const response = await db.query("SELECT * FROM favourites WHERE fav_id = $1", [fav_id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate favourite.");
        }
        return new Favourites(response.rows[0]);
    }

    static async getFavIdFromPointId(points_id) {
        const response = await db.query("SELECT fav_id FROM favourites WHERE points_id = $1", [points_id])

        // if (response.rows.length != 1) {
        //     throw new Error("Unable to locate favourite.");
        // }

        console.log(response.rows[0].fav_id)
        return response.rows[0].fav_id;

    }

// INSERT INTO favourites(user_id, points_id)
// VALUES (1, 3);
    static async create(data) {
        const {user_id, points_id} = data 
        const response = await db.query("INSERT INTO favourites(user_id, points_id) VALUES ($1, $2) RETURNING *;", [user_id, points_id])
        const userId =  response.rows[0].user_id
        const newFavourite = await Favourites.getFavouritesByUser(userId)
        return newFavourite
    }


//     IF NOT EXISTS (SELECT * FROM favourites WHERE column1 = $1 AND column2 = )
// BEGIN
//     INSERT INTO your_table (column1, column2, column3) VALUES ('value1', 'value2', 'value3')
// END


    async destroy() {
        const response = await db.query("DELETE FROM favourites WHERE fav_id = $1 RETURNING *;", [this.fav_id])
        console.log(response)
        console.log(this)
        if (response.rows.length != 1) {
          throw new Error("unable to delete favourite - model")
        }

        return new Favourites(response.rows[0])
      }
}


module.exports = Favourites