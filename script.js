$(function(){
  var name;
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

  function getSum(key){
    $.ajax({
      method: "GET",
      url: "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/"+ name + "?api_key=" + key,
      success: function(data){
        var sumData = data[Object.keys(data)[0]];
        console.log(sumData);
        getStats(sumData,key)
      },
      error: function(){alert("wat")},
    })
  }

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
