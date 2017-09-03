"use strict";
const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);

const {postcode2Barcode, barcode2Postcode} = require("../lib/main");

describe('postcode2Barode', function () {
  it('convert 5-digit postcode to barcode', function () {
    let expect_barcode = '||:|:::|:|:|:::|:::||::||::|:|:|';
    let result_barcode = postcode2Barcode('95713');
    expect(result_barcode).to.equal(expect_barcode);
  });

  it('convert 9-digit postcode to barcode', function () {
    let expect_barcode = '|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|';
    let result_barcode = postcode2Barcode('123456789');
    expect(result_barcode).to.equal(expect_barcode);
  });

  it('checkdigit should calculate correctly', function () {
    let expect_barcode = '||:|:::|:|:|:::|:::|||::|:||:::|';
    let result_barcode = postcode2Barcode('95718');
    expect(result_barcode).to.equal(expect_barcode);
  });


  it('convert 10-digit postcode to barcode', function () {
    let expect_barcode = '|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|';
    let result_barcode = postcode2Barcode('12345-6789');
    expect(result_barcode).to.equal(expect_barcode);
  });
});

describe('barcode2Postcode', function () {
  it('convert 5-digit barcode to postcode', function () {
    let expect_barcode = '95713';
    let result_barcode = barcode2Postcode('||:|:::|:|:|:::|:::||::||::|:|:|');
    expect(result_barcode).to.equal(expect_barcode);
  });

  it('convert 10-digit barcode to postcode', function () {
    let expect_barcode = '12345-6789';
    let result_barcode = barcode2Postcode('|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|');
    expect(result_barcode).to.equal(expect_barcode);
  });

});
