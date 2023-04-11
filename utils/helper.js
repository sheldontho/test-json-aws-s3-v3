/**
 * @author Sheldon T.
 * @email sheldoontho@gmail.com
 */
const genUsername = (firstname, lastname) => {
  try {
    const fname = firstname.substring(0, 1).toLowerCase();
    const lname = lastname.toLowerCase();
    return `${fname}${lname}`;
  } catch (e) {
    console.log('UTILS_genUsername_ERROR:', e);
    return '';
  }
};

export { genUsername };
