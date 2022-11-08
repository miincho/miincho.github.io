var correctCards = 0;
$( init );

function init() {

  // Hide the success message
  $('#successMessage').hide();
  $('#successMessage').css( {
    left: '580px',
    top: '250px',
    width: 0,
    height: 0
  } );

  // Reset the game
  correctCards = 0;
  $('#cardPile').html( '' );
  $('#cardSlots').html( '' );

  $(document).ready(function () {
    $("#btn").click(function () {
        alert("sike\nits not yours");
    });
});


  // Create the pile of shuffled cards
  var numbers = [ 2, 4, 3, 1,  ];
 

  for ( var i=0; i<4; i++ ) {
    $('<div>' + numbers[i] + '</div>').data( 'number', numbers[i] ).attr( 'id', 'card'+numbers[i] ).appendTo( '#cardPile' ).draggable( {
      containment: '#content',
      stack: '#cardPile div',
      cursor: 'move',
      revert: true
    } );
  }

  // Create the card slots
  var words = [ '','','','' ];
  for ( var i=1; i<=4; i++ ) {
    $('<div>' + words[i-1] + '</div>').data( 'number', i ).appendTo( '#cardSlots' ).droppable( {
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );
  }

}





function handleCardDrop( event, ui ) {
    var slotNumber = $(this).data( 'number' );
    var cardNumber = ui.draggable.data( 'number' );
  
    // If the card was dropped to the correct slot,
    // change the card colour, position it directly
    // on top of the slot, and prevent it being dragged
    // again
  
    if ( slotNumber == cardNumber ) {
      ui.draggable.addClass( 'correct' );
      ui.draggable.draggable( 'disable' );
      $(this).droppable( 'disable' );
      ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
      ui.draggable.draggable( 'option', 'revert', false );
      correctCards++;
    } 
    
    // If all the cards have been placed correctly then display a message
    // and reset the cards for another go
  
    if ( correctCards == 4 ) {
      $('#successMessage').show();
      $('#successMessage').animate( {
        left: '50%',
        top: '30%',
        width: '400px',
        height: '300px',
        opacity: 1
      } );
    }
  
  }



  $(document).ready(function() {$("#gameb").draggable(); })
  $(document).ready(function() {$("#sticker").draggable(); })