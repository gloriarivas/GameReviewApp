/**
 * File Name: GRBdatabase
 *
 * Revision History:
 *       Gloria Rivas-Bonilla, 4/03/2023 : Created
 */

//db reference
var db;

//error handler
function errorHandler(error){
    console.error(`Error: ${error.message}`);
}

var DB = {
    //create db
    createDatabase: function(){
        let name = "GameReviewsDB";
        let version = "1.0";
        let displayName = "GameReviewDB0";
        let size = 2 * 1024 * 1024;

        function creationCallback(){
            console.log("Database Created!");
        }

        db = openDatabase(name, version, displayName, size, creationCallback);
    },
    //create tables
    createTables: function(){
        //games, genre, reviews, users
        //load tables without foreign keys first

        //Genre
        function createGenreTable(tx){
            var sql = "CREATE TABLE IF NOT EXISTS genre(" +
                "genre_id INT NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "genre_name VARCHAR(20));";
            let options = [];

            function success(){
                console.log("Genre Table created");
            }
            tx.executeSql(sql, options, success, errorHandler);
        }

        //Users
        function createUsersTable(tx){
            var sql = "CREATE TABLE IF NOT EXISTS users(" +
                "user_id INT NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "user_first_name VARCHAR(25)," +
                "user_last_name VARCHAR(25)," +
                "user_email VARCHAR(40));";
            let options = [];

            function success(){
                console.log("Users Table created");
            }
            tx.executeSql(sql, options, success, errorHandler);
        }

        //Games
        function createGamesTable(tx){
            var sql = "CREATE TABLE IF NOT EXISTS games(" +
                "game_id INT NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "game_name VARCHAR(25)," +
                "publish_date DATE," +
                "genre_id INT," +
                "company_name VARCHAR(50)," +
                "FOREIGN KEY(genre_id) REFERENCES genre(genre_id));";
            let options = [];

            function success(){
                console.log("Games Table created");
            }
            tx.executeSql(sql, options, success, errorHandler);
        }

        //Reviews
        function createReviewsTable(tx){
            var sql = "CREATE TABLE IS NOT EXISTS reviews(" +
                "review_id INT NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "game_id INT," +
                "title VARCHAR(30)," +
                "comment TEXT," +
                "rating INT," +
                "date_posted DATETIME," +
                "FOREIGN KEY(game_id) REFERENCES games(game_id));";
            let options = [];

            function success(){
                console.log("Reviews Table created");
            }
            tx.executeSql(sql, options, success, errorHandler);
        }
    }
}