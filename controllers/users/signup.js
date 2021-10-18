const { Conflict } = require('http-errors')
const { User } = require('../../models')
const gravatar = require('gravatar')
const { v4 } = require('uuid')
const { sendEmail } = require('../../helpers')

const signup = async (req, res) => {
  try {
    const { email, password, subscription } = req.body
    const user = await User.findOne({ email })
    if (user) {
      throw new Conflict('Email in use')
    }
    const verifyToken = v4()
    const avatar = gravatar.url(email, { protocol: 'https' })

    const newUser = new User({ email, subscription, verifyToken })
    newUser.setPassword(password)
    newUser.setAvatar(avatar)
    await newUser.save()
    const data = {
      to: newUser.email,
      subject: 'Подтверждение регистрации на сайте',
      html: `<a href="http://localhost:3000/api/users/verify/${verifyToken}" target="_blank">Click here for confirmation your email</a>`
    }

    await sendEmail(data)

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        verifyToken: newUser.verifyToken
      }
    })
  } catch (error) {
    throw new Conflict('Email or password is wrong')
  }
}

module.exports = signup
