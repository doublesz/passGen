// Additional tasks:
// 1. ability to set password length
// 2. Add "copy on click"
// 3. Toggle symbols and numbers on/off

const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];
const numbersArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const specialsArr = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

const genBtn = document.querySelector('.gen-pass-btn');
const passOneBtn = document.querySelector('.pass-one');
const passTwoBtn = document.querySelector('.pass-two');
const formElem = document.querySelector('form');

const generateRandomPassword = (configObj) => {
    let passPlaceholder = "";
    const filtered = []

    if ('numbers' in configObj && 'symbols' in configObj) {
        filtered.push(...characters);
    } else if ('symbols' in configObj) {
        filtered.push(...characters.filter( el => !numbersArr.includes(el)));
    } else if ('numbers' in configObj) {
        filtered.push(...characters.filter( el => !specialsArr.includes(el)));
    } else {
        filtered.push(...characters.filter(el => (!numbersArr.includes(el) && !specialsArr.includes(el))));
    }

    
    
    for (let i = 0; i < parseInt(configObj.passLength); i++ ) {
        passPlaceholder += filtered[Math.floor(Math.random() * (filtered.length - 1))];
    }

    return passPlaceholder;
}


const generatePasswords = () => {    
    const formData = new FormData(formElem);
    const inputData = Object.fromEntries(formData.entries());

    if (inputData.passLength >= 5 && inputData.passLength <= 15) {
        passOneBtn.textContent = generateRandomPassword(inputData);
        passTwoBtn.textContent = generateRandomPassword(inputData);
    } else {
        alert("Password length must not be shorter than 5 and longer than 15 characters.")
    }    
}

genBtn.addEventListener('click', generatePasswords);

const copyToClipboard = (e) => {
    let copytxt = e.target.innerText;
    copytxt = navigator.clipboard.writeText(copytxt);
    alert(`${e.target.classList[1]} copied to clipboard!`);
    return copytxt;
}



passOneBtn.addEventListener('click', copyToClipboard);
passTwoBtn.addEventListener('click', copyToClipboard);