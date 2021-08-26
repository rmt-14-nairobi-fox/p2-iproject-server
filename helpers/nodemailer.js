const nodemailer = require('nodemailer')

function sendEmailMinPrice(watcher) {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD
    }
  });
  
  const options = {
    from: 'cryptoportal@outlook.com',
    to: watcher.User.email,
    subject: `The ${watcher.Coin.name} price is below your treshold!`,
    html: `<h3>Hi ${watcher.User.username}!</h3> <br> 
    <h4>the price of ${watcher.Coin.name} is now below your minimum treshold!!</h4>
    <h4>Our Recommendation is as follows: </h4><br>
    <h5>Our Recommendation :</h5><h4>  ${watcher.Coin.recommendation} </h4><br>
    <h5>Our Analysis :</h5>
    <h6>${watcher.Coin.analysis}</h6>
    `
  }
  
  transporter.sendMail(options, (err, info) => {
    if(err){
      console.log(err);
      return
    }
    console.log(info.response);
  })
}


function sendEmailMaxPrice(watcher) {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD
    }
  });
  
  const options = {
    from: 'cryptoportal@outlook.com',
    to: watcher.User.email,
    subject: `The ${watcher.Coin.name} price is over your treshold!`,
    html: `<h3>Hi ${watcher.User.username}!</h3> <br> 
    <h4>the price of ${watcher.Coin.name} is now over your maximum treshold!!</h4>
    <h4>Our Recommendation is as follows: </h4><br>
    <h5>Our Recommendation :</h5><h4>  ${watcher.Coin.recommendation} </h4><br>
    <h5>Our Analysis :</h5>
    <h6>${watcher.Coin.analysis}</h6>
    `
  }
  
  transporter.sendMail(options, (err, info) => {
    if(err){
      console.log(err);
      return
    }
    console.log(info.response);
  })
}


module.exports = {sendEmailMaxPrice, sendEmailMinPrice}