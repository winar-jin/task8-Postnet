// const convertList = [
//   '||:::',
//   ':::||',
//   '::|:|',
//   '::||:',
//   ':|::|',
//   ':|:|:',
//   ':||::',
//   '|:::|',
//   '|::|:',
//   '|:|::'
// ];
//
// function encode(digitString) {
//   const finalDigitArr = digitString.split('').filter(val => val !== '-');
//   const finalDigitTotal = finalDigitArr.reduce((all, val) => all + parseInt(val, 10), 0);
//   finalDigitArr[finalDigitArr.length] = Math.ceil(finalDigitTotal / 10) * 10 - finalDigitTotal;
//   const resultAll = [];
//   finalDigitArr.forEach(val => {
//     resultAll.push(convertList[parseInt(val, 10)]);
//   });
//   resultAll.push('|');
//   resultAll.unshift('|');
//   return resultAll.join('');
// }
//
// function decode(codedString) {
//   const finalCodedArr = codedString.split('');
//   finalCodedArr.shift();
//   finalCodedArr.pop();
//   const resultArr = [];
//   do {
//     const temp = finalCodedArr.splice(0, 5);
//     convertList.find((val, index) => {
//       if (val === temp.join('')) {
//         resultArr.push(index);
//       }
//     });
//   } while (finalCodedArr.length > 0);
//   resultArr.splice(-1);
//   if (resultArr.length === 9) {
//     resultArr.splice(5, 0, '-');
//   }
//   return resultArr.join('');
// }
//
// module.exports = {
//   encode,
//   decode
// };

function normalize(postcode) {
  return postcode.replace('-', '');
}

function sum(arr) {
  return arr.reduce((pre, curr) => pre + curr);
}

function checkdigit(normalpostcode) {
  return normalpostcode + (10 - (sum(toDigitArray(normalpostcode)) % 10)) % 10;
}

function tobarcode(ch) {
  return ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'][ch];
}

function toDigitArray(rawpostcode) {
  return rawpostcode.split('').map(ch => parseInt(ch, 10));
}

function convert2barcode(rawpostcode) {
  const barcodedigitArray = toDigitArray(rawpostcode);
  return barcodedigitArray.map(ch => tobarcode(ch)).join('');
}

function format(rawbarcode) {
  return '|' + rawbarcode + '|';
}

function postcode2Barcode(postcode) {
  let normalpostcode = normalize(postcode);
  let rawpostcode = checkdigit(normalpostcode);
  let rawbarcode = convert2barcode(rawpostcode);
  return format(rawbarcode);
}

module.exports = postcode2Barcode;