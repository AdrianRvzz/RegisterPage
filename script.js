let formFields = $("fieldset").toArray();

function currentField(formFields) {
  return formFields.findIndex((field) => $(field).hasClass("active"));
}

function setBarPercentage(barPercentage) {
  var progressBar = $(".progress-bar");
  var progressPercentage = $(".progress-percentage");

  progressBar.stop().css("width", barPercentage + "%");

  progressPercentage.stop().animate({ opacity: 0 }, 150, function () {
    $(this)
      .html(barPercentage + "%")
      .animate({ opacity: 1 }, 300);
  });
}

function setSteps(indexOfCurrentField) {
  let numberSteps = formFields.length;
  let currentStep = indexOfCurrentField;
  $(".step-counter").html("Paso " + (currentStep + 1) + " de " + numberSteps);
}

//New progress bar function

function updateProgressBar() {
  var totalInputs = $(".input-to-fill").length;
  var successInputs = $(".has-success.input-to-fill").length;
  var successPercentage = (successInputs / totalInputs) * 100;
  setBarPercentage(Math.floor(successPercentage));
}

//------------------------------------

//Form validation
$.validator.setDefaults({
  submitHandler: function () {
    console.log("submitted!");
    createAccount();
  },
});


//JQuery validation plugin new methods
jQuery.validator.addMethod(
  "password_validation",
  function (value, element) {
    return this.optional(element) || validatePassword(value);
  },
  "Password error"
);
$("#password").on("change",function(){

})
$("#password").on("input",function(){
  
  let mayus = new RegExp("^(?=.*[A-Z])");
  let special = new RegExp("^(?=.*[!@#$%&*])");
  let numbers = new RegExp("^(?=.*[0-9])");
  let lower = new RegExp("^(?=.*[a-z])");

  let pass= $("#password").val()
  
  if(pass.length < 8 || pass.length > 20){
    $(".length").parent().removeClass("text-success").addClass("text-danger")
    $(".length").html("circle")
  }else{
    $(".length").parent().removeClass("text-danger").addClass("text-success")
    $(".length").html("check_circle")
  }

  if(!mayus.test(pass) || !lower.test(pass)){
    $(".upperAndLower").parent().removeClass("text-success").addClass("text-danger")
    $(".upperAndLower").html("circle")

  }else{
    $(".upperAndLower").parent().removeClass("text-danger").addClass("text-success")
    $(".upperAndLower").html("check_circle")
  }

  if(!special.test(pass) && !numbers.test(pass)){
    $(".numberAndSpecial").parent().removeClass("text-success").addClass("text-danger")
    $(".numberAndSpecial").html("circle")
  }else{
    $(".numberAndSpecial").parent().removeClass("text-danger").addClass("text-success")
    $(".numberAndSpecial").html("check_circle")
  }

})


function validatePassword(pass) {
  let regExp = new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%&*0-9]).{8,20}$");
  return regExp.test(pass);
}

let passShowed=false
$(".hint-password").on("click", function(e){
  e.preventDefault()
  
    if(!passShowed){
      $(this).html("visibility_off")
      passShowed=true
      $("#password").prop("type", "text")
    }
    else{$(this).html("visibility")
    $("#password").prop("type", "password")
    passShowed=false
    }
  })


jQuery.validator.addMethod(
  "check_required",
  function (value, element) {
    return element.checked;
  },
  "Por favor, acepta nuestras políticas"
);



$(document).ready(function () {
  form = $("#register-form");
  form.validate({
    rules: {
      first_name: "required",
      last_name: "required",
      gender: "required",
      date_birth: "required",
      country_birth: "required",
      state_birth: "required",
      city_birth: "required",
      personal_document_file: "required",
      password: {
        required: true,
        password_validation: true,
        minlength: 8,
      },
      repeat_password: {
        required: true,
        minlength: 8,
        equalTo: "#password",
      },
      accept_terms: "check_required",
    },

    messages: {
      first_name: "Por favor introduce tu nombre(s)",
      last_name: "Por favor introduce tu apellido paterno",
      gender: "Por favor elige un género",
      date_birth: "Por favor, introduce tu fecha de nacimiento",
      country_birth: "Por favor, introduce tu país de nacimiento",
      state_birth: "Por favor, introduce tu estado de nacimiento",
      city_birth: "Por fabor introduce tu ciudad de nacimiento",
      personal_document_file: "Por favor, adjunta tu documento personal",
      password: {
        required: "Por favor introduce la contraseña",
        minlength: "Tu contraseña debe tener minimo 8 caracteres",
      },
      repeat_password: {
        required: "Por favor introduce la contraseña",
        minlength: "Tu contraseña debe tener minimo 8 caracteres",
        equalTo: "Por favor introduce la misma contraseña",
      },
      accept_terms: "Por favor acepta nuestras politicas",
    },
    errorElement: "em",
    errorPlacement: function (error, element) {
      error.addClass("help-block");
    },

    sucess: function (label, element) {},

    highlight: function (element, errorClass, validClass) {
      $(element).addClass("has-error border-danger").removeClass("has-success border-success");
      $(element).next().addClass("text-danger");
      updateProgressBar();
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).addClass("has-success border-success").removeClass("has-error border-danger");
      $(element).next().removeClass("text-danger");
      updateProgressBar();
    },
  });

  $("#first_name").val("Adrian");
  $("#last_name").val("Rivas");
  $("#second_last_name").val("Escarcega");
  $("#gender").val("H");
  $("#date_birth").val("2003-01-08");
  // $("#country_birth").val("Mexico");
  // $("#state_birth").val("Chihuahua");
  // $("#city_birth").val("Casas Grandes");
  $("#personal_document_file").val("file.pdf");
  $("#password").val("mypassword");
  $("#repeat_password").val("mypassword");
});

//Handle progress bar in check of accept_terms

$("#accept_terms").on("click", function () {
  $("#accept_terms").toggleClass("has-success");
  updateProgressBar();
});

//---------------------------------------------


//Functions of modals
function showModal(modal, message) {
  let currentModal = $("#" + modal);
  currentModal.modal("show");
  if (animationSuccessCompleted && modal == "myModal-success") {
    animationSuccess.goToAndPlay(0, true);
    animationSuccessCompleted = false;
  }
  if (animationFailCompleted && modal == "myModal-fail") {
    animationFail.goToAndPlay(0, true);
    animationFailCompleted = false;
    $(".myModal-fail-description").html(message);
  }
}

function hideModal(modal) {
  $("#" + modal).modal("hide");
}

$("#close-modal").on("click", function () {
  $("#myModal-fail").modal("hide");
});


//---------------------------------------------
//          Creating Animation Objects for Modals
//---------------------------------------------
// Elements of success animation completed
let containerAnimationSuccess = document.getElementById("animation-success");
let animationSuccess;
let animationSuccessCompleted = true;

animationSuccess = lottie.loadAnimation({
  container: containerAnimationSuccess,
  rendered: "svg",
  loop: false,
  autoplay: false,
  path: "https://lottie.host/b0537f55-d7f1-4f70-b3a8-ecde7b3516f2/CpcfdamGzH.json",
});

animationSuccess.addEventListener("complete", () => {
  animationSuccessCompleted = true;
});

// Elements of fail animation completed
let containerAnimationFail = document.getElementById("animation-fail");
let animationFail;
let animationFailCompleted = true;

animationFail = lottie.loadAnimation({
  container: containerAnimationFail,
  rendered: "svg",
  loop: false,
  autoplay: false,
  path: "https://lottie.host/0eb93c21-a905-4aa0-98b1-d8f764839c7d/KbreszfEZs.json",
});

animationFail.addEventListener("complete", () => {
  animationFailCompleted = true;
});

// Elements of loading animation
let containerAnimationLoading = document.getElementById("animation-loading");
let animationLoading;

animationLoading = lottie.loadAnimation({
  container: containerAnimationLoading,
  rendered: "svg",
  loop: true,
  autoplay: true,
  path: "https://lottie.host/a1f44ad1-596a-4bec-ba69-b860ccff6d44/kS7dEee7IU.json",
});
//---------------------------------------------







//Event to change form when the user was not born in mexico it change select to
//inputs, and allows the state input


function toggleInputs(previousInput, newInput){
  previousInput.hide().prop("disabled", true).val("").removeClass("has-success input-to-fill has-error")
  newInput.show().prop("disabled", false).addClass("input-to-fill")
}

$("#country_birth").on("input", function () {
  $("#personal_document_file").val("");
  $("#document-alert").remove();
  var countrySelected = $(this).val();
  if (countrySelected != "MX") {

    toggleInputs($("#state_birth"), $("#state_birth_txt"))
    toggleInputs($("#city_birth"), $("#city_birth_txt"))

    $("#personal-document h2").html(`<h2 class="name-input mb-3">Identificación</h2>`);
    
   
    $("#second_last_name").val("").parent().hide();
    } else {

    toggleInputs($("#state_birth_txt"), $("#state_birth"))
    toggleInputs($("#city_birth_txt"), $("#city_birth"))
    
    $("#personal-document h2").html(
      `<h2 class="name-input mb-3">CURP<a class="" href="https://www.gob.mx/curp/" target="_blank">(descárgala aquí)</a></h2>`
    );
    $("#second_last_name").parent().show();
  }
  $("#city_birth_txt, #city_birth").prop("disabled", true)
  updateProgressBar();
});

$("#state_birth").on("input", function () {
  console.log("Calling AJAX");
  getCitiesFromState($(this).val());
});

$("#state_birth_txt").on("input", function () {
  if ($(this).val() != "") {
    $("#city_birth_txt").prop("disabled", false);
  } else {
    $("#city_birth_txt").prop("disabled", true);
  }
});




function getDataFromInputs() {
  try {
    const birth = new Date($("#date_birth").val());
    birth.setDate(birth.getDate() + 1);
    if (isNaN(birth)) {
      throw new Error("Invalid date of birth");
    }

    const personalData = {
      first_name: $("#first_name").val().normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
      last_name: $("#last_name").val().normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
      gender: $("#gender").val(),
      day_birth: ("0" + birth.getDate()).slice(-2),
      month_birth: ("0" + (birth.getMonth() + 1)).slice(-2),
      year_birth: birth.getFullYear().toString(),
      country_birth: $("#country_birth").val(),
      state_birth: $("#state_birth").val(),
    };

    console.log(personalData);

    return personalData;
  } catch (error) {
    console.error("Error:", error.message);

    return null; // Return null or a default value if an error occurs
  }
}

//Ajax request to get CURP data from document.file
let curp = undefined;
$("#personal_document_file").on("change", function () {
  
  personalData = getDataFromInputs();
  let formFile = new FormData();
  formFile.append("csrfmiddlewaretoken", $("#csrftoken").val());

  // Append the personalData to the FormData object
  for (const key in personalData) {
    formFile.append(key, personalData[key]);
  }

  formFile.append("file", personal_document_file.files[0]);

  $("#document-alert").remove();
  $("#personal-document .previous, #personal-document .next").prop("disabled", true);
  $("#loader-section").css("display", "flex");

  let curpPromise = new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: "/ajax/curp/",
      data: formFile,
      processData: false,
      contentType: false,
      success: function (response) {
        console.log("Exito:", response);
        resolve(response);
      },
      error: function (xhr, status, error) {
        let errorResponse = JSON.parse(xhr.responseText);
        reject(errorResponse.Error);
      },
    });
  });

  curpPromise
    .then((message) => {
      $("#personal-document .previous, #personal-document .next").prop("disabled", false);
      $("#loader-section").css("display", "none");
      $("#document-alert").remove();
      $("#loader-section").after(`<div id="document-alert" class="alert alert-success alert-dismissible p-2  fade show" role="alert">
    ${message.Okay}</div>`);
      curp = message.Okay;
    })
    .catch((err) => {
      
      $("#document-alert").remove();
      $("#loader-section").after(`<div id="document-alert" class="alert alert-danger alert-dismissible p-2 fade show" role="alert">
      ${err}</div>`);
      $("#personal-document .previous").prop("disabled", false);
      $("#loader-section").css("display", "none");
      $("#personal_document_file").val("");
    });
});




$(".previous").on("click", function () {
  indexOfCurrentField = currentField(formFields);
  setSteps(indexOfCurrentField - 1);

  let currentFormField = formFields[indexOfCurrentField];
  let previousFormField = formFields[indexOfCurrentField - 1];

  $(currentFormField).animate(
    {
      opacity: 0,
      position: "relative",
      left: "50px",
    },
    250,
    function () {
      $(currentFormField).removeClass("active");
      $(previousFormField).addClass("active");
      $(currentFormField).css({ opacity: 1, left: 0 });
    }
  );
});



$(".next").on("click", function () {
  if (form.valid()) {
    indexOfCurrentField = currentField(formFields);
    setSteps(indexOfCurrentField + 1);

    let currentFormField = formFields[indexOfCurrentField];

    let nextFormField = formFields[indexOfCurrentField + 1];

    $(currentFormField).animate(
      {
        opacity: 0,
        position: "relative",
        left: "50px",
      },
      250,
      function () {
        $(currentFormField).removeClass("active");
        $(nextFormField).addClass("active");
        $(currentFormField).css({ opacity: 1, left: 0 });
      }
    );
  }
});

//AJAX request to get city from state

function getCitiesFromState(entity_code) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "POST",
      url: "/ajax/cities/",
      data: {
        entity_code: entity_code,
      },
      success: function (response) {
        $("#city_birth").prop("disabled", false);
        $("#city_birth").empty(); // Clear existing options before populating new ones

        $("#city_birth").append(`<option value="" selected disabled >Selecciona la ciudad</option>`);
        // Loop through each city in the JSON response
        for (const city of response.cities) {
          // Append a new option element to the dropdown for each city
          $("#city_birth").append(`<option value="${city.city_code}">${city.name}</option>`);
        }
      },
      error: function (error) {
        $("#city_birth").css("display", "none");
        $("#city_birth_txt").css("display", "block");
        reject(console.log("No se recibieron las ciudades"));
      },
    });
  });
}

//Ajax request to create an account

function createAccount() {
  let formAccount = new FormData($("#register-form")[0]);
  formAccount.append("curp", curp);
  formAccount.append("csrfmiddlewaretoken", $("#csrftoken").val());

  showModal("myModal-loading");

  let newAccount = new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: "/ajax/create_account/",
      data: formAccount,
      processData: false,
      contentType: false,

      success: function (response) {
        console.log("Exito", response);
        resolve(Response);
      },
      error: function (xhr, status, error) {
        let errorResponse = JSON.parse(xhr.responseText);
        reject(errorResponse.Error);
      },
    });
  });

  newAccount
    .then((message) => {
      hideModal("myModal-loading");
      showModal("myModal-success");

      //alert(message.Okay)
    })
    .catch((err) => {
      hideModal("myModal-loading");
      showModal("myModal-fail", err);
      console.log(err);
      //alert(err)
    });
}

//Ajax send form information

//Animations
