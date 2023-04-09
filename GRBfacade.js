/**
 * File Name: GRBfacade
 *
 * Revision History:
 *       Gloria Rivas-Bonilla, 4/02/2023 : Created
 */


/**               USERS PAGES                     **/
function addMember(){
    if (doValidation_frmSignUp()){
        console.log("Sign Up form is valid");

        let user_first_name = $("#txtFirstName").val();
        let user_last_name = $("#txtLastName").val();
        let user_email = $("#txtEmail").val();
        console.log(`First name: ${user_first_name}, Last name: ${user_last_name}, Email: ${user_email}`);
        let options = [user_first_name, user_last_name, user_email];

        function callback(){
            alert("User has been added");
        }
        //insert into db; users table
        Users.insert(options,callback);
        //after record is added, reset the form
        resetSignUpValues();
        //after record is added, go back to all members page
        $(location).prop('href', "#pageAllMembers");
    }
    else{
        console.log("Sign up form is NOT valid");
    }
}
//validations for modify users
function modifyMember(){
    if (doValidation_frmModifyMember()){
        console.log("Modify member is valid");

        let user_first_name = $("#txtModifyFirstName").val();
        let user_last_name = $("#txtModifyLastName").val();
        let user_email = $("#txtModifyEmail").val();

        let user_id = localStorage.getItem("user_id")

        console.log(`First name: ${user_first_name}, Last name: ${user_last_name}, Email: ${user_email}`);
        let options = [user_first_name, user_last_name, user_email, user_id];

        function callback(){
            alert("User has been modified");
            //after record is added, go back to all members page
            $(location).prop('href', "#pageAllMembers");
        }
        //insert into db; users table
        Users.update(options,callback);
    }
    else{
        console.log("Modify member form is NOT valid");
    }
}

//get all users (using select all function in DAL)
function getAllUsers(){
    let options = [];

    function callbackUsers(tx, results){
        let htmlCode = "";
        let lv = $("#lstUsers");
        //array for names
        let names = [];

        //loop through each row in the users table in DB, will need 2 loops, one to sort names alphabetically
        for (let i = 0; i < results.rows.length; i++){

            let row = results.rows[i];
            let name = row['user_first_name']
            names.push(name);
        }

        let sortedNames = names.sort();

        let printedNames = 0;

        //keep looping until all names are used
        do{
            //loop though all the names each time
            for (let i = 0; i < results.rows.length; i++) {
                let row = results.rows[i];

                if (row['user_first_name'] === sortedNames[printedNames]) {

                    htmlCode += `<li>
                                <a href="#" data-row-id="${row['user_id']}">
                                    ${row['user_first_name']} ${row['user_last_name']}
                                </a>
                            </li>`
                    lv = lv.html(htmlCode);
                    lv.listview("refresh");
                }
            }
            printedNames++;
        }while(printedNames < results.rows.length);

        // add a click event to be able to navigate to details page
        function linkClickHandler(){
            localStorage.setItem("user_id", $(this).attr('data-row-id'));
            $(location).prop('href', "#pageModifyMember");
        }

        $("#lstUsers a").on("click", linkClickHandler);
    }
    Users.selectAll(options, callbackUsers);
}

//select one review from users table
function showCurrentUser(){
    //get id from local storage
    let id = localStorage.getItem("user_id");
    let options = [id];
    console.log(id);


    function selectUserCallback(tx, results){

        console.log(id);
        let row = results.rows[0];

        //give values to text boxes and header
        $("#headModifyUser").html(`Edit ${row['user_first_name']} ${row['user_last_name']}`);
        $("#txtModifyFirstName").val(row['user_first_name']);
        $("#txtModifyLastName").val(row['user_last_name']);
        $("#txtModifyEmail").val(row['user_email']);
    }

    Users.select(options, selectUserCallback);
}

//delete selected user from the database
function deleteCurrentUser(){
    let user_id = localStorage.getItem("user_id");
    let options = [user_id];

    function callback(){
        alert("User Deleted");
        //go back to all members page
        $(location).prop('href', "#pageAllMembers");
    }
    Users.delete(options, callback);
}

function resetSignUpValues(){
    $("#txtFirstName").val("");
    $("#txtLastName").val("");
    $("#txtEmail").val("");
}


/**               GAMES PAGES             **/
//select one game from the games table
function showCurrentGame(){
    //get id from local storage
    let id = localStorage.getItem("game_id");
    let options = [id];
    console.log(id);

    function selectGameCallback(tx,results){
        let row = results.rows[0];
        console.log(row);
        console.log(location.hash);
        //change output depending on what page is displayed
        if (location.hash === "#pageGameDetail"){
            //give the values to text boxes
            $("#headGameName").html(row['game_name']);
            $("#pGameDate").html(`Date Published: ${row['publish_date']}`);
            $("#pGameGenre").html(`Genre: ${row['genre_name']}`);
            if (row['rating'] == null){
                $("#pNumberOfReviews").html("");
                $("#pGameRating").html("");
            }
            else{
                $("#pNumberOfReviews").html(`Reviews: ${row['review_count']}`);
                $("#pGameRating").html(`Rating: ${row['rating']}/10`);
            }
            $("#pGameCompany").html(`Created by: ${row['company_name']}`);

        }
        else if (location.hash === "#pageModifyGame"){
            //populate form with game data from db
            $("#modifyGameHead").html(`Edit ${row['game_name']}`);
            $("#modGameHead").html(row['game_name']);
            $("#txtModifyGameTitle").val(row["game_name"]);
            $("#dtModifyPublishDate").val(row['publish_date']);
            $("#cmbModifyGenre").prop("selectedIndex", row['genre_id']).change();
            $("#txtModifyCompany").val(row['company_name']);
        }
    }
    Games.selectWithGenreReviews(options, selectGameCallback);
}

//update game in db
function updateGame(){
    if (doValidation_frmModifyGame()){

        console.log("Modify game is valid");

        //add game id
        let game_id = localStorage.getItem("game_id");
        let game_name = $("#txtModifyGameTitle").val();
        let publish_date = $("#dtModifyPublishDate").val();
        let genre_id = $("#cmbModifyGenre").val();
        let company_name = $("#txtModifyCompany").val();

        console.log(`Game: ${game_name}, Date: ${publish_date}, Genre: ${genre_id}, Company: ${company_name}`);
        let options = [game_name, publish_date, genre_id, company_name, game_id];
        function callback(){
            alert(`${game_name} has been updated`);
            $(location).prop('href', "#pageGameList");
        }
        Games.update(options, callback);
    }
    else{
        console.log("Modify game is NOT valid");
    }
}

//delete selected game from the database
function deleteCurrentGame(){
    let game_id = localStorage.getItem("game_id");
    let options = [game_id];

    function callback(){
        alert("Game Deleted");
        //go back to all games page
        $(location).prop('href', "#pageGameList");
    }
    Games.delete(options, callback);
}

function addGame(){
    if (doValidation_frmAddGame()){
        console.log("Add game is valid");

        let game_name = $("#txtGameTitle").val();
        let publish_date = $("#dtPublishDate").val();
        let genre_id = $("#cmbGenre").val();
        let company_name = $("#txtCompany").val();
        console.log(`Game: ${game_name}, Date: ${publish_date}, Genre: ${genre_id}, Company: ${company_name}`);
        let options = [game_name, publish_date, genre_id, company_name];
        function callback(){
            alert("New Game has been added");
            $(location).prop('href', "#pageGameList");
        }
        Games.insert(options, callback);
    }
    else{
        console.log("Add game is NOT valid");
    }
}

//select all games
function getAllGames(){
    let options = [];

    function callbackGames(tx,results){
        let htmlCode = "";
        let lv = $("#lstGames");

        for (let i = 0; i< results.rows.length; i++){
            let row = results.rows[i];
            console.log(row);
            htmlCode += `<li>
                            <a data-inset="true" data-row-id="${row['game_id']}" href="#">
                                <h2>${row['game_name']}</h2>
                                <p>
                                    Created by: ${row['company_name']}<br>
                                    Publish Date: ${row['publish_date']}<br>
                                </p>
                            </a>
                        </li>`;

        }
        lv = lv.html(htmlCode);
        lv.listview("refresh");

        //add a click event to take to details page
        function linkClickHandler(){
            localStorage.setItem("game_id", $(this).attr('data-row-id'));
            $(location).prop('href', "#pageGameDetail");
        }
        $("#lstGames a").on("click", linkClickHandler);
    }
    Games.selectAll(options, callbackGames);
}

//reset text values to empty
function resetNewGameValues(){
    $("#txtGameTitle").val("");
    $("#dtPublishDate").val("");
    $("#txtCompany").val("");
}

//dropdowns for genres (add game and modify pages)
function updateGenreDropdown(){
    let options = [];
    let htmlCode = "";

    function callback(tx, results){
        for (var i = 0; i < results.rows.length; i++){
            let row = results.rows[i];

            htmlCode += `<option value=${row['genre_id']}>${row['genre_name']}</option>`;

            let cBox = $("#cmbGenre");
            let cBoxModify = $("#cmbModifyGenre");
            cBox = cBox.html(htmlCode).change();
            cBoxModify = cBoxModify.html(htmlCode).change();
        }
    }
    Genre.selectAll(options, callback);
}


/**                         REVIEW PAGES                **/
function addReview(){
    if (doValidation_frmAddReview()){
        console.log("Add review is valid");

        let title = $("#txtReviewTitle").val();
        let comments = $("#txtReviewComments").val();
        let rating = $("#txtReviewRating").val();
        console.log(`Title: ${title}, Comments: ${comments}, Rating: ${rating}`);

        function callback(){
            console.log("Review has been added");
        }
        //insert into db; reviews table
    }
    else{
        console.log("Add review form is NOT valid");
    }
}

function resetAddReviewValues(){
    $("#txtReviewTitle").val("");
    $("#txtReviewComments").val("");
    $("#txtReviewRating").val("");
}

//get all reviews for a specific game
function getAllReviews(){
    let id = localStorage.getItem("game_id");
    let options = [id];

    function selectReviewsCallback(tx,result){
        let htmlCode = "";
        let lv = $("#lstReviews");
        let rating = 0;

        let firstRow = result.rows[0];
        console.log(firstRow);
        //heading
        $("#reviewsHead").html(`Reviews for ${firstRow['game_name']}`);

        if (firstRow['review_id'] === null){
            console.log("review id is null");
            $("#ratingHead").html("No reviews yet!");
            lv = lv.html(htmlCode);
            lv.listview("refresh");
        }
        else{
            //loop through each review
            for (let i = 0; i < result.rows.length; i++) {
                let row = result.rows[i];

                htmlCode += `<li data-icon="carat-r">
                                <a data-row-id="${row['review_id']}" href="#" style="width: 83%">
                                    <h2>${row['title']}</h2>
                                    <p>
                                        ${row['comment']}<br>
                                        Rating: ${row['rating']}/10<br>
                                        Date Posted: ${row['date_posted']}
                                    </p>
                                </a>
                            </li>`;

                rating += row['rating'];
            }

            $("#ratingHead").html(`Rating: ${rating/result.rows.length}/10`);
            lv = lv.html(htmlCode);
            lv.listview("refresh");

            //add click event
            function linkClickHandler(){
                localStorage.setItem("review_id", $(this).attr('data-row-id'));
                $(location).prop('href', "#pageReviewDetail");
            }
            $("#lstReviews a").on("click", linkClickHandler);
        }

    }
    Reviews.selectAll(options, selectReviewsCallback);
}

function getOneReview(){
    let id = localStorage.getItem("review_id");
    let options = [id];

    function selectReviewCallback(tx,results){

        //give values to page

    }
}