const appDrawer = document.querySelector('.app-drawer');

const makePost = document.querySelector('#makePost');
makePost.addEventListener('submit', function async(e) {
    e.preventDefault();
    try {
    const post = {
        number: makePost.elements.number.value || 1,
        work: makePost.elements.work.value || 'web-design',
        contractor: makePost.elements.contractor.value || 'Ann',
        cost: makePost.elements.cost.value || 100,
        income: makePost.elements.income.value || 'on',
        regular: makePost.elements.regular.value || 'on',
    };
    console.log(post)
    const response = await fetch('https://money-keeper21.herokuapp.com/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(post)
    });
    console.log(response)
    return await response.json();
} catch (err) {
    console.log(err);
}
})

appDrawer.addEventListener('mouseenter', function () {
    appDrawer.classList.toggle('is-open');
    appDrawer.addEventListener('mouseleave', function () {
        appDrawer.classList.toggle('is-open');
    })
})