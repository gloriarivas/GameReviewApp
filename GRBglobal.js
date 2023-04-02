
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

//ready function
function init(){
    $("#btnSignUp").on("click", btnSignUp_click);
    $("#btnAddReview").on("click", btnAddReview_click);
    $("#btnAddGame").on("click", btnAddGame_click);
}


//ready event
$(document).ready(function () {
    init();
});