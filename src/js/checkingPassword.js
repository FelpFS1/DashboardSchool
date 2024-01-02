export function checkingPassword(password, againPassword) {
 return password.value.match(/[a-z]{1,}/) &&
  password.value.match(/[A-Z]{1,}/) &&
  password.value.match(/[0-9]{1,}/) &&
  password.value.match(/[^a-zA-Z0-9/s]{1,}/) &&
  againPassword.value === password.value &&
  againPassword.value.length >= 8
    ? true
    : false;
}




