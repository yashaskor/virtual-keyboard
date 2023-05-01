const keyboardLayouts = {
    en: [
        ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
        ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
        ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
        ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '⯅', 'RightShift'],
        ['Control', 'Alt', 'Space', 'Alt', 'Control', '⯇', '⯆', '⯈']
    ],
    ru: [
        ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
        ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del'],
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

   
const buttonHolder = {
    en: {},
    ru: {}
};

let currentLayout = readLang() || 'en';
let capsLockEnabled = false;

function createButton(key) {
    const button = document.createElement('button');
    button.textContent = key;

    if (key === "Tab") {
        button.classList.add ('long');
    }
    if (key === "Backspace") {
        button.classList.add ('wide');
    }
    if (key === "CapsLock") {
        button.classList.add ('longer');
    }
    if (key === "Enter") {
        button.classList.add ('wide');
    }
    if (key === "Shift") {
        button.classList.add ('longest');
    }
    if (key === "Control") {
        button.classList.add ('longer');
    }
    if (key === "Del") {
        button.classList.add ('small');
    }
    if (key === "Alt") {
        button.classList.add ('small');
    }
    if (key === "Space") {
        button.classList.add ('extra-wide');
    }
    if (key === "RightShift") {
        button.classList.add ('small');
        button.textContent = ("Shift");
    }

    button.addEventListener('click', () => {
        handleKeyPress(key);
    });
    button.addEventListener('mousedown', () => {
        button.classList.add('active');
    });
    button.addEventListener('mouseup', () => {
        button.classList.remove('active');
    });
    buttonHolder[currentLayout][key] = button;
    return button;
}

function createRow(keys) {
    const row = document.createElement('div');
    row.classList.add('keyboard-row');
    keys.forEach(key => {
        const button = createButton(key);
        row.appendChild(button);
    });
    return row;
}

function createKeyboard(layout) {    
    const keyboard = document.createElement('div');
    keyboard.id = ("keyboard");    
    // keyboard.innerHTML = '';
    layout.forEach(row => {
        const keyboardRow = createRow(row);
        keyboard.appendChild(keyboardRow);
    });    
    document.body.appendChild(keyboard);
}

function handleKeyPress(key) {
    // debugger
    switch (key) {
        case 'Del':
            const input = document.getElementById('output');
            const cursorPosition = input.selectionStart;
            const value = input.value;
            if (cursorPosition < value.length) {
            // Если курсор не находится в конце строки
            input.value = value.substring(0, cursorPosition) + value.substring(cursorPosition + 1);
            input.setSelectionRange(cursorPosition, cursorPosition);
            } else {
            // Если курсор находится в конце строки
            input.value = value.substring(0, cursorPosition);
            input.setSelectionRange(cursorPosition, cursorPosition);
            }
            break;
        case 'Backspace':
            output.value = output.value.slice(0, -1);
            break;
        case 'CapsLock':
            capsLockEnabled = !capsLockEnabled;
            keyboard.querySelectorAll('button').forEach(button => {
                if (button.textContent.length === 1) {
                    button.textContent = capsLockEnabled ? button.textContent.toUpperCase() : button.textContent.toLowerCase();
                }
            });
            break;
        case 'Shift':
            // do nothing, the shift key is only used for changing the keyboard layout
            // if the shift key is pressed, switch to the other keyboard layout
            currentLayout = currentLayout === 'en' ? 'ru' : 'en';
            //add lang to query string
            setLang(currentLayout);
            createKeyboard(keyboardLayouts[currentLayout]);
            break;
        case 'Control':

            break;
        case 'Alt':

            break;
        case 'Enter':
            output.value += '\n';
            break;
        case 'Space':
            output.value += ' ';
            break;
        case 'Tab':
            output.value += '    ';
            break;
        default:
            output.value += capsLockEnabled ? key.toUpperCase() : key.toLowerCase();
            break;
    }
}

function readLang() {
    const urlParams = new URLSearchParams(document.location.search);
    return urlParams.get('lang');
}

function setLang(lang) {
    const urlParams = new URLSearchParams(document.location.search);
    urlParams.set('lang', lang);
    document.location.search = urlParams.toString();
}

createKeyboard(keyboardLayouts[currentLayout]);

document.addEventListener('keydown', event => {
    const key = event.key.toLowerCase();

    if (key === 'shift') {
        // if the shift key is pressed, switch to the other keyboard layout
        currentLayout = currentLayout === 'en' ? 'ru' : 'en';
        // add lang to query string
        setLang(currentLayout);
        createKeyboard(keyboardLayouts[currentLayout]);
    } else {
        // find the corresponding button and simulate a click event
        const button = buttonHolder[currentLayout][key]
        if (button) {
            button.click();
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    output.focus();
});

// add keyboard press listener
document.addEventListener('keydown', event => {
    const key = event.key;
    // add active class to the button
    const button = buttonHolder[currentLayout][key]
    if (button) {
        button.classList.add('active');
        // timeout to remove the active class
        setTimeout(() => {
            button.classList.remove('active');
        }, 100);
    }
});

document.body.appendChild(text);