$(document).ready(function() {


  (function () {
    emailjs.init("VxCg8rrlk5orwSnbS");
  })();
  
  // ====================== Navbar ======================
  var navbar = document.querySelector(".headroom");
  var headroom  = new Headroom(navbar);
  headroom.init();
  
  // ====================== Dark & Light Mode ======================
  var mode = localStorage.getItem("mode")
  if(mode) {
    if(mode == 'dark') {
      $("#mode").addClass('dark')

      $(".navbar").attr("data-bs-theme", "dark")
      $(".navbar").addClass("bg-dark")

      $(".navbar .moon").css('display', 'none')
      $(".navbar .sun").css('display', 'list-item')
    }else {
      $("#mode").removeClass('dark')

      $(".navbar").attr("data-bs-theme", "light")
      $(".navbar").removeClass("bg-dark")
    }
  }

  // Apply Dark Mode
  $(".moon").on('click', function() {
    localStorage.setItem('mode', 'dark');

    $(this).fadeOut(100, function() {
      $('.sun').fadeIn(100)
    })

    $(".navbar").attr("data-bs-theme", "dark")
    $(".navbar").addClass("bg-dark")

    $("#mode").addClass("dark")
    $("#mode").removeClass("light")
  })

  // Apply Light Mode
  $(".sun").on('click', function() {
    localStorage.setItem('mode', 'light');

    $(this).fadeOut(100, function() {
      $('.moon').fadeIn(100)
    })

    $(".navbar").attr("data-bs-theme", "light")
    $(".navbar").removeClass("bg-dark")

    $("#mode").addClass("light")
    $("#mode").removeClass("dark")
  })

  $(".down-icon").on('click', function() {
    $(window).scrollTop($(".skills").offset().top)
  })

  // ====================== Scroll For Sections ======================

  $(".section").each(function() {
    if($(window).scrollTop() > $(this).offset().top - 400) {
      $(this).find('.main-title').addClass('active')
      
      sectionName = $(this).attr('id')
      $(".navbar .nav-link").each(function() {$(this).removeClass('active')})
      $(`.navbar [data-target=${sectionName}]`).addClass('active')
    }
  })

  function sectionAnimations() {
    if(scrollTop > $(".skills").offset().top - 700) {
      $(".skills .boxes .box").addClass("animate__animated animate__fadeInUp")
      $(".skills .boxes .box").removeClass("hidden")

      $(".skills .notes p").addClass("animate__animated animate__fadeInRight")
      $(".skills .notes p").removeClass("hidden")
    }
    if(scrollTop > $(".projects").offset().top - 400) {
      $(".projects .box").addClass("animate__animated animate__flipInX")
      $(".projects .box").removeClass("hidden")
    }
    if(scrollTop > $(".contact").offset().top - 400) {
      $(".contact .all").addClass("animate__animated animate__bounceIn")
      $(".contact .all").removeClass("hidden")
    }
  }

  scrollTop = $(window).scrollTop()

  $(window).on('scroll', function() {
    scrollTop = $(window).scrollTop()
    $(".section").each(function() {
      if(scrollTop > $(this).offset().top - 400) {
        $(this).find('.main-title').addClass('active')
        
        sectionName = $(this).attr('id')
        $(".navbar .nav-link").each(function() {$(this).removeClass('active')})
        $(`.navbar [data-target=${sectionName}]`).addClass('active')
      }
    })
    // Section Scroll Animation
    sectionAnimations()
  })

  sectionAnimations()


  // ====================== Form Validation ======================

  var input = document.querySelector("#phone");
  var iti = window.intlTelInput(input, {
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
    initialCountry: "EG"
  })
  var errors = []

  function validate(input) {
    var input = input
    // name validation
    if(input.attr("id") == 'name') {
      if($("#name").val() == "") {
        errors.push(1)
        $("#nameErr").text("Name is Empty")
        $("#nameErr").addClass('show')
        $("#name").addClass('error-input')
      }else if($("#name").val().length > 30) {
        errors.push(1)
        $("#nameErr").text("Name is too big")
        $("#nameErr").addClass('show')
        $("#name").addClass('error-input')
      }else {
        $("#nameErr").removeClass('show')
        $("#name").removeClass('error-input')
      }
    }

    // phone validation
    if(input.attr('id') == 'phone') {
      if($("#phone").val().length > 0) {
        if(!iti.isValidNumber()) {
          errors.push(1)
          $("#phoneErr").text("Wrong Phone Number")
          $("#phoneErr").addClass('show')
          $("#phone").addClass('error-input')
        }else {
          $("#phoneErr").removeClass('show')
          $("#phone").removeClass('error-input')
        }
      }else {
        $("#phoneErr").removeClass('show')
        $("#phone").removeClass('error-input')
      }
    }

    // email validation
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(input.attr("id") == 'email') {
      if($("#email").val() == "") {
        errors.push(1)
        $("#emailErr").text("Email is Empty")
        $("#emailErr").addClass('show')
        $("#email").addClass('error-input')
      }else if(!$("#email").val().match(mailformat)) {
        errors.push(1)
        $("#emailErr").text("Email is't Valid")
        $("#emailErr").addClass('show')
        $("#email").addClass('error-input')
      }else {
        $("#emailErr").removeClass('show')
        $("#email").removeClass('error-input')
      }
    }

    // message validation
    if(input.attr("id") == 'message') {
      if($("#message").val() == "") {
        errors.push(1)
        $("#messageErr").text("Message is Empty")
        $("#messageErr").addClass('show')
        $("#message").addClass('error-input')
      }else if($("#message").val().length > 255) {
        errors.push(1)
        $("#messageErr").text("Message is too big")
        $("#messageErr").addClass('show')
        $("#message").addClass('error-input')
      }else {
        $("#messageErr").removeClass('show')
        $("#message").removeClass('error-input')
      }
    }
  }

  $("#submit").on('click', function(e) {
    e.preventDefault()

    errors = []

    $(".contact-form .form-input").each(function() {
      validate($(this))
    })

    // Final validation
    if(errors.length == 0) {
      $(this).attr('disabled', true)
      // send email
      emailjs.send("service_v539cqn", "template_rszccuf", {
        name: $("#name").val(),
        phone: $("#phone").val().length > 0 ? $("#phone").val() : "No Phone Number",
        email: $("#email").val(),
        message: $("#message").val()
      }).then((res) => {
        $(this).attr('disabled', false)
        if(res.status == 200) {
          $(".successMessage").text("Message Successfully Sent !").css("display", "inline-block")
          $(".contact-form .form-input").val("")
        }else {
          $(".errorMessage").text("There Was an error please try again").css("display", "inline-block")
        }
      })
    }
  })

  $(".contact-form .form-input").each(function() {
    $(this).on('blur', function() {
      validate($(this))
    })
  })
  
  $(".loader").fadeOut()
})