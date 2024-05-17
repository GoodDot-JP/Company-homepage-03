document.addEventListener('DOMContentLoaded', function () {
    var cards = document.querySelectorAll('.card');
    var modal = document.getElementById('modal');
    var modalContent = document.getElementById('modal-content');
    var closeModal = document.getElementById('modal-close');
    var overlay = document.getElementById('modal-overlay');

    var initialRect = null;

    cards.forEach(function (card) {
        card.addEventListener('click', function () {
            var currentCard = card;
            initialRect = currentCard.getBoundingClientRect();

            var mediaType = currentCard.getAttribute('data-type');
            var mediaElement;

            if (mediaType === 'image') {
                mediaElement = '<img id="modal-image" src="' + currentCard.getAttribute('data-image') + '" alt="Selected Thumbnail">';
            } else if (mediaType === 'video') {
                mediaElement = '<video id="modal-video" controls>';
                mediaElement += '<source src="' + currentCard.getAttribute('data-video') + '" type="video/mp4">';
                mediaElement += 'Your browser does not support the video tag.</video>';
            }

            // document.getElementById('modal-image').src = currentCard.getAttribute('data-image');
            document.getElementById('modal-media').innerHTML = mediaElement;
            document.getElementById('modal-title').textContent = currentCard.getAttribute('data-title');
            document.getElementById('modal-summary').innerHTML = currentCard.getAttribute('data-summary').replace(/\n/g, '<br>');
            document.getElementById('modal-link').href = currentCard.getAttribute('data-link');

            modalContent.style.position = 'fixed';
            modalContent.style.width = initialRect.width + 'px';
            modalContent.style.height = initialRect.height + 'px';
            modalContent.style.top = initialRect.top + 'px';
            modalContent.style.left = initialRect.left + 'px';
            modalContent.style.transform = 'translate(0, 0) scale(1)';
            modalContent.style.opacity = 1;

            modal.style.display = 'flex';
            overlay.style.display = 'block';
            overlay.style.opacity = 1;

            setTimeout(function () {
                modalContent.style.transition = 'transform 0.5s ease-in-out, top 0.5s ease-in-out, left 0.5s ease-in-out, width 0.5s ease-in-out, height 0.5s ease-in-out, opacity 0.5s ease-in-out';
                modalContent.style.width = '80%';
                modalContent.style.height = '80%';
                modalContent.style.top = '50%';
                modalContent.style.left = '50%';
                modalContent.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 10);
        });
    });

    function closeHandler() {
        modalContent.style.transition = 'transform 0.5s ease-in-out, top 0.5s ease-in-out, left 0.5s ease-in-out, width 0.5s ease-in-out, height 0.5s ease-in-out, opacity 0.5s ease-in-out';
        modalContent.style.width = initialRect.width + 'px';
        modalContent.style.height = initialRect.height + 'px';
        modalContent.style.top = initialRect.top + 'px';
        modalContent.style.left = initialRect.left + 'px';
        modalContent.style.transform = 'translate(0, 0) scale(0)';
        modalContent.style.opacity = 0;

        setTimeout(function () {
            modal.style.display = 'none';
            overlay.style.display = 'none';
            modalContent.style.transition = 'none';
            modalContent.style.transform = 'translate(-50%, -50%) scale(1)';
            modalContent.style.opacity = 1;
        }, 500);
    }

    closeModal.addEventListener('click', closeHandler);
    overlay.addEventListener('click', closeHandler);
});
