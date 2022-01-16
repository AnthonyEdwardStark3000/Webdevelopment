const chai = require("chai");
const expect = chai.expect;
const sample = require("../sample.js");

describe("sample code testing",function(){
    it("test for add function",function(){
        var actualResult = sample.add(20,30);
        var expectedResult = 50;
        expect(actualResult).to.equal(expectedResult);
    });
})