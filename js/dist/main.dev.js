"use strict";

var _this = void 0;

////////////////////////////////////////////////////////////////////
/////////////////////////////Loader/////////////////////////////////
////////////////////////////////////////////////////////////////////
// Fade out the loader when the page are all loaded
$(window).on("load", function (e) {
  $("#preloader").fadeOut("slow");
  console.log("Loaded!");
});
$(function () {
  ////////////////////////////////////////////////////////////////////
  //////////////////////////Translate/////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  //load content data 
  var translate = function translate(lang, jsonData) {
    translateText(lang, jsonData);
    translateForm(jsonData[lang]['contact_form']);
  }; // Calls other's functions to translate the webpage


  var translateText = function translateText(lang, jsonData) {
    return $("[key]").each(function (index, element) {
      return $(element).html(jsonData[lang][$(element).attr('key')]);
    });
  }; // Translate the text by key atribute


  var translateForm = function translateForm(jsonData) {
    return $('form').find("input,textarea").each(function (index, element) {
      return $(element).attr($(element).attr("name") != "submit" ? "placeholder" : "value", jsonData[$(element).attr("id")]);
    });
  }; // Translate the form placeholder


  $.ajax({
    type: "GET",
    url: "./js/langData.json",
    dataType: "json",
    success: function success(json) {
      //if get´s the json file
      console.log(json);
      translate('en', json); // Default language
      //var lang = $(this).attr('id'); // get the button id that contains the language pretended

      $(".lang").on("change", function (e) {
        // When the language changes
        var languageSelected = $(".lang option:selected").val(); // Get language

        console.log("Languange selected: " + languageSelected);
        translate(languageSelected, json); // translate by the language and the json
      });
    }
  }); ////////////////////////////////////////////////////////////////////
  /////////////////////////////Menu///////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  // Function used to shrink nav bar removing paddings and adding black background

  $(window).on("scroll", function (e) {
    if ($(document).scrollTop() > 50) {
      $('.nav').addClass('affix');
      $('.scroll_up_btn').addClass('show');
      console.log("nav changed!");
    } else {
      $('.nav').removeClass('affix');
      $('.scroll_up_btn').removeClass('show');
      console.log("nav changed to top!");
    }
  }); // slide-up script

  $('.scroll_up_btn').on("click", function (e) {
    $('html').animate({
      scrollTop: 0
    });
  }); // Function to show the list when the nav trigger is clicked

  $('.navTrigger').on("click", function (e) {
    $(_this).toggleClass('active');
    console.log("Clicked menu");
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();
  }); // typing animation script

  var typed = new Typed(".typing", {
    strings: ["Programmer", "Web Developer", "Mobile Developer", "Server Admin"],
    typespeed: 150,
    backSpeed: 100,
    loop: true
  });
  var form = document.getElementById('cf');
  var nameForm = document.getElementById('input-name');
  var emailForm = document.getElementById('input-email');
  var subjectForm = document.getElementById('input-subject');
  var messageForm = document.getElementById('input-message'); //const errorFormElement = document.getElementById('error');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    checkInputs();
  });

  checkInputs = function checkInputs() {
    var errorMessages = [];

    if (nameForm.value === '' || nameForm.value == null) {
      errorMessages.push('Name is required');
      setFieldStatusMessage(nameForm, "Name is required");
    }

    if (emailForm.value === '' || emailForm.value == null) {
      errorMessages.push('Email is required'); //setFieldStatusMessage(emailForm, "Name is required");
    } else if (!validateEmail(emailForm.value)) {
      errorMessages.push('Enter a valid email');
      console.log(emailForm.value); //setFieldStatusMessage(emailForm, "Enter a valid email");
    }

    if (subjectForm.value === '' || subjectForm.value == null) {
      errorMessages.push('Subject is required');
      setFieldStatusMessage(subjectForm, "Subject is required");
    }

    if (messageForm.value === '' || messageForm.value == null) {
      errorMessages.push('Message is required');
      setFieldStatusMessage(messageForm, "Message is required");
    } //alert(Object.keys(errorMessages).length);


    console.log("Errors = " + Object.keys(errorMessages).length + " -> " + errorMessages.join(', '));

    if (Object.keys(errorMessages).length == 0) {
      alert("Message sent!");
      nameForm.value = "";
      emailForm.value = "";
      subjectForm.value = "";
      messageForm.value = ""; //setStatusMessage("success", "Success!");
    } else {
      alert("Errors = " + Object.keys(errorMessages).length + " -> " + errorMessages.join(', ')); //setStatusMessage("error", errorMessages.join(', '));
    }
  };

  validateEmail = function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  setFieldStatusMessage = function setFieldStatusMessage(element, message) {
    var formControl = element.parentElement; // add message to status info field

    element.innerText = message;
    formControl.className = 'field field-status-error'; // error
  };

  setStatusMessage = function setStatusMessage(type, message) {
    var statusField = document.getElementById('status-info'); // add message to status info field

    statusField.innerText = message;

    if (type == "error") {
      statusField.className = 'status-info status-error'; // error
    } else {
      statusField.className = 'status-info status-success'; // success
    }
  };
});