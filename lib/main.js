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

let postcodes = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];

function normalize(postcode) {
  return postcode.replace('-', '');
}

function sum(arr) {
  return arr.reduce((pre, curr) => pre + curr);
}

function checkDigit(normalPostcode) {
  return normalPostcode + (10 - (sum(toDigitArray(normalPostcode)) % 10)) % 10;

}

function toBarcode(ch) {
  return postcodes[ch];
}

function toDigitArray(rawPostcode) {
  return rawPostcode.split('').map(ch => parseInt(ch, 10));
}

function transformToBarcode(rawPostcode) {
  const barcodeDigitArray = toDigitArray(rawPostcode);
  return barcodeDigitArray.map(ch => toBarcode(ch)).join('');
}

function formatToBarcode(rawBarcode) {
  return '|' + rawBarcode + '|';
}

function postcode2Barcode(postcode) {
  let normalPostcode = normalize(postcode);
  let postcodeWithCheckDigit = checkDigit(normalPostcode);
  let rawBarcode = transformToBarcode(postcodeWithCheckDigit);
  return formatToBarcode(rawBarcode);
}

function removeFrame(barcode) {
  return barcode.substr(1, barcode.length - 2);
}

function removeCheckDigit(rawBarcode) {
  return rawBarcode.slice(0, -5);
}

function splitByLength(rawBarcodeWithoutCheckDigit, number) {
  let array = [];
  for (let i = 0; i < rawBarcodeWithoutCheckDigit.length / number; i++) {
    array.push(rawBarcodeWithoutCheckDigit.substr(i * number, number));
  }
  return array;
}

function toPostcode(code) {
  return postcodes.findIndex(ch => ch === code);
}

function transformToPostcode(rawBarcodeWithoutCheckDigit) {
  return splitByLength(rawBarcodeWithoutCheckDigit, 5).map(code => toPostcode(code));
}

function formatToPostcode(rawPostcode) {
  if (rawPostcode.length === 9) {
    rawPostcode.splice(5, 0, '-');
  }
  return rawPostcode.join('');
}

function barcode2Postcode(barcode) {
  let barcodeWithoutFrame = removeFrame(barcode);
  let barcodeWithoutCheckDigit = removeCheckDigit(barcodeWithoutFrame);
  let rawPostcode = transformToPostcode(barcodeWithoutCheckDigit);
  return formatToPostcode(rawPostcode);
}

module.exports = {postcode2Barcode, barcode2Postcode};