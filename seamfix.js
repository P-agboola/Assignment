const express = require('express')
const seamfix = express()
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })

const mongoose = require('mongoose')

const student = require('./model/student-model')
seamfix.use(express.json())

const port = 5000

mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log('successfully connected to db')
  }).catch(err => console.log(err))

seamfix.get('/', async (req, res) => {
  try {
    const seamfixStudent = await student.find()
    res.status(200).json({
      status: 'success',
      data: {
        seamfixStudent
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      meassage: err
    })
  }
})

seamfix.post('/', async (req, res) => {
  const fullname = req.body.fullname
  const dateOfBirth = req.body.DOB
  const twitterUrl = req.body.twitter
  const linkedinUrl = req.body.linkedin
  const phoneNumber = req.body.phoneNum
  const goalDescription = req.body.goalDescription
  const fullnameFilter = /([A-Za-z])+/
  const twitterfilter = /((www.twitter.com)[\\/]([a-zA-Z0-9]+))/ // twitter.com/x''yz''
  const linkedinfilter = /((www.linkedin.com)[\\/]([a-zA-Z0-9]+))/
  const phoneNoFilter = /([0-9]{11})/
  const DOBfilter = /([0-9]{4}[-][0-9]{2}[-][0-9]{2})/
  const descriptionfilter = /[a-z A-Z 0-9,\\.&\\-]{20,200}/

  if (fullnameFilter.test(fullname) && twitterfilter.test(twitterUrl) && linkedinfilter.test(linkedinUrl) && phoneNoFilter.test(phoneNumber) && DOBfilter.test(dateOfBirth) && descriptionfilter.test(goalDescription)) {
    const seamfixStudent = await student.create({ fullname, dateOfBirth, twitterUrl, linkedinUrl, phoneNumber, goalDescription })
    return res.status(201).json({
      status: 'success',
      data: {
        seamfixStudent
      }
    })
  } res.status(400).json({
    status: 'fail',
    message: ' invalid data'
  })
})

seamfix.listen(port, () => {
  console.log('seamfix student data is running fine')
})
