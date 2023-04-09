/**
 * File Name: GRBDAL
 *
 * Revision History:
 *       Gloria Rivas-Bonilla, 4/04/2023 : Created
 */

//CRUD for users table
var Users={
    insert: function(options, callback){
        function insertUser(tx){
            let sql = "INSERT INTO users (user_first_name, user_last_name, user_email) VALUES(?,?,?);";
            tx.executeSql(sql,options,callback,errorHandler);
        }
        function successTransaction(){
            console.log("Success: insert into users successful");
        }
        db.transaction(insertUser, errorHandler, successTransaction);
    },
    select: function(options, callback){
        function selectUser(tx){
            let sql = "SELECT * FROM users WHERE user_id=?;";
            tx.executeSql(sql,options,callback,errorHandler);
        }
        function successTransaction(){
            console.log("Success: select a users successful");
        }
        db.transaction(selectUser, errorHandler, successTransaction);
    },
    selectAll: function(options, callback){
        function selectAllUser(tx){
            let sql = "SELECT * FROM users;";
            tx.executeSql(sql,options,callback,errorHandler);
        }
        function successTransaction(){
            console.log("Success: select all users successful");
        }
        db.transaction(selectAllUser, errorHandler, successTransaction);
    },
    update: function(options, callback){
        function updateUser(tx){
            let sql = "UPDATE users SET user_first_name=?, user_last_name=?, user_email=? WHERE user_id=?;";
            tx.executeSql(sql,options,callback,errorHandler);
        }
        function successTransaction(){
            console.log("Success: select all users successful");
        }
        db.transaction(updateUser, errorHandler, successTransaction);
    },
    delete: function(options, callback){
        function deleteUser(tx){
            let sql = "DELETE FROM users WHERE user_id=?;";
            tx.executeSql(sql,options,callback,errorHandler);
        }
        function successTransaction(){
            console.log("Success: select all users successful");
        }
        db.transaction(deleteUser, errorHandler, successTransaction);
    }
}

//CRUD for games table
var Games={
    insert: function(options, callback){
        function insertGames(tx){
            let sql = "INSERT INTO games (game_name, publish_date, genre_id, company_name) VALUES(?,?,?,?);";
            tx.executeSql(sql,options,callback,errorHandler);
        }
        function successTransaction(){
            console.log("Success: insert into users successful");
        }
        db.transaction(insertGames, errorHandler, successTransaction);
    },
    select: function(options, callback){
        function selectGame(tx){
            let sql = "SELECT * FROM games WHERE game_id=?;";
            tx.executeSql(sql,options,callback,errorHandler);
        }
        function successTransaction(){
            console.log("Success: select a users successful");
        }
        db.transaction(selectGame, errorHandler, successTransaction);
    },
    selectAll: function(options, callback){
        function selectAllGames(tx){
            let sql = "SELECT * FROM games;";
            tx.executeSql(sql,options,callback,errorHandler);
        }
        function successTransaction(){
            console.log("Success: select all users successful");
        }
        db.transaction(selectAllGames, errorHandler, successTransaction);
    },
    selectWithGenreReviews: function(options,callback){
        function selectGamesGenreReviews(tx){
            let sql = "SELECT game_id, game_name, publish_date, genre_id, company_name, genre_name, COUNT(review_id) AS review_count, AVG(rating) AS rating FROM games LEFT JOIN genre USING (genre_id) LEFT JOIN reviews USING (game_id) WHERE game_id=?;";
            tx.executeSql(sql,options,callback,errorHandler);
        }
        function successTransaction(){
            console.log("Success: select all games and genres and reviews successful");
        }
        db.transaction(selectGamesGenreReviews, errorHandler, successTransaction);
    },
    update: function(options, callback){
        function updateGame(tx){
            let sql = "UPDATE games SET game_name=?, publish_date=?, genre_id=?, company_name=? WHERE game_id=?;";
            tx.executeSql(sql,options,callback,errorHandler);
        }
        function successTransaction(){
            console.log("Success: update game successful");
        }
        db.transaction(updateGame, errorHandler, successTransaction);
    },
    delete: function(options, callback){
        function deleteGame(tx){
            let sql = "DELETE FROM games WHERE game_id=?;";
            tx.executeSql(sql,options,callback,errorHandler);
        }
        function successTransaction(){
            console.log("Success: select all users successful");
        }
        db.transaction(deleteGame, errorHandler, successTransaction);
    }
}
//CRUD for reviews table
var Reviews={
    insert: function(options, callback){
        function insertReviews(tx){
            let sql = "INSERT INTO reviews (game_id, title, comment, rating, date_posted) VALUES(?,?,?,?,?);";
            tx.executeSql(sql,options,callback,errorHandler);
        }
        function successTransaction(){
            console.log("Success: insert into reviews successful");
        }
        db.transaction(insertReviews, errorHandler, successTransaction);
    },
    select: function(options, callback){
        function selectReview(tx){
            let sql = "SELECT * FROM reviews WHERE review_id=?;";
            tx.executeSql(sql,options,callback,errorHandler);
        }
        function successTransaction(){
            console.log("Success: select a review successful");
        }
        db.transaction(selectReview, errorHandler, successTransaction);
    },
    selectAll: function(options, callback){
        function selectAllReviews(tx){
            let sql = "SELECT * FROM reviews RIGHT JOIN games USING (game_id) WHERE game_id=?;";
            tx.executeSql(sql,options,callback,errorHandler);
        }
        function successTransaction(){
            console.log("Success: select all reviews successful");
        }
        db.transaction(selectAllReviews, errorHandler, successTransaction);
    },
    update: function(options, callback){
        function updateReview(tx){
            let sql = "UPDATE reviews SET game_id=?, title=?, comment=?, rating=?, date_posted=? WHERE review_id=?;";
            tx.executeSql(sql,options,callback,errorHandler);
        }
        function successTransaction(){
            console.log("Success: Update review successful");
        }
        db.transaction(updateReview, errorHandler, successTransaction);
    },
    delete: function(options, callback){
        function deleteReview(tx){
            let sql = "DELETE FROM reviews WHERE review_id=?;";
            tx.executeSql(sql,options,callback,errorHandler);
        }
        function successTransaction(){
            console.log("Success: Delete a review successful");
        }
        db.transaction(deleteReview, errorHandler, successTransaction);
    }
}

//CRUD for genre table
var Genre={
    selectAll: function(options, callback){
        function selectAllGenres(tx){
            let sql = "SELECT * FROM genre;";
            tx.executeSql(sql,options,callback,errorHandler);
        }
        function successTransaction(){
            console.log("Success: select all genres successful");
        }
        db.transaction(selectAllGenres, errorHandler, successTransaction);
    }
}