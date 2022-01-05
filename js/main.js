////////////////////////////////////////////////////////////////////
/////////////////////////////Loader/////////////////////////////////
////////////////////////////////////////////////////////////////////

// Fade out the loader when the page are all loaded
$(window).on("load", (e) => {
  $("#preloader").fadeOut("slow");
  console.log("Loaded!");
});

$(() => {
  ////////////////////////////////////////////////////////////////////
  //////////////////////////Translate/////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  
  //load content data
  // Calls other's functions to translate the webpage
  let translate = (lang, jsonData) => {
    translateText(lang, jsonData);
    translateForm(jsonData[lang]['contact_form'])
  };

  let translateText = (lang, jsonData) => $("[key]").each((index, element) => $(element).html(jsonData[lang][$(element).attr('key')])); // Translate the text by key atribute
  let translateForm = (jsonData) => $('form').find("input,textarea").each((index, element) => $(element).attr($(element).attr("name") != "submit" ? "placeholder" : "value", jsonData[$(element).attr("id")])); // Translate the form placeholder
  
  $.ajax({
    type: "GET",
    url: "./js/langData.json",
    dataType: "json",
    success: (json) => { //if get´s the json file
      console.log(json);
      translate('en', json); // Default language
      //var lang = $(this).attr('id'); // get the button id that contains the language pretended
      $(".lang").on("change", (e) => { // When the language changes
        var languageSelected = $(".lang option:selected").val(); // Get language
        console.log("Languange selected: " + languageSelected);
        translate(languageSelected, json); // translate by the language and the json
      });
    }
  });
  
  ////////////////////////////////////////////////////////////////////
  /////////////////////////////Menu///////////////////////////////////
  ////////////////////////////////////////////////////////////////////

  // Function used to shrink nav bar removing paddings and adding black background
  $(window).on("scroll", (e) => {
    if ($(document).scrollTop() > 50) {
      $('.nav').addClass('affix');
      $('.scroll_up_btn').addClass('show');
      console.log("nav changed!");
    } else {
      $('.nav').removeClass('affix');
      $('.scroll_up_btn').removeClass('show');
      console.log("nav changed to top!");
    }
  });

  // slide-up script
  $('.scroll_up_btn').on("click", (e) => {
    $('html').animate({scrollTop: 0});
  });

  // Function to show the list when the nav trigger is clicked
  $('.navTrigger').on("click", (e) => {
    $('.navTrigger').toggleClass('active');
    console.log("Clicked menu");
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();
  });

  // typing animation script
  var typed = new Typed(".typing", {
    strings: ["Programmer", "Web Developer", "Mobile Developer", "Server Admin"],
    typespeed: 150,
    backSpeed: 100,
    loop: true
  });

  ////////////////////////////////////////////////////////////////////
  //////////////////////////Contact Form//////////////////////////////
  ////////////////////////////////////////////////////////////////////

  /*const form = document.getElementById('cf');
  const nameForm = document.getElementById('input-name');
  const emailForm = document.getElementById('input-email');
  const subjectForm = document.getElementById('input-subject');
  const messageForm = document.getElementById('input-message');

  //const errorFormElement = document.getElementById('error');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkInputs();
  });

  checkInputs = () => {
    let errorMessages = [];

    if (nameForm.value === '' || nameForm.value == null) {
      errorMessages.push('Name is required');
      setFieldStatusMessage(nameForm, "Name is required");
    }

    if (emailForm.value === '' || emailForm.value == null) {
      errorMessages.push('Email is required');
      //setFieldStatusMessage(emailForm, "Name is required");
    } else if (!validateEmail(emailForm.value)) {
      errorMessages.push('Enter a valid email');
      console.log(emailForm.value);
      //setFieldStatusMessage(emailForm, "Enter a valid email");
    }

    if (subjectForm.value === '' || subjectForm.value == null) {
      errorMessages.push('Subject is required');
      setFieldStatusMessage(subjectForm, "Subject is required");
    }

    if (messageForm.value === '' || messageForm.value == null) {
      errorMessages.push('Message is required');
      setFieldStatusMessage(messageForm, "Message is required");
    }

    //alert(Object.keys(errorMessages).length);
    console.log("Errors = " + Object.keys(errorMessages).length + " -> " + errorMessages.join(', '));

    if (Object.keys(errorMessages).length == 0) {
      alert("Message sent!");
      nameForm.value = "";
      emailForm.value = "";
      subjectForm.value = "";
      messageForm.value = "";
      //setStatusMessage("success", "Success!");
    } else {
      alert("Errors = " + Object.keys(errorMessages).length + " -> " + errorMessages.join(', '));
      //setStatusMessage("error", errorMessages.join(', '));
    }
  }

  validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  setFieldStatusMessage = (element, message) => {
    const formControl = element.parentElement;

    // add message to status info field
    element.innerText = message;
    formControl.className = 'field field-status-error'; // error
  }

  setStatusMessage = (type, message) => {
    const statusField = document.getElementById('status-info');

    // add message to status info field
    statusField.innerText = message;

    if (type == "error") {
      statusField.className = 'status-info status-error'; // error
    } else {
      statusField.className = 'status-info status-success'; // success
    }
  }*/
});