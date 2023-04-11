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

const streamToString = (stream) =>
  new Promise((resolve, reject) => {
    try {
      const chunks = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('error', reject);
      stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    } catch (e) {
      console.log('UTILS_streamToString_ERROR:', e);
      reject;
    }
  });

export { genUsername, streamToString };
