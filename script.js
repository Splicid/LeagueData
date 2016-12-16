
// Document.ready function
$(function(){
  // global declaration for name which gets defined after the click event so we can use it in the getSum() function
  var name;

  // After Clicking Submit, this function makes a call to getSum() after processing the api key from key.txt
  $("#inputSub").click(function(){
    name = $('#inputText').val();
    $.ajax({
      method: "GET",
      url: "key.txt",
      dataType: "text",
      success: function(key){
        getSum(key);
      }
    })
  });

// getSum gets the summoner data of the summoner based on the name that the user inputs before clicking submit
// mainly used to get the summoner ID so we can get more summoner data
  function getSum(key){
    $.ajax({
      method: "GET",
      url: "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/"+ name + "?api_key=" + key,
      success: function(data){
        var sumData = data[Object.keys(data)[0]];
        console.log(sumData);
// This area makes calls to functions like getRunes(), getMasteries, and getStats() using the id that we got to get more specific data on the summoner
// make sure to pass sumData and the key or else it wont work properly
        getStats(sumData,key)
      },
      error: function(){alert("wat")},
    })
  }

// gets summoner rune pages and logs them in the console
  function getRunes(sumData,key){
    $.ajax({
      method: "GET",
      url: "https://na.api.pvp.net/api/lol/na/v1.4/summoner/" + sumData.id + "/runes?api_key=" + key,
      success: function(data){
        console.log(data);
      },
      error:function(){alert:"WAAAT?"},

    })
  }

//gets summoner mastery pages and logs them in the console
function getMasteries(sumData,key){
  $.ajax({
    method: "GET",
    url: "https://na.api.pvp.net/api/lol/na/v1.4/summoner/" + sumData.id + "/masteries?api_key=" + key,
    success: function(data){
      console.log(data);
    },
    error:function(){alert:"WAAAT?"},

  })
}

// currently gets summoner ranked data, but the url can be altered to get other stats
function getStats(sumData,key){
  $.ajax({
    method: "GET",
    url: "https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/" + sumData.id + "/ranked?api_key=" + key,
    success: function(data){
      console.log(data);
    },
    error:function(){alert:"WAAAT?"},

  })
}

});
