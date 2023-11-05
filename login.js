function validate(formObj) {
    // put your validation code here
    // it will be a series of if statements
    var alertText = "";
    var submitForm = true;
    var focusSet = 0; 
    
    if (formObj.userName.value == "") {
       alertText += "You must enter a user name\n";
       submitForm = false;
       focusSet=1;
       formObj.firstName.focus();
       //formObj.firstName.style.background = "red"
       //return false;
    }
 
    if (formObj.password.value == "") {
       alertText += "You must enter a password name\n";
       submitForm = false;
       if(focusSet == 0 ){
          formObj.lastName.focus();
          focusSet=1;
       }
       //return false;
    }
    
 
    if(!submitForm){
       alert(alertText);
 
       return false;
    }
    else{
       alert("Form successfully submitted")
       return true;
    }
 }
 
 function clickMe() {
    var alertText = "";
    var submitForm = true;
    var formObj = document.addForm;
    
    if (formObj.firstName.value == "") {
       alertText += "You must enter a first name\n";
       submitForm = false;
    }
 
    if (formObj.lastName.value == "") {
       alertText += "You must enter a last name\n";
       submitForm = false;
    }
    if (formObj.pseudonym.value == "") {
       alertText += "You must enter a nickname\n";
       submitForm = false;
    }
    if(!submitForm){
       alert(alertText);
    }
    else{
       alert(document.getElementById("firstName").value + " " + document.getElementById("lastName").value+ " is " 
       + document.getElementById("pseudonym").value);
    }
    
 }
 
 function initialFocus(){
   document.getElementById("userName").focus = true; 
 }
 