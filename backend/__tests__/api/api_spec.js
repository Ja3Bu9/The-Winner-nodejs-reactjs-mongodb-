const frisby = require('frisby');
const path = require('path');
const fs = require('fs');
const axios = require('axios')
describe("Server", () => {
  var server;
  var id;
  beforeAll(async () => {
    server = require("../../server");

  });
  
  afterAll(() => {
    server.server.close();
    server.mongoose.connection.close()
  });

  ////////////////////////////////// TEST MENU //////////////////////////////
  describe("GET ALL/ menu", () => {
    //test get all menus
    it('GET menus should return a status of 200 OK', function () {
      return frisby
        .get('http://localhost:8080/category')
        .expect('status', 200);
    });


  })

  describe("POST/ menu", () => {
    //test post menu with image
    it('POST menu should return a status of 201 Created', function () {
    let formData = {
        nomCategory: "test"
    }
      return frisby.post('http://localhost:8080/category/add', {
        body: formData
      })
        .expect('status', 201).then(async () => {
          await axios.get('http://localhost:8080/category').then((suc) => {
            id = suc.data[0]._id
            // console.log(suc.data[0])
          })
        })
    });

  })

  describe('PUT/ menu', () => {
    //test put menu with image 
    it('Update menu should return a status of 200 OK', function () {
    let formData = {
        nomCategory: "test2"
    }

      return frisby.put('http://localhost:8080/category/update/'+id , {
        body: formData
      })
        .expect('status', 200);
    });
  })


  describe('GET BY ID/ menu', () => {
    //test get menu by id
    it('GET menus by id should return a status of 200 OK', function () {
      return frisby
        .get('http://localhost:8080/category/get/'+ id)
        .expect('status', 200);
    });
  })


  describe('DELETE BY ID/ menu', () => {
    //test delete menu by id
    it('Delete menus by id should return a status of 204 OK', function () {
      return frisby
        .del('http://localhost:8080/category/delete/'+id)
        .expect('status', 200);
    });
  })
  ////////////////////////////////// END TEST MENU //////////////////////////////

})




















