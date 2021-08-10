function ValidateEmail(mail) {
  var reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (reg.test(mail)) {
    return true;
  } else {
    return false;
  }
}

function phoneNumber(inputtxt) {
  var phoneno = /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){6}\d$/;
  if (phoneno.test(inputtxt)) {
    return true;
  } else {
    return false;
  }
}

function dobValidation(inputtxt) {
  var phoneno = /^(?:0[1-9]|[12]\d|3[01])([\/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d$/;
  if (phoneno.test(inputtxt)) {
    return true;
  } else {
    return false;
  }
}

function CheckPassword(inputtxt) {
  var passw = /^(?=.*\d)(?=.*[.!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  if (passw.test(inputtxt)) {
    return true;
  } else {
    return false;
  }
}
export {ValidateEmail, phoneNumber, CheckPassword, dobValidation};
