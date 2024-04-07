function name(name)
{
  //remove non alpha characters
  name = name.replace(/[^a-zA-Z ]/g, '');
  //upercase first letter of each and word
  const words = name.split(' ');
  const sanitized = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  return sanitized.join(' ');
}

function email(email)
{
  //check if email is valid
  if (!email.includes('@') || !email.includes('.'))
  {
    return false;
  }
  return true;
}

function password(password)
{
  // check if password is valid
  const number = /[0-9]/;
  const upper = /[A-Z]/;
  //all special characters
  const special = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (password.length < 8 || !number.test(password) || !upper.test(password) || !special.test(password))
  {
    return false;
  }
  return true;
}
module.exports = {
  name,
  email,
  password,
};