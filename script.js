/*draggable text boxes*/
$(function() {
    $("#drag1").draggable({
        containment: "document"
    });

    $("#drag2").draggable({
        containment: "document"
    });
    $("#drag3").draggable({
        containment: "document"
    });

    $("#drag4").draggable({
        containment: "document"
    });
    $("#drag5").draggable({
        containment: "document"
    });

    $("#drag6").draggable({
        containment: "document"
    });
    $("#drag7").draggable({
        containment: "document"
    });

    $("#drag8").draggable({
        containment: "document"
    });
    $("#drag9").draggable({
        containment: "document"
    });
    $("#drag10").draggable({
        containment: "document"
    });

    $("#drag11").draggable({
        containment: "document"
    });
    $("#drag12").draggable({
        containment: "document"
    });

    $("#drag13").draggable({
        containment: "document"
    });
    $("#drag14").draggable({
        containment: "document"
    });

    $("#drag15").draggable({
        containment: "document"
    });
});

// /*header - gravity boxes*/
// let draggables = document.getElementsByClassName('draggables');

const changeableText = document.getElementById('click-me');
const textOptions = [`is hoping you're happy :]`, 'is sleeping past noon', 'is fighting bears in the arctic', 'is wishing your dreams come true <3', 'is behind you.....boo!', 'is eating pizza']; 

function getRandomText() {
  const randomIndex = Math.floor(Math.random() * textOptions.length);
  return textOptions[randomIndex];
}

function changeRandomText() {
  changeableText.textContent = getRandomText();
}

changeableText.addEventListener('click', changeRandomText);