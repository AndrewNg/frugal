// This content script will be interacting with the pages where the user is
// making purchases. Triggered when the user clicks on a button. The price
// is then sent to the server to make a payment on Venmo.

$(document).ready(function() {
  makingPurchase();
});

function makingPurchase() {
  $("#productTitle").on("click", function(){
    var priceString = $("#priceblock_ourprice").text();
    var price = priceString.substring(1);

    var savings = parseFloat(price*0.001).toFixed(2);

    console.log(savings);
  });
}