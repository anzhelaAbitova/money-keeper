'use strict';

const login = document.querySelector('.app-page__auth');

login.addEventListener('click', function() {
    console.log(this)
    const modal = document.querySelector('.auth-modal');
    const btnLogin = getDescendant('button', 'btn-primary');
    console.log(btnLogin)
})



function getDescendant(el, cls) {
    while ((el = el.lastElementChild) && !el.classList.contains(cls));
    return el;
}

const makeElem = (type, className = '', text = '') => {
    let el = document.createElement(type);
    if (className) {
        if (typeof className === 'string') {
            el.classList.add(className);
        } else {
            className.forEach(item => el.classList.add(item));
        }
    };
    let textNode = document.createTextNode(text);
    el.appendChild(textNode);
    return el;
}

/*
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
*/

