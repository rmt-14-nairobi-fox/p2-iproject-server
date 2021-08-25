const nodemailer = require('nodemailer')

function sendEmailMinPrice(watcher) {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: 'cryptoportal@outlook.com',
      pass: 'Qcf47JXL7Avtysv'
    }
  });
  
  const options = {
    from: 'cryptoportal@outlook.com',
    to: wathcer.User.email,
    subject: `The ${watcher.Coin.name} price is below your treshold!`,
    text: `<h3>Hi ${watcher.User.username}!</h3> <br> 
    <h4>the price of ${watcher.Coin.name} is now below your minimum treshold!!</h4> <br>
    <h4>Our Recommendations are as follows: </h4>
    
    <div style="background-color: whitesmoke; width: 100%; flex-direction: column; padding: 10px;display: flex;">
      <div style="width: 100%;display: flex; flex-direction: row;">
        <div style="width: 200px;">
          <h5>Our Recommendation</h5>
        </div>
        <div style="margin-right: 20px;">
          <h5>:</h5>
        </div>
        <div>
          <h5>${watcher.Coin.recommendation}</h5>
        </div>
      </div>
      <div style="width: 100%;display: flex; flex-direction: row;">
        <div style="width: 200px;">
          <h5>Our Analysis</h5>
        </div>
        <div style="margin-right: 20px;">
          <h5>:</h5>
        </div>
        <div>
          <h5>${watcher.Coin.analysis}</h5>
        </div>
      </div>
    </div>
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


function sendEmailMaxPrice(email) {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: 'cryptoportal@outlook.com',
      pass: 'Qcf47JXL7Avtysv'
    }
  });
  
  const options = {
    from: 'cryptoportal@outlook.com',
    to: wathcer.User.email,
    subject: `The ${watcher.Coin.name} price is over your treshold!`,
    text: `<h3>Hi ${watcher.User.username}!</h3> <br> 
    <h4>the price of ${watcher.Coin.name} is now over your maximum treshold!!</h4> <br>
    <h4>Our Recommendations are as follows: </h4>
    
    <div style="background-color: whitesmoke; width: 100%; flex-direction: column; padding: 10px;display: flex;">
      <div style="width: 100%;display: flex; flex-direction: row;">
        <div style="width: 200px;">
          <h5>Our Recommendation</h5>
        </div>
        <div style="margin-right: 20px;">
          <h5>:</h5>
        </div>
        <div>
          <h5>${watcher.Coin.recommendation}</h5>
        </div>
      </div>
      <div style="width: 100%;display: flex; flex-direction: row;">
        <div style="width: 200px;">
          <h5>Our Analysis</h5>
        </div>
        <div style="margin-right: 20px;">
          <h5>:</h5>
        </div>
        <div>
          <h5>${watcher.Coin.analysis}</h5>
        </div>
      </div>
    </div>
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