// Including all the modules
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { response } = require("express");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Serving the static files
app.use(express.static("public"));

// Post request

// For home route
app.post("/", function (req, res) {
  var fname = req.body.fname;
  var lname = req.body.lname;
  var emailID = req.body.emailID;

  var data = {
    email_address: emailID,
    status: "subscribed",
    merge_fields: {
      FNAME: fname,
      LNAME: lname,
    },
  };

  var jsonData = JSON.stringify(data);

//   creating the obejct for requestion to API :more info read request ducumentation

  var option = {
    url: "https://us5.api.mailchimp.com/3.0/lists/d0d865c582/members", //base api url for post request
    method: "POST",
    headers: {
      Authorization: "subhradwip bce75578afaff43eb7207dfb0fcc4d6c-us5",
    },
    body: jsonData,
  };

  request(option, function (error, response, request) {
      console.log(response.statusCode);
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode == 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

// for success route
app.post("/success",function (req,res) {
    res.redirect("/");
    
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

// handiling the get reqst
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/sigup.html");
});

// Listenting to the port
app.listen(process.env.PORT || 3000, function () {
  console.log("Server started Successfuly");
});

