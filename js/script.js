const img = document.getElementById('carte')
 


img.onload = function() {
    img.addEventListener('click', onClickEvent);
}

function onClickEvent(evt) {
    console.log(evt)
}

