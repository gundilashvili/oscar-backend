const beautifyNumber = (number) => {
    if (typeof number !== 'number' && isNaN(Number(number))) return number;
    return Number(number).toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 5
    });
  };
  
  module.exports = {
    beautifyNumber
  };