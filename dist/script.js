document.addEventListener("DOMContentLoaded", function(event) {
    var modal = document.getElementsByClassName('modal-wrapper')[0];
    var gallery = document.getElementsByClassName('gallery-img');
    for(i = 0; i < gallery.length; i++) {
        gallery[i].addEventListener("click", function() {
            Modal(this.getAttribute('src'), this.getAttribute('heading'), this.getAttribute('desc'));
        });
    }

    document.getElementsByClassName('modal-bg')[0].addEventListener("click", function(){
        modal.classList.remove("modal-show");
    });

    document.getElementsByClassName('close')[0].addEventListener("click", function(){
        modal.classList.remove("modal-show");
    });

    function Modal(src, heading, desc) {
        document.getElementsByClassName('modal-img')[0].setAttribute('src', src)
        document.getElementsByClassName('modal-heading')[0].innerHTML = heading;
        document.getElementsByClassName('modal-description')[0].innerHTML = desc;
        modal.classList.add("modal-show");
    }
});
