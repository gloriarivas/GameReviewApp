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
                required: true,
                maxlength: 25
            },
            txtLastName:{
                required: true,
                maxlength: 25
            },
            txtEmail:{
                required: true,
                checkEmail: true,
                maxlength: 40
            }
        },
        messages:{
            txtFirstName:{
                required: "First name is required",
                maxlength: "Max characters is 25"
            },
            txtLastName:{
                required: "Last name is required",
                maxlength: "Max characters is 25"
            },
            txtEmail:{
                required: "Email is required",
                checkEmail: "Email is not valid",
                maxlength: "Max characters is 40"
            }
        }
    });
    return form.valid();
}

//validation for modify user
function doValidation_frmModifyMember(){
    let form = $("#frmModifyMember");
    form.validate({
        rules:{
            txtModifyFirstName:{
                required: true,
                maxlength: 25
            },
            txtModifyLastName:{
                required: true,
                maxlength: 25
            },
            txtModifyEmail:{
                required: true,
                checkEmail: true,
                maxlength: 40
            }
        },
        messages:{
            txtModifyFirstName:{
                required: "First name is required",
                maxlength: "Max characters is 25"
            },
            txtModifyLastName:{
                required: "Last name is required",
                maxlength: "Max characters is 25"
            },
            txtModifyEmail:{
                required: "Email is required",
                checkEmail: "Email is not valid",
                maxlength: "Max characters is 40"
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
                required: true,
                maxlength: 30
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
                required: "Review must have a title",
                maxlength: "Max characters for title is 30"
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

function doValidation_frmModifyReview(){
    let form = $("#frmModifyReview");
    form.validate({
        rules:{
            txtModifyReviewTitle:{
                required: true,
                maxlength: 30
            },
            txtModifyReviewComments:{
                required: true,
                minlength: 5
            },
            txtModifyReviewRating:{
                required: true,
                minlength: 0,
                maxlength: 10
            }
        },
        messages:{
            txtModifyReviewTitle:{
                required: "Review must have a title",
                maxlength: "Max characters for title is 30"
            },
            txtModifyReviewComments:{
                required: "Review needs to have comments",
                minlength: "Comment needs to be at least 5 characters long"
            },
            txtModifyReviewRating:{
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
                required: true,
                maxlength: 100 //db max is 100, so 100 as to not give the db any errors
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
                required: "Game Title is required",
                maxlength: "Max allowed characters is 25"
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

//Validations for Modify game
function doValidation_frmModifyGame(){

    let form = $("#frmModifyGame");

    form.validate({
        rules:{
            txtModifyGameTitle:{
                required: true,
                maxlength: 100 //db max is 100, so 100 as to not give the db any errors
            },
            dtModifyPublishDate:{
                required: true,
                maxDate: true
            },
            txtModifyCompany:{
                required: true
            }
        },
        messages:{
            txtModifyGameTitle:{
                required: "Game Title is required",
                maxlength: "Max allowed characters is 25"
            },
            dtModifyPublishDate:{
                required:"Publish Date is required"
            },
            txtModifyCompany:{
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