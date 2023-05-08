const inputs = document.querySelectorAll('input');
const page = inputs[0];
const limit = inputs[1];
const btn = document.querySelector('button');

page.insertAdjacentHTML('beforebegin', '<h1>номер страницы</h1>');
limit.insertAdjacentHTML('beforebegin', '<h1>лимит</h1>');
btn.insertAdjacentText('afterbegin', 'запрос');

function checkInput(data) {
    let result = (data.value < 1) || (data.value > 10) || (!Number.isInteger(data.value));
    return result
}

function getResult() {
    fetch(`https://picsum.photos/v2/list?page=${page.value}&limit=${limit.value}`)
        .then((response) => {
            const result = response.json();
            return result;
        })
        .then((data) => {
            let picture = '';
            data.forEach(item => {
                const division = `
                    <div class='picture'>
                        <img src='${item.download_url}' alt="picture #${item}" class='picture_image'>
                        <p>${item.author}</p>
                    </div>
                `;
                picture = picture + division;
            });
            document.querySelector('body').insertAdjacentHTML('beforeend', picture)
        })
        .catch(() => {
            alert('error')
        });
}

btn.addEventListener('click', () => {
    if (checkInput(page) && checkInput(limit)) {
        limit.insertAdjacentHTML('afterend', `<p>Номер страницы и лимит вне диапазона от 1 до 10</p>`)
    } else if (checkInput(page)) {
        page.insertAdjacentHTML('afterend', `<p>Номер страницы вне диапазона от 1 до 10</p>`)
    } else if (checkInput(limit)) {
        limit.insertAdjacentHTML('afterend', `<p>Лимит вне диапазона от 1 до 10</p>`)
    } else {
        getResult();
        localStorage.setItem('images', getResult)
    }
})

window.onload = () => {
    localStorage.getItem('images')
}