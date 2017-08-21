const convertList = [
  '||:::',
  ':::||',
  '::|:|',
  '::||:',
  ':|::|',
  ':|:|:',
  ':||::',
  '|:::|',
  '|::|:',
  '|:|::'
];

function encode(digitString) {
  const finalDigitArr = digitString.split('').filter(val => val !== '-');
  const finalDigitTotal = finalDigitArr.reduce((all, val) => all + parseInt(val, 10), 0);
  finalDigitArr[finalDigitArr.length] = Math.ceil(finalDigitTotal / 10) * 10 - finalDigitTotal;
  const resultAll = [];
  finalDigitArr.forEach(val => {
    resultAll.push(convertList[parseInt(val, 10)]);
  });
  resultAll.push('|');
  resultAll.unshift('|');
  return resultAll.join('');
}

function decode(codedString) {
  const finalCodedArr = codedString.split('');
  finalCodedArr.shift();
  finalCodedArr.pop();
  const resultArr = [];
  do {
    const temp = finalCodedArr.splice(0, 5);
    convertList.find((val, index) => {
      if (val === temp.join('')) {
        resultArr.push(index);
      }
    });
  } while (finalCodedArr.length > 0);
  resultArr.splice(-1);
  if (resultArr.length === 9) {
    resultArr.splice(5, 0, '-');
  }
  return resultArr.join('');
}

module.exports = {
  encode,
  decode
};