// do this when document is ready
$("document").ready(function() {

  // Get references to page elements
  var $username = $("#defaultForm-new-user");
  var $password = $("#defaultForm-new-pass");
  var $firstname = $("#defaultForm-first-name");
  $(".sign-in-display").hide();

  //function that displays sign in info
  var showSignIn = function() {
    $("#sign-up-text").hide();
    $("#sign-in-text").show();
  };

  //function that shows sign up info
  var showSignUp = function() {
    $("#sign-in-text").hide();
    $("#sign-up-text").show();
  };

  // on load a sign in with sign in info modal pops up
  $("#sign-in-modal").modal("show");
  showSignIn();

  // if user clicks new user it switches to sign up script
  $(document).on("click", "#switch-sign-up", function(event) {
    $("#sign-in-modal").modal("show");
    event.preventDefault();
    console.log("switch modals");
    showSignUp();
  });

  // if on sign up modal and clicks return to sign in it switches to sign in script
  $(document).on("click", "#return-to-sign-in", function() {
    showSignIn();
  });

  //if user closes model and then clicks sign up button at top of screen it brings up model with sign up script
  $(document).on("click", ".sign-up", function() {
    console.log("working");
    $("#sign-in-modal").modal("toggle");
    showSignUp();
  });

  //if user closes model and then clicks sign in button at top of screen it brings up model with sign in script
  $(document).on("click", ".sign-in", function() {
    $("#sign-in-modal").modal("toggle");
    showSignIn();
  });

  //if user clicks sign up on modal starts submitting info
  $(document).on("click", "#start-sign-up", function() {
    handleFormSubmit();
  });

  //if user clicks sign in on modal starts submitting info
  $(document).on("click", "#start-sign-in", function() {
    showSignIn();
    refreshExamples();
  });

  // The API object contains methods for each kind of request we'll make
  var API = {
    saveExample: function(example) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/hiker",
        data: JSON.stringify(example)
      });
    },
    getExamples: function(user) {
      return $.ajax({
        url: "api/hiker/" + user,
        type: "GET"
      });
    },
    deleteExample: function(user) {
      return $.ajax({
        url: "api/hiker/" + user,
        type: "DELETE"
      });
    }
  };

  // refreshExamples function gets a signin info and retrieves a hiker from the db and populates the hiker's information
  var refreshExamples = function() {
    var $userLogin = $(".user-login-info").val();
    console.log($userLogin);
    // if a password and username is not entered an alert pops up
    if (!$userLogin) {
      alert("I'm sorry but you need to enter a username and password.");
      return;
    }
    // if there is a match the api pulls hiker info and populates second-screen-design
    API.getExamples($userLogin).then(function(data) {
      if (data) {
        // create user data object
        var profileData = {
          user: data.user,
          profileImage: data.imagetext,
          userBio: data.information,
          displayName: data.displayName
        };
        // saves user info to local storage so it can be retrieved for the next screen
        localStorage.setItem("userinfo", JSON.stringify(profileData));
        window.open("/profile", "_self");
      } else {
        alert("I'm sorry that username or password is incorrect.");
      }
    });
  };

  // Save the new hiker to the db and refresh the list by calling handleFormSubmit
  var handleFormSubmit = function() {
    var newHiker = {
      user: $username.val().trim(),
      password: $password.val().trim(),
      firstName: $firstname.val().trim(),
      lastName: $("#defaultForm-last-name")
        .val()
        .trim(),
      displayName: $("#defaultForm-display-name")
        .val()
        .trim(),
      information: $("#defaultForm-new-info")
        .val()
        .trim(),
      imagetext: $(".image-file option:selected").val()
    };

    // if (!(newHiker.user && newHiker.password)) {
    //   alert("You must enter a user name and password!");
    //   return;
    // }
    // saves hiker information to the sql database
    API.saveExample(newHiker)
      .then(function() {
        //closes sign in modal
        $("#sign-in-modal").modal("toggle");
        var saveNew = newHiker.user;
        //refreshes databse with new hiker info included
        API.getExamples(saveNew).then(function(data) {
          if (data) {
            console.log(data.user);
            console.log(data);
            var profileData = {
              user: data.user,
              profileImage: data.imagetext,
              userBio: data.information,
              displayName: data.displayName
            };
            // stores hiker info for displaying it on the second-screen-design
            localStorage.setItem("userinfo", JSON.stringify(profileData));
            window.open("/profile", "_self");
          } else {
            alert("I'm sorry that username or password is incorrect.");
          }
        });
      })
      .fail(function() {
        console.log("sorry that username is already taken");
      });
  };
});
