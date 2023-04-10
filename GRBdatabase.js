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
        //load tables without foreign keys first

        //Genre
        function createGenreTable(tx){
            var sql = "CREATE TABLE IF NOT EXISTS genre(" +
                "genre_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
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
                "user_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
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
                "game_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "game_name VARCHAR(100)," +
                "publish_date DATE," +
                "genre_id INTEGER," +
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
            var sql = "CREATE TABLE IF NOT EXISTS reviews(" +
                "review_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "game_id INTEGER NOT NULL," +
                "title VARCHAR(30)," +
                "comment TEXT," +
                "rating INTEGER," +
                "date_posted text," +
                "FOREIGN KEY(game_id) REFERENCES games(game_id));";
            let options = [];

            function success(){
                console.log("Reviews Table created");
            }
            tx.executeSql(sql, options, success, errorHandler);
        }

        //success transaction
        function successTransaction(){
            console.log("Create table transaction successful");
        }

        db.transaction(createGenreTable, errorHandler, successTransaction);
        db.transaction(createUsersTable, errorHandler, successTransaction);
        db.transaction(createGamesTable, errorHandler, successTransaction);
        db.transaction(createReviewsTable, errorHandler, successTransaction);
    },
    dropTables:function(){
        //genre table
        function dropGenreTable(tx){
            let sql = "DROP TABLE IF EXISTS genre;";
            let options = [];
            function successDrop(){
                console.log("Success: genre table dropped");
            }
            tx.executeSql(sql, options, successDrop, errorHandler);
        }

        function dropUsersTable(tx){
            let sql = "DROP TABLE IF EXISTS users;";
            let options = [];
            function successDrop(){
                console.log("Success: users table dropped");
            }
            tx.executeSql(sql, options, successDrop, errorHandler);
        }

        function dropGamesTable(tx){
            let sql = "DROP TABLE IF EXISTS games;";
            let options = [];
            function successDrop(){
                console.log("Success: games table dropped");
            }
            tx.executeSql(sql, options, successDrop, errorHandler);
        }

        function dropReviewsTable(tx){
            let sql = "DROP TABLE IF EXISTS reviews;";
            let options = [];
            function successDrop(){
                console.log("Success: reviews table dropped");
            }
            tx.executeSql(sql, options, successDrop, errorHandler);
        }

        function successTransaction() {
            console.log("Success Drop tables transaction successful");
        }

        db.transaction(dropGenreTable, errorHandler, successTransaction);
        db.transaction(dropUsersTable, errorHandler, successTransaction);
        db.transaction(dropGamesTable, errorHandler, successTransaction);
        db.transaction(dropReviewsTable, errorHandler, successTransaction);
    },
    inputData:function(){
        //insert data into genres table
        function insertIntoGenre(tx){
            let sql = "INSERT INTO genre (genre_name)" +
                "VALUES" +
                "('RPG')," +
                "('Action')," +
                "('Adventure')," +
                "('FPS')," +
                "('Open World')," +
                "('Platformer')," +
                "('Fighting')," +
                "('Survival Horror')," +
                "('Racing');";

            let options = [];
            function success(){
                console.log("Genre table has been filled with data");
            }
            tx.executeSql(sql, options, success, errorHandler);
        }

        //insert data into users table
        function insertIntoUsers(tx){
            let sql = "INSERT INTO users (user_first_name, user_last_name, user_email)" +
                "VALUES" +
                "('Gloria', 'Rivas-Bonilla', 'grivas8325@conestogac.on.ca')," +
                "('John', 'Doe', 'jdoe@email.com')," +
                "('Bill', 'Chair', 'bchair@gmail.com')," +
                "('Zuko', 'Lee', 'zlee@hotmail.com');";
            let options = [];
            function success(){
                console.log("Users table has been filled with data");
            }
            tx.executeSql(sql, options, success, errorHandler);
        }

        //games
        function insertIntoGames(tx){
            let sql = "INSERT INTO games (game_name, publish_date, genre_id, company_name)" +
                "VALUES" +
                "('Minecraft', '2011-11-18', 3, 'Mojang')," +
                "('The Legend Of Zelda: Breath of the Wild', '2017-03-03', 5, 'Nintendo')," +
                "('Rimworld', '2013-11-04', 1, 'Ludeon Studios')," +
                "('Mario Kart 8', '2014-05-28', 9, 'Nintendo')," +
                "('The Forest', '2014-05-30', 8, 'Endnight Games');";

            let options = [];
            function success(){
                console.log("Games table has been filled with data");
            }
            tx.executeSql(sql, options, success, errorHandler);
        }

        //reviews
        function insertIntoReviews(tx){
            let sql = "INSERT INTO reviews (game_id, title, comment, rating, date_posted)" +
                "VALUES" +
                "(1, 'Best game ever!', 'This game is so good, best game ever', 10, '2016-01-01 10:20')," +
                "(4, 'Too Fast', 'The cars go way too fast for me, I cannot keep up worst game ever', 2, '2018-01-05 06:12')," +
                "(1, 'Good game', 'Not my favourite, but still really good', 8, '2023-02-04 12:45');";

            let options = [];
            function success(){
                console.log("Reviews table has been filled with data");
            }
            tx.executeSql(sql, options, success, errorHandler);
        }



        function successTransaction(){
            console.log("Data insert successful");
        }
        db.transaction(insertIntoGenre, errorHandler, successTransaction);
        db.transaction(insertIntoUsers, errorHandler, successTransaction);
        db.transaction(insertIntoGames, errorHandler, successTransaction);
        db.transaction(insertIntoReviews, errorHandler, successTransaction);
    }
}