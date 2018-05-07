$(function(){
  $('form').on('submit', function(e){
    console.log('in here!!!!');
    e.preventDefault();
    //prepare the request
    //debugger;
    var request = gapi.client.youtube.search.list({
      part:'snippet',
      type:'video',
      q: encodeURIComponent($('#search').val()).replace(/%20/.g, '+')
    });
    console.log(request);
    //execute the request
    request.execute(function(response){

      console.log(response);

      let urlId = response.items[0].id.videoId
      let url = 'http://www.youtube.com/embed/' + urlId + '?autoplay=1';
      document.getElementById('ytvideo').src = url;
      // debugger;
    });
  });
});

function init(){
  console.log("potatoooo");
  gapi.client.setApiKey('AIzaSyBEVX8LahxCYMhwi82bBNdOpZeMLFbb9k8 ');
  gapi.client.load('youtube', 'v3', function(){
    //yt api is ready
    console.log('callback for youtube');

  });
}

gapi.load('client', init);
