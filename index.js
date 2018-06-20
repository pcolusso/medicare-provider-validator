exports.validateMedicareProviderCode = function(providerCode) {
  if (!/^[0-9]{6}[0-9ABCDEFGHJKLMNPQRTUVWXY][ABFHJKLTWXY]/.test(providerCode))
    return false;

  let practiceLocationValues =  ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','T','U','V','W','X','Y'];
  let remainderValues = ['Y','X','W','T','L','K','J','H','F','B','A'];
  let stemWeights = [3,5,8,4,2,1];

  let stemNumbers = providerCode.substr(0, 6).split('').map((char) => {return parseInt(char); });
  let practiceLoc = practiceLocationValues.findIndex((e) => { return e == providerCode[6]; });
  let checksum = providerCode[7];

  let zipped = stemWeights.map((x, i) => [x, stemNumbers[i]]);
  let sumWeights = zipped.map((y) => { return y[1] * y[0]; } ).reduce((total, num) => {return total + num;} );
  let remainder = (sumWeights + practiceLoc * 6) % 11;

  let result = remainderValues[remainder];

  return result === checksum;
};