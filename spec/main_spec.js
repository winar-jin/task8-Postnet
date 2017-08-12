"use strict";
var _ = require("lodash");
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var main = require("../lib/main.js");


describe("将邮编转换为条码：", function(){

    it('将95713转换为条码：', function(){
      var result = main.encode('95713');
      var expect_string = '||:|:::|:|:|:::|:::||::||::|:|:|';
      expect(expect_string).to.equal(result);
    });

    it('将989808998转换为条码：',function () {
      var result = main.encode('989808998');
      var expect_string = '||:|::|::|:|:|::|::|:||:::|::|:|:|::|:|::|::|:::|:||';
      expect(expect_string).to.equal(result);
    })

    it('将98980-8998转换为条码：',function () {
      var result = main.encode('98980-8998');
      var expect_string = '||:|::|::|:|:|::|::|:||:::|::|:|:|::|:|::|::|:::|:||';
      expect(expect_string).to.equal(result);
    })
});

describe("将条码解码为邮编：", function(){

  it('将||:|:::|:|:|:::|:::||::||::|:|:|转换为邮编：', function(){
    var result = main.decode('||:|:::|:|:|:::|:::||::||::|:|:|');
    var expect_string = '95713';
    expect(expect_string).to.equal(result);
  });

  it('将||:|::|::|:|:|::|::|:||:::|::|:|:|::|:|::|::|:::|:||转换为条码：',function () {
    var result = main.decode('||:|::|::|:|:|::|::|:||:::|::|:|:|::|:|::|::|:::|:||');
    var expect_string = '98980-8998';
    expect(expect_string).to.equal(result);
  })
});