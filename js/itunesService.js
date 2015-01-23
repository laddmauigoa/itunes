var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also not that we're using a 'service' and not a 'factory' so all your method you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in. 
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here
    //promise is a concept. deffered object is an object that carries an object. deffered also has a 
    this.getArtist = function(artist) {
      
      var deferred = $q.defer();
       $http({
        method: 'JSONP',
        url: 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
      

      }).then(function(data) {
        var res = data.data.results
       
        var newarr = [];
        for(i = 0; i < res.length; i++){
           var newObj = {};
          newObj.Artist = res[i].artistName
          newObj.AlbumArt = res[i].artworkUrl30
          newObj.Collection = res[i].collectionName
          newObj.CollectionPrice = res[i].collectionPrice
          newObj.Play = res[i].radioStationUrl
          newObj.Type = res[i].primaryGenreName
          newObj.Tracks = res[i].trackCount
          newarr.push(newObj)
          
        }
        


        deferred.resolve(newarr)
      


      })//, //function(error) {
      //   deferred.reject(error)
      //   console.log('promise failed', error )
      //   
      // }) 
      return deferred.promise

    }; 


// albumart, artist, collection, collectionprice
   // var deferred = $q.defer();
//push objects into an array. 
// once you ahve that array send that array back to the control which has ng-grid
       

   //     return deferred.promise;

});