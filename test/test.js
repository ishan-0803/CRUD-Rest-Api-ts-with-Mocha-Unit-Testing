var supertest=require("supertest");
const request = require("supertest")("http://localhost:8080/");
const expect = require("chai").expect;
var should=require("should");
var dotenv=require("dotenv");

var server = supertest.agent("http://localhost:8080/");

describe("Sample Unit Test -1",function(){
    it("should return home page",function(){
        server.get("/")
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err,res){
            res.status.should.equal(200);
            // res.body.error.should.equal(false);
            done();
        });
        // const response = request.get("/");
        // expect(response.status).to.eql(200);
        // return true;
    });
});