const MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

$(document).ready(function() {
  MatchGame.renderCards(MatchGame.generateCardValues(), $('#game'));
});

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  const cardValues = [];
  for (let value = 1; value < 9; value++) {
    cardValues.push(value);
    cardValues.push(value);
  }
  const randomValues = [];
  while (cardValues.length > 0) {
    const randomIndex = Math.floor(Math.random() * cardValues.length);
    randomValues.push(cardValues[randomIndex]);
    cardValues.splice(randomIndex, 1);
  }
  return randomValues;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  $game.empty();
  $game.data("flippedCards", []);

  const cardColors = ["hsl(25, 85%, 65%)",
  "hsl(55, 85%, 65%)",
  "hsl(90, 85%, 65%)",
  "hsl(160, 85%, 65%)",
  "hsl(220, 85%, 65%)",
  "hsl(265, 85%, 65%)",
  "hsl(310, 85%, 65%)",
  "hsl(360, 85%, 65%)"]

  cardValues.forEach(function(value) {
    const $card = $('<div class="col-xs-3 card"></div>');
    const data = {
      value: value,
      color: cardColors[value - 1],
      flipped: false
    }
    $card.data(data);
    $game.append($card);
  });

  $('.card').click(function() {
    MatchGame.flipCard($(this), $game);
  });
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if ($card.data('flipped')) {
    return;
  }

  $card.data('flipped', true).css('background-color', $card.data('color')).text($card.data('value'));
  let flippedCards = $game.data('flippedCards');
  flippedCards.push($card);
  
  if (flippedCards.length === 2) {
    if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
      flippedCards[0].css('color', 'rgb(204, 204, 204)').css('background-color', 'rgb(153, 153, 153)');
      flippedCards[1].css('color', 'rgb(204, 204, 204)').css('background-color', 'rgb(153, 153, 153)');
    } else {
      setTimeout(function () {
        flippedCards[0].data('flipped', false).css('background-color', 'rgb(32, 64, 86)').text('');
        flippedCards[1].data('flipped', false).css('background-color', 'rgb(32, 64, 86)').text('');
      }, 350);
    };
    $game.data('flippedCards', []);
  };
};
