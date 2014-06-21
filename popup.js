var total = 0.0;

$.ajax({
  type: 'GET',
  url: 'http://localhost:3000/savings',
  contentType: 'application/json',
  crossDomain: true,
  success: function(data) {
    for (var i = 0; i < data.savings.length; i++) {
      total += parseFloat(data.savings[i].savings);
    }

    $("#text").append("You have saved a total of $" + total.toFixed(2) + ".");
  },
  error: function(jqXHR, textStatus, errorThrown) {
    alert('error ' + textStatus + " " + errorThrown);
  }
});