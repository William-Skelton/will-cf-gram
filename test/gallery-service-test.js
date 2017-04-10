'use strict';

describe('Gallery Service', function() {

  beforeEach( () => {
    angular.mock.module('cfgram');
    angular.mock.inject(($rootScope, authService, galleryService, $window, $httpBackend) => {
      this.$rootScope = $rootScope;
      this.authService = authService;
      this.galleryService = galleryService;
      this.$window = $window;
      this.$httpBackend = $httpBackend;
  });
});

describe('galleryService.createGallery', () => {
  it('should create a new gallery', () => {
    let galleryData = {
      name: 'example gallery',
      desc: 'example description'
    };

    let headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer test token'
    };

    this.$httpBackend.expectPOST('http://localhost:8000/api/gallery', galleryData, headers)
    .respond(200, {
      _id: '1234',
      username: 'testuser',
      name: galleryData.name,
      desc: galleryData.desc,
      pics: []
    });

    this.galleryService.createGallery(galleryData);
    this.$httpBackend.flush();
    this.$rootScope.$apply();
  });

  it('should delete a gallery', () => {

    let headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer test token'
    };

    this.$httpBackend.expectDelete('http://localhost:8000/api/gallery/${id}', galleryData, headers)
    .respond(200, {
      _id: '1234',
      username: 'testuser',
      name: galleryData.name,
      desc: galleryData.desc,
      pics: []
    });

    this.galleryService.createGallery(galleryData);
    this.$httpBackend.flush();
    this.$rootScope.$apply();
  });
});
