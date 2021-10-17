const { Conflict } = require('http-errors')
const { User } = require('../../models')

const gravatar = require('gravatar')

const signup = async (req, res) => {
  try {
    const { email, password, subscription } = req.body
    const user = await User.findOne({ email })
    if (user) {
      throw new Conflict('Email in use')
    }

    const avatar = gravatar.url(email, { protocol: 'https' })

    const newUser = new User({ email, subscription })
    newUser.setPassword(password)
    newUser.setAvatar(avatar)
    await newUser.save()
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      }
    })
  } catch (error) {
    throw new Conflict('Email or password is wrong')
  }
}

module.exports = signup
