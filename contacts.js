const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.resolve("./db/contacts.json")

async function listContacts()
try{
    const data = await fs.readFileSync(contactsPath);
    return console.table(JSON.parse(data));
} catch (err) {
    console.log(err);
}

async function getContactById(contactId)
try {
    const data = await fs.readFile(contactsPath);
    const parseData = JSON.parse(data);
    return parseData.map((data) => {
        if (Number(data) === Number(contactId))
            return console.table(data);
    })
} catch (err) {
    console.log(err);
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const filterContacts = JSON.parse(data).filter(
      (data) => Number(data.id) !== Number(contactId)
    );
    await fs.writeFile(contactsPath, JSON.stringify(filterContacts));
    return listContacts();
  } catch (err) {
    return console.log(err);
  }
}

async function addContact(name, email, phone)
try{
    const data = await fs.readFile(contactsPath);
    const parseData = JSON.parse(data);
    const contactIndex = Number(parseData[parseData.length - 1].id) + 1;
    const addData = [
        ...parseData,
        {
            id: `${contactIndex}`,
            name,
            email,
            phone,
        }
    ];
    await fs.writeFile(contactsPath, JSON.string(addData));
    console.table(addData);
} catch (err) {
    console.log(err);
}

module.exports = {addContact, getContactById, listContacts, removeContact};