const inputs = document.querySelectorAll('input');
const inputWidth = inputs[0];
const inputHeight = inputs[1];
// const inputWidth = document.querySelector('input:first-of-type');
// const inputHeight = document.querySelector('input:last-of-type');
const btn = document.querySelector('button').getAttribute('submit');

function getResult() {
    fetch(`https://picsum.photos/${inputWidth.value}/${inputHeight.value}`)
        .then((response) => {
            const result = response.json();
            return result;
        })
        .then((data) => {
            const picture = `
                <div class="picture_div">
                    <img class="picture_img" src="https://picsum.photos/${inputWidth.value}/${inputHeight.value}">
                </div>
            `;
            document.querySelector('body').insertAdjacentHTML('beforeend', picture)
        })
        .catch(() => {
            alert('error')
        });
}

btn.addEventListener('click', () => {
    if ((inputs.every(elem => elem.value < 100)) || (inputs.every(elem => elem.value > 300)) || (!Number.isFinite(inputWidth.value)) || (!Number.isFinite(inputHeight.value))) {
        inputHeight.insertAdjacentHTML('afterend', `<p>одно из чисел вне диапазона от 100 до 300</p>`)
    } else {
        getResult()
    }
})