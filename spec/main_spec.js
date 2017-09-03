"use strict";
const _ = require("lodash");
const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);

var postcode2Barcode = require("../lib/main");

describe('postcode2Barode', function(){
  it('convert 5-digit postcode to barcode',function(){
    let expect_barcode = '||:|:::|:|:|:::|:::||::||::|:|:|';
    let result_barcode = postcode2Barcode('95713');
    expect(expect_barcode).to.equal(result_barcode);
  });

  it('convert 9-digit postcode to barcode', function () {
    let expect_barcode = '|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|';
    let result_barcode = postcode2Barcode('123456789');
    expect(expect_barcode).to.equal(result_barcode);
  });

  it('checkdigit should calculate correctly',function(){
    let expect_barcode = '||:|:::|:|:|:::|:::|||::|:||:::|';
    let result_barcode = postcode2Barcode('95718');
    expect(expect_barcode).to.equal(result_barcode);
  });


  it('convert 10-digit postcode to barcode', function () {
    let expect_barcode = '|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|';
    let result_barcode = postcode2Barcode('12345-6789');
    expect(expect_barcode).to.equal(result_barcode);
  });
});

// describe("将邮编转换为条码：", function(){
//
//     it('将95713转换为条码：', function(){
//       var result = main.encode('95713');
//       var expect_string = '||:|:::|:|:|:::|:::||::||::|:|:|';
//       expect(expect_string).to.equal(result);
//     });
//
//     it('将989808998转换为条码：',function () {
//       var result = main.encode('989808998');
//       var expect_string = '||:|::|::|:|:|::|::|:||:::|::|:|:|::|:|::|::|:::|:||';
//       expect(expect_string).to.equal(result);
//     })
//
//     it('将98980-8998转换为条码：',function () {
//       var result = main.encode('98980-8998');
//       var expect_string = '||:|::|::|:|:|::|::|:||:::|::|:|:|::|:|::|::|:::|:||';
//       expect(expect_string).to.equal(result);
//     })
// });

// describe("将条码解码为邮编：", function(){
//
//   it('将||:|:::|:|:|:::|:::||::||::|:|:|转换为邮编：', function(){
//     var result = main.decode('||:|:::|:|:|:::|:::||::||::|:|:|');
//     var expect_string = '95713';
//     expect(expect_string).to.equal(result);
//   });
//
//   it('将||:|::|::|:|:|::|::|:||:::|::|:|:|::|:|::|::|:::|:||转换为条码：',function () {
//     var result = main.decode('||:|::|::|:|:|::|::|:||:::|::|:|:|::|:|::|::|:::|:||');
//     var expect_string = '98980-8998';
//     expect(expect_string).to.equal(result);
//   })
// });