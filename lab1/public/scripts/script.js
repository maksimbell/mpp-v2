const fileInput = document.querySelector('.input-file input[type=file]')
const fileSpan = document.querySelector('#file_span_1')
// console.log(fileInput)

fileInput.addEventListener('change', () => {
    const file = fileInput.files[0]
    // console.log(file)
    fileSpan.innerText = file.name.slice(0, 7).padEnd(13, '.').slice(0, -3)
})