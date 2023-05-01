const keyboardLayouts = {
    en: [
        ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
        ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
        ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
        ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '⯅', 'RightShift'],
        ['Control', 'Alt', 'Space', 'Alt', 'Control', '⯇', '⯆', '⯈']
    ],
    ru: [
        ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
        ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\'],
        ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
        ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '⯅', 'RightShift'],
        ['Control', 'Alt', 'Space', 'Alt', 'Control', '⯇', '⯆', '⯈']
    ]
};

const title = document.createElement('h1');
    title.textContent = "Virtual Keyboard";
    title.classList.add ("title")
const output = document.createElement('textarea');
    output.id = ("output");
const text = document.createElement('h3');
    text.textContent = "To switch language press <Shift>";
    text.classList.add ("title")
            
document.body.appendChild(title);
document.body.appendChild(output);
document.body.appendChild(text);