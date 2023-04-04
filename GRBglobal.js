
/**
 * File Name: GRBglobal
 *
 * Revision History:
 *       Gloria Rivas-Bonilla, 4/01/2023 : Created
 */

function btnSignUp_click() {
    //validations
    addMember();
}


function btnAddReview_click() {
    //validations
    addReview();
}

function btnAddGame_click() {
    //validations
    addGame();
}

function signUp_pageshow() {
    resetSignUpValues();
}

function addNewGame_pageshow() {
    resetNewGameValues();
}

function addReview_pageshow() {
    resetAddReviewValues();
}


function init(){
    $("#btnSignUp").on("click", btnSignUp_click);
    $("#btnAddReview").on("click", btnAddReview_click);
    $("#btnAddGame").on("click", btnAddGame_click);
    // refresh page forms on pageshow
    $("#pageSignUp").on("pageshow", signUp_pageshow);
    $("#pageAddNewGame").on("pageshow", addNewGame_pageshow);
    $("#pageAddReview").on("pageshow", addReview_pageshow);
}

// initializing db
function initDB(){
    try{
        DB.createDatabase();
        DB.dropTables();

        if (db){
            DB.createTables();
            DB.inputData();
        }
        else{
            console.error("Error creating tables");
        }
    }catch (e){
        console.error("Failure in db creation");
    }
}

//ready event
$(document).ready(function () {
    init();
    initDB();
});

