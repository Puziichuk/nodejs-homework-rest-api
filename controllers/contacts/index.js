const getAll = require('./getAll')
const getContact = require('./getContactById')
const addContact = require('./addContact')
const deleteContact = require('./deleteContact')
const updateContact = require('./updateContact')
const updateStatusContact = require('./updateStatusContact')

module.exports = {
  getAll,
  getContact,
  addContact,
  deleteContact,
  updateContact,
  updateStatusContact
}
