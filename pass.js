var crypto = require('crypto');
// var salt = '';
// var pw = '';
// crypto.randomBytes(64, (err, buf) => {
//   if (err) throw err;
//   salt = buf.toString('hex');
//   console.log(salt)
// });
// crypto.pbkdf2('asdf', salt, 100000, 64, 'sha512', (err, derivedKey) => {
//   console.log(salt)
//   if (err) throw err;
//   pw = derivedKey.toString('hex');
//   console.log(pw)
// });


// crypto.pbkdf2('asdf', salt, 100000, 64, 'sha512', function(err, derivedKey){
//     console.log(derivedKey.toString('hex'));
    
// });

const base64crypto = password => {
    console.log(crypto.createHash('sha512').update(password).digest('base64'))
    
}

base64crypto('1234')