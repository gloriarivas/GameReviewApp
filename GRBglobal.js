
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
    updateGenreDropdown();
}

function addReview_pageshow() {
    resetAddReviewValues();
}


function showAllMembers_pageshow() {
    getAllUsers();
}

function showMember_pageshow() {
    showCurrentUser();
}

function btnModifyMember_click() {
    modifyMember();
}

function btnDeleteMember_click() {
    deleteCurrentUser();
}

function showAllGames_pageshow() {
    getAllGames();
}

function btnReviews_click() {
    //go to reviews page
    window.location.href = "#pageReviewsList";
    //populate reviews page
    getAllReviews();
}

function gameDetails_pageshow() {
    showCurrentGame();
}

function reviewsList_pageshow() {
    getAllReviews();
}

function init(){
    //forms
    $("#btnSignUp").on("click", btnSignUp_click);
    $("#btnModifyMember").on("click", btnModifyMember_click);
    $("#btnDeleteMember").on("click", btnDeleteMember_click);
    $("#btnReviews").on("click", btnReviews_click);

    $("#btnAddReview").on("click", btnAddReview_click);
    $("#btnAddGame").on("click", btnAddGame_click);
    // refresh page forms on pageshow
    $("#pageSignUp").on("pageshow", signUp_pageshow);
    $("#pageAddNewGame").on("pageshow", addNewGame_pageshow);
    $("#pageAddReview").on("pageshow", addReview_pageshow);

    $("#pageAllMembers").on("pageshow", showAllMembers_pageshow);
    $("#pageModifyMember").on("pageshow", showMember_pageshow);
    $("#pageGameList").on("pageshow", showAllGames_pageshow);
    $("#pageGameDetail").on("pageshow", gameDetails_pageshow);
    $("#pageReviewsList").on("pageshow", reviewsList_pageshow);
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

