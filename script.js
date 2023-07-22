

let formFields = $("fieldset")

let activeForm =$("active")

function currentField(formFields){
    for (let index = 0; index < formFields.length; index++) {
        
        if($(formFields[index]).hasClass("active")){
            return index
        }

    }
}

//this code is for progress bar percentage

let formProgress=0
$("form input, form select").on("input", function() {
    
    //if input has value and doesnt have full clase, we add percentage to the progress
    if($(this).val()!=="" && !$(this).hasClass("full") ){
        formProgress += 1 / ($('form input[value!=""], form select').length);
        setBarPercentage(Math.floor(formProgress * 100));
        $(this).addClass("full") 
    }
    //else, input is empty, we substract his value in percentage
    //if it is a checkbox and was putted in false, we substract his value

     else if($(this).val()=="" || $(this).attr("type")=="checkbox" && $(this).prop("checked")==false ){
      
        formProgress -= 1 / ($('form input[value!=""], form select').length);
       
        setBarPercentage(Math.floor(  formProgress *100 )); 
        $(this).removeClass("full")
     }
    
});



//Form validation
$.validator.setDefaults( {
    submitHandler: function () {
        alert( "submitted!" );
    }
} );

$(document).ready(function (){
    form = $("#register-form")
    form.validate({
        rules:{
            name:"required",
            surname: "required",
            genre: "required",
            date_birth: "required",
            country_birth: "required",
            state_birth: "required",
            city_birth: "required",
            personal_document_file: "required",
    
            password:{
                required: true,
                minlength: 8
            },
            repeat_password:{
                required: true,
                minlength: 8,
                equalTo: "#password"
            },
            accept_terms:"required"

    
        },
     
        messages:{
            name:"Por favor introduce tu nombre(s)",
            surname: "Por favor introduce tu apellido paterno",
            genre: "Por favor elige un género",
            date_birth: "Por favor, introduce tu fecha de nacimiento",
            country_birth: "Por favor, introduce tu país de nacimiento",
            state_birth: "Por favor, introduce tu estado de nacimiento",
            city_birth:"Por fabor introduce tu ciudad de nacimiento",
            personal_document_file: "Por favor, adjunta tu documento personal",
            password:{
                required:"Por favor introduce la contraseña",
                minlength: "Tu contraseña debe tener minimo 8 caracteres"
            },
            repeat_password:{
                required:"Por favor introduce la contraseña",
                minlength: "Tu contraseña debe tener minimo 8 caracteres",
                equalTo:"Por favor introduce la misma contraseña"
            },
            accept_terms:"Por favor acepta nuestras politicas"
    
        },
        errorElement: "em",
        errorPlacement: function (error, element){
        error.addClass("help-block")
           
       
        },

        sucess: function (label, element){
            
        },

        highlight: function (element, errorClass, validClass){
            $(element).addClass("has-error border-danger").removeClass("has-sucess border-success")
            $(element).next().addClass("text-danger")
        },
        unhighlight: function (element, errorClass, validClass){
            
            $(element).addClass("has-sucess border-success").removeClass("has-error border-danger")
            $(element).next().removeClass("text-danger")
            
        }
    
    });
})





function setBarPercentage(barPercentage){
    $(".progress-bar").css("width", barPercentage+"%")
    $(".progress-percentage").animate({ opacity: 0 }, 150, function() {
        $(this).html(barPercentage + "%").animate({ opacity: 1 }, 300);
    });
}

function setSteps(indexOfCurrentField){
    let numberSteps = formFields.length
    let currentStep = indexOfCurrentField
    $(".step-counter").html("Paso "+(currentStep+1)+" de " +numberSteps)
}


$(".previous").click(function(){
    indexOfCurrentField = currentField(formFields);
    setSteps(indexOfCurrentField - 1);

    let currentFormField = formFields[indexOfCurrentField];
    let previousFormField = formFields[indexOfCurrentField - 1];

    $(currentFormField).animate(
        {
            opacity: 0,
            position: "relative",
            left: "50px"
        },
        250,
        function(){
            $(currentFormField).removeClass("active");
            $(previousFormField).addClass("active");
            $(currentFormField).css({ "opacity": 1, "left": 0 });
        }
    );
});

$(".next").click(function(){

    if(form.valid()){
    indexOfCurrentField = currentField(formFields);
    setSteps(indexOfCurrentField + 1);

    

    let currentFormField = formFields[indexOfCurrentField];
    let nextFormField = formFields[indexOfCurrentField + 1];

    $(currentFormField).animate(
        {
            opacity: 0,
            position: "relative",
            left: "50px"
        },
        250,
        function(){
            $(currentFormField).removeClass("active");
            $(nextFormField).addClass("active");
            $(currentFormField).css({ "opacity": 1, "left": 0 });
        }
    );
    }

    
});







