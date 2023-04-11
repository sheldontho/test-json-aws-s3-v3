/**
 * @author Sheldon T.
 * @email sheldoontho@gmail.com
 */
const chkEmailVeriToken = (tokenStr) => {
  /**
   * token string format, e.g.:
   * 63f5c13da79f1cb5269edc81-c8984bfb1e3f30c309f41c98bffdac44277c264f8ca5b53624f44cb501eb5d7c
   */
  try {
    const regex = new RegExp('^(?!.*[0-9]-[0-9])[A-Za-z0-9]+(-[A-Za-z0-9]+)?$');
    if (tokenStr.indexOf('-') === -1) {
      return false;
    } else {
      return regex.test(tokenStr);
    }
  } catch (e) {
    console.log('UTILS_chkEmailVeriToken_ERROR:', e);
    return false;
  }
};

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

const isValidEmailVeriTokenTTL = (token) => {
  try {
    const { tokenSetAt } = token;

    const tset = new Date(tokenSetAt);
    const tnow = new Date();
    const ttl = 1000 * 60 * 60 * 24; // 1 day

    return !(tnow - tset > ttl);
  } catch (e) {
    console.log('UTILS_isValidEmailVeriTokenTTL_ERROR:', e);
    return false;
  }
};

export { chkEmailVeriToken, genUsername, isValidEmailVeriTokenTTL };
