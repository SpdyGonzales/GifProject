const Category = require('../model/category');

module.exports = (req, res, next) => {
  let count;
  let dataToSend = [];
  let prevSeeds = [];

  let userRequestAmount = req.query['userRequestAmount'];
  

  if (!userRequestAmount) {
    userRequestAmount = 6;
  } else {
    userRequestAmount = parseInt(userRequestAmount);
  }
  
  Category.count((err, collectionCount) => {
    if (err) {
      console.error(err)
    }
    count = collectionCount;
  
    for (let index = 0; index < userRequestAmount; index++) {
      let random = Math.floor(Math.random() * count)
      while(prevSeeds.includes(random)) {
        random = Math.floor(Math.random() * count)
      }
      prevSeeds.push(random);      
  
      Category.findOne().skip(random).exec((err,categories) => {
        if(err){
          res.status(500).send('Failed to connect, restart app');
        }
        console.log('category found', categories);
        
        dataToSend.push(categories);

        if (dataToSend.length === userRequestAmount) {
          res.send(dataToSend);
        }
      })
    }
  })

}