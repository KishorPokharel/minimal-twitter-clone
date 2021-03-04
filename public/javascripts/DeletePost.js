const deletePostBtns = document.querySelectorAll('.deletePostBtn');

deletePostBtns.forEach((element) => {
    element.addEventListener('click', (e) => {
        const id = e.target.dataset.id;

        const options = {
            method: 'DELETE',
        };
        console.log(id);
        fetch(`/blog/${id}`, options)
            .then((res) => {
                if (res.status === 200) {
                    e.target.parentElement.parentElement.remove();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    });
});
