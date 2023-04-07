/**
 * File Name: GRBfacade
 *
 * Revision History:
 *       Gloria Rivas-Bonilla, 4/02/2023 : Created
 */


//users pages
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


//game pages
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
            console.log("New Game has been added");
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
        $("#lstGames").on("click", linkClickHandler);
    }
    Games.selectAll(options, callbackGames);
}

//reset text values to empty
function resetNewGameValues(){
    $("#txtGameTitle").val("");
    $("#dtPublishDate").val("");
    $("#txtCompany").val("");
}

//review pages
function resetAddReviewValues(){
    $("#txtReviewTitle").val("");
    $("#txtReviewComments").val("");
    $("#txtReviewRating").val("");
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