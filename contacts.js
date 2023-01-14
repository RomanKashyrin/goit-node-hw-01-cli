const path = require('path');
const fs = require('fs').promises;
const uuid = require('uuid');

const contactsPath = path.join(__dirname, './db/contacts.json');

const listContacts = async () => {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data.toString());
        return contacts;
    } catch (err) {
        console.log(err);
    }
}

const getContactById = async (contactId) => {
    try {
        const contacts = await listContacts();
        const contact = contacts.find(contact => {
            return contact.id === contactId;
        });
        return contact;

    } catch (err) {
        console.log(err);
    }
}

const removeContact = async (contactId) => {
    try {
        const contacts = await listContacts();
        const index = contacts.findIndex(contact => contact.id === contactId);
        const deleteContact = contacts[index];
        if (index.id === -1) {
            return null;
        }

        contacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts));

        return deleteContact;
    } catch (err) {
        console.log(err);
    }
}

const addContact = async (name, email, phone) => {
    const newContact = {
        id: uuid.v4(),
        name: name,
        email: email,
        phone: phone,
    };

    try {
        const contacts = await listContacts();
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}