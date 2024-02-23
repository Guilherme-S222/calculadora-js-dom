const main = document.querySelector('main'); //Selecionando a tag main
const root = document.querySelector(':root'); //Selecionando o elemento root css da página
const input = document.getElementById('input'); //Selecionando o elemento input
const resultInput = document.getElementById('result'); //Selecionando o input do resultado

//Array dos caracteres permitidos
const allowedkeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "];

//Funcionalidade dos botões
document.querySelectorAll('.charKey').forEach(function (charKeyBtn) {
    charKeyBtn.addEventListener('click', function () {
        const value = charKeyBtn.dataset.value
        input.value += value
    })
});

//Funcionalidade do Botão Clear no input e no resultado
document.getElementById('clear').addEventListener('click', function () {
    input.value = ''
    input.focus() //Direciona o cursor para o input
    resultInput.value = ''
});

//Evento de click nos botões
input.addEventListener('keydown', function (ev) {
    ev.preventDefault() //Previnindo o comportamento padrão do input para inserção manual seguindo caracteres allowedKeys
    if (allowedkeys.includes(ev.key)) {
        input.value += ev.key
        return
    }
    if (ev.key === 'Backspace') {
        input.value = input.value.slice(0, -1) //slice para cortar um caracter inicial até a posição -1 (penultimo)
    }
    if (ev.key === 'Escape') {
        input.value = ''
        input.focus()
    }
    if (ev.key === 'Enter') {
        calculate()
    }
});

//Função para realizar os cálculos
function calculate() {
    resultInput.value = 'ERROR'
    resultInput.classList.add('error')

    const result = eval(input.value) //Função Eval (Serve para avaliar e executar o código JS) - Tomar muito cuidado com essa função
    resultInput.value = result
    resultInput.classList.remove('error')
};

//Funcionalidade do botão "=" para realizar o cálculo
document.getElementById('equal').addEventListener('click', calculate);

//Funcionalidade do botão troca de tema
document.getElementById('themeSwitcher').addEventListener('click', function () {
    if (main.dataset.theme === 'dark') {
        root.style.setProperty('--bg-color', '#f1f5f9')
        root.style.setProperty('--border-color', '#aaa')
        root.style.setProperty('--font-color', '#212529')
        root.style.setProperty('--primary-color', '#f8c314')
        main.dataset.theme = 'light'
    } else {
        root.style.setProperty('--bg-color', '#212529')
        root.style.setProperty('--border-color', '#666')
        root.style.setProperty('--font-color', '#f1f5f9')
        root.style.setProperty('--primary-color', '#f8c314')
        main.dataset.theme = 'dark'
    }
});

//Funcionalidade de copiar para área de transferência
document.getElementById('copyToClipboard').addEventListener('click', function (ev) {
    const button = ev.currentTarget
    if (button.innerText === 'Copy') {
        button.innerText = "Copied!"
        button.classList.add('success')
        navigator.clipboard.writeText(resultInput.value)
    } else {
        button.innerText = 'Copy'
        button.classList.remove('success')
    }
});