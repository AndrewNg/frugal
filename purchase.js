// This content script will be interacting with the pages where the user is
// making purchases. Triggered when the user clicks on a button. The price
// is then sent to the server to make a payment on Venmo.

var data = {};

$(document).ready(function() {
  makingPurchase();
});

function makingPurchase() {
  if ($(".shipping-group").length) {
    var priceString = $(".grand-total-price").text();
    var price = priceString.substring(1);

    var savings = parseFloat(price*0.01).toFixed(2);

    console.log(savings);
    data.savings = savings;

    if (confirm("Are you willing to spend $" + price + " and pay $" + savings + " to your savings account?")) {
      $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'http://localhost:3000/pay',
        crossDomain: true,
        success: function(data) {
          console.log("success");
          console.log(JSON.stringify(data))
        },
        error: function(xhr) {
          console.log('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText);
        }
      });
    }
  }
}