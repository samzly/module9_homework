const input = document.querySelector('input');
const btn = document.querySelector('button');

function getRequest(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://picsum.photos/v2/list?limit=${input.value}`);
    xhr.send();
    xhr.onload = () => {
        if (xhr.status != 200) {
            alert(`Status: ${xhr.status}`)
        } else {
            const result = JSON.parse(xhr.response);
            if (callback) {
                callback(result)
            }
        }
    }
    xhr.onerror = () => {
        alert(`Status: ${xhr.status}`)
    }
}

function getResult(data) {
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
}

btn.addEventListener('click', () => {
    if (!Number.isInteger(input.value)) {
        input.insertAdjacentHTML('afterend', `<p>введите число!</p>`)
    } else {
        if ((input.value < 0) || (input.value > 10)) {
            input.insertAdjacentHTML('afterend', `<p>число вне диапазона от 1 до 10</p>`)
        } else {
            getRequest(getResult)
        }
    }
})