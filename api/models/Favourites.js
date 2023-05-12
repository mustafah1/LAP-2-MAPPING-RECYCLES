const db = require('../database/connect');

class Favourites {

    constructor({ fav_id, user_id, points_id }) {
        this.fav_id = fav_id;
        this.user_id = user_id;
        this.points_id = points_id;
    }

    static async getFavouritesByUser(id) {
        const response = await db.query("SELECT * FROM favourites WHERE user_id = $1", [id]);
        const result = { user_id: id, points_id: [] };
        for (let i = 0; i < response.rows.length; i++) {
          result.points_id.push(response.rows[i].points_id);
        }
        return new Favourites(result);
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
        if (response.rows.length != 1) {
            throw new Error("Unable to locate favourite.");
        }
        return response.rows[0].fav_id;
    }

    static async create(data) {
        const { user_id, points_id } = data;
        const response = await db.query("INSERT INTO favourites(user_id, points_id) VALUES ($1, $2) RETURNING *;", [user_id, points_id]);
        const fav_id = response.rows[0].fav_id;
        const newFavourite = await Favourites.getFavouriteById(fav_id);
        return newFavourite;
    }

    async destroy() {
        const response = await db.query("DELETE FROM favourites WHERE fav_id = $1 RETURNING *;", [this.fav_id]);
        if (response.rows.length != 1) {
          throw new Error("unable to delete favourite - model");
        }
        return new Favourites(response.rows[0]);
    }
}

module.exports = Favourites;
