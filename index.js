const { Command } = require('commander');
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const contacts = require('./contacts');

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const list = await contacts.listContacts();
            console.table(list);
            break;
        
        case 'get':
            const get = await contacts.getContactById(id);
            console.table(get);
            break;
        
        case 'add':
            await contacts.addContact(name, email, phone);
            break;
        
        case 'remove':
            const deleteContact = await contacts.removeContact(id);
            console.table(deleteContact);
            break;
        
        default: console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);