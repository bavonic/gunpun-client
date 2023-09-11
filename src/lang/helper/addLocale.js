const fs = require('fs');

async function addLocale(newKey) {
  const main = require('../dictionary.json');
  const temp = Object.keys(main).reduce((output, id) => {
    output[id] = {
      ...main[id],
      [newKey]: ''
    }
    return output
  }, {});

  fs.writeFile((`./lang/dictionary.json`), JSON.stringify(temp, null, 2), function (err) {
    if (err) console.error(err)
    else console.info('••••• Add new locale to dictionary successfully.')
  });
}

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter new locale: ", async function (localeName) {
  if (!localeName) rl.close();
  else {
    await addLocale(localeName);
    rl.close();
  }
});