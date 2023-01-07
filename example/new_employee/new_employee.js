// Using Fetch
//
var myHeaders = new Headers();
myHeaders.append("Content-Type", "text/plain");

var raw = "!{ name }!\nArmstrong Joe\n\n!{ version }!\n1";

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("localhost:3023/uri/rest/sample/tiger/employee", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


// Using jQuery
//
var settings = {
    "url": "localhost:3023/uri/rest/sample/tiger/employee",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "text/plain"
    },
    "data": "!{ name }!\nArmstrong Joe\n\n!{ version }!\n1",
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });


// Using XHR
//
var data = "!{ name }!\nArmstrong Joe\n\n!{ version }!\n1";

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "localhost:3023/uri/rest/sample/tiger/employee");
xhr.setRequestHeader("Content-Type", "text/plain");

xhr.send(data);