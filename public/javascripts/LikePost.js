const likePostBtns = document.querySelectorAll('.heart-icon');
const likesCount = document.querySelectorAll('.likes-count');

likePostBtns.forEach((element) => {
    element.addEventListener('click', (e) => {
        const id = e.target.dataset.id;

        const options = {
            method: 'POST',
        };
        fetch(`/blog/like/${id}`, options)
            .then((res) => {
                if (res.status === 200) {
                    let icon = e.target;
                    icon.classList.toggle('is-hearted');

                    if (icon.classList.contains('is-hearted')) {
                        icon.nextSibling.nextSibling.innerText =
                            parseInt(icon.nextSibling.nextSibling.innerText) +
                            1;
                    } else {
                        icon.nextSibling.nextSibling.innerText =
                            parseInt(icon.nextSibling.nextSibling.innerText) -
                            1;
                    }
                }
            })
            .catch((err) => {
                console.error('error: ', err);
            });
    });
});
