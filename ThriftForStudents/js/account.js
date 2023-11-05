/* Lab 5 JavaScript File 
Place variables and functions in this file */

function validate(formObj) {
   
   var alertText = "";
   var focusSet = 0;

   if (formObj.firstName.value == "") {
      alertText += "You must enter a first name \n";
      if(focusSet == 0) {
         formObj.firstName.focus();
         focusSet = 1
      }
   }

   if(formObj.lastName.value == "") {
      alertText += "You must enter a last name \n";
      if (focusSet == 0) {
         formObj.lastName.focus();
         focusSet = 1
      }
   }

   if(formObj.dob.value == "") {
      alertText += "You must enter a title \n";
      if (focusSet == 0) {
         formObj.title.focus();
         focusSet = 1  
      } 
   }

   if(formObj.email.value == "") {
      alertText += "You must enter an organization \n";
      if (focusSet == 0) {
         formObj.org.focus();
         focusSet = 1  
      } 
   }

   if(formObj.password.value == "") {
      alertText += "You must enter a nickname \n";
      if (focusSet == 0) {
         formObj.pseudonym.focus();
         focusSet = 1  
      } 
   }

   if(alertText == "") {
      alert("Form successfully submitted!");
      return true;
   }

   alert(alertText);
   return false;
   
}
