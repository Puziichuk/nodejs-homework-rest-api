const { contactsOperations } = require('../../model')

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsOperations.removeContact(contactId)
    if (!result) {
      const error = new Error('Not found')
      error.status = 404
      throw error
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'contact deleted'
    })
  } catch (error) {
    next(error)
  }
}
module.exports = deleteContact
