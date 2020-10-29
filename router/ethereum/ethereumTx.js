const contract = require("./contract");

const ethereumTx = {
  query : (request) => {
    return contract.methods.querySurvey(request.sender).call({
     from: request.sender
    })
    .then((res) => {
      return res;
    }).catch(e=>{
      console.log("Error 발생")
      console.error(e)
    });
  },

  invoke : (request) => {
    return contract.methods.saveSurvey(request.sender, request.createAt, request.surveyNum, request.surveyResult)
    .send({from: request.sender, gas:300000, gasPrice:"30000"})
    .then((res) => {
      return res
    }).catch(e=>{
      console.log("Error 발생")
      console.error(e)

      return false
    }); 
  }
}

module.exports = ethereumTx;