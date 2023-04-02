/**
 * File Name: GRButil
 *
 * Revision History:
 *       Gloria Rivas-Bonilla, 4/02/2023 : Created
 */

//validations for Sign Up
function doValidation_frmSignUp(){
    let form = $("#frmSignUp");
    form.validate({
        rules:{
            txtFirstName:{
                required: true
            },
            txtLastName:{
                required: true
            },
            txtEmail:{
                required: true,
                checkEmail: true
            }
        },
        messages:{
            txtFirstName:{
                required: "First name is required"
            },
            txtLastName:{
                required: "Last name is required"
            },
            txtEmail:{
                required: "Email is required",
                checkEmail: "Email is not valid"
            }
        }
    });
    return form.valid();
}

//Validations for Add Review
function doValidation_frmAddReview(){
    let form = $("#frmAddReview");
    form.validate({
        rules:{
            txtReviewTitle:{
                required: true
            },
            txtReviewComments:{
                required: true,
                minlength: 5
            },
            txtReviewRating:{
                required: true,
                minlength: 0,
                maxlength: 10
            }
        },
        messages:{
            txtReviewTitle:{
                required: "Review must have a title"
            },
            txtReviewComments:{
                required: "Review needs to have comments",
                minlength: "Comment needs to be at least 5 characters long"
            },
            txtReviewRating:{
                required: "A rating is required"
            }
        }
    });
    return form.valid();
}

//Validations for Add Game
function doValidation_frmAddGame(){
    let form = $("#frmAddGame");

    form.validate({
        rules:{
            txtGameTitle:{
                required: true
            },
            dtPublishDate:{
                required: true,
                maxDate: true
            },
            txtCompany:{
                required: true
            }
        },
        messages:{
            txtGameTitle:{
                required: "Game Title is required"
            },
            dtPublishDate:{
                required:"Publish Date is required"
            },
            txtCompany:{
                required: "Company name is required"
            }
        }
    });
    return form.valid();
}

//email validator
jQuery.validator.addMethod("checkEmail",
    function(v, e){
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return this.optional(e) || emailRegex.test(v);
    },
    "Email entered is invalid");

//max date
jQuery.validator.addMethod("maxDate",
    function(v,e){
        let maximum = new Date();
        let inputDate = $("#dtPublishDate").val();
        console.log(maximum.toISOString().slice(0,10) + "    " + inputDate);
        //change format so it matched input
        if (maximum.toISOString().slice(0,10) >= inputDate){
            return true;
        }
        else{
            return false;
        }
    },"Publish date cannot be before today's date");