/**
 * File Name: GRBfacade
 *
 * Revision History:
 *       Gloria Rivas-Bonilla, 4/02/2023 : Created
 */

function addMember(){
    if (doValidation_frmSignUp()){
        console.log("Sign Up form is valid");

        let firstName = $("#txtFirstName").val();
        let lastName = $("#txtLastName").val();
        let email = $("#txtEmail").val();
        console.log(`First name: ${firstName}, Last name: ${lastName}, Email: ${email}`);

        function callback(){
            console.log("Member has been added");
        }
        //insert into db; members table
    }
    else{
        console.log("Sign up form is NOT valid");
    }
}

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

        let gameTitle = $("#txtGameTitle").val();
        let publishDate = $("#dtPublishDate").val();
        let genre = $("#cmbGenre").val();
        let company = $("#txtCompany").val();
        console.log(`Game: ${gameTitle}, Date: ${publishDate}, Genre: ${genre}, Company: ${company}`);

        function callback(){
            console.log("New Game has been added");
        }
    }
    else{
        console.log("Add game is NOT valid");
    }
}