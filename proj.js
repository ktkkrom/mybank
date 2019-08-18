

document.getElementById('findNum').onclick = () => {
  let number = document.getElementById('number').value;
  document.getElementById('content').innerHTML = '';
  if (number == parseInt(number)) {
    axios.get(`http://numbersapi.com/${number}`)
      .then(response => {
        response.data
        let contentDiv = document.getElementById('content');

        let p = document.createElement('p');
        contentDiv.appendChild(p);
        p.innerText = response.data;
      })
  } else {
    return alert('invalid number')
  }
}

document.getElementById('findCurrency').onclick = () => {
  document.getElementById('results').innerHTML = '';
  if (option1.selected === true) {
    axios.get(`https://api.exchangeratesapi.io/latest?base=EUR`)
      .then(response => {
        let resultsDiv = document.getElementById('results');
        let emptyUl = document.createElement('ul');
        resultsDiv.appendChild(emptyUl);
        response.data

        let currencyLi = new contentCreator(
          response.data.rates.SEK,
          response.data.rates.GBP,
          response.data.rates.BGN
        );
        let resultUl = resultsDiv.appendChild(currencyLi.createFinalUl());
        resultsDiv.replaceChild(resultUl, emptyUl);
      })
  } else if (option2.selected === true) {
    axios.get(`https://api.exchangeratesapi.io/latest?base=CAD`)
      .then(response => {
        let resultsDiv = document.getElementById('results');
        let emptyUl = document.createElement('ul');
        resultsDiv.appendChild(emptyUl);
        response.data

        let currencyLi = new contentCreator(
          response.data.rates.SEK,
          response.data.rates.GBP,
          response.data.rates.BGN
        );
        let resultUl = resultsDiv.appendChild(currencyLi.createFinalUl());
        resultsDiv.replaceChild(resultUl, emptyUl);
      })
  } else if (option3.selected === true) {
    axios.get(`https://api.exchangeratesapi.io/latest?base=CZK`)
      .then(response => {
        let resultsDiv = document.getElementById('results');
        let emptyUl = document.createElement('ul');
        resultsDiv.appendChild(emptyUl);
        response.data

        let currencyLi = new contentCreator(
          response.data.rates.SEK,
          response.data.rates.GBP,
          response.data.rates.BGN);
        let resultUl = resultsDiv.appendChild(currencyLi.createFinalUl());
        resultsDiv.replaceChild(resultUl, emptyUl);
      })
  }
}

class contentCreator {
  constructor(sek, gbp, bgn) {
    this.sek = sek;
    this.gbp = gbp;
    this.bgn = bgn;
  }
  createFinalUl() {
    let resultUl = document.createElement('result');
    resultUl.appendChild(this.createSek());
    resultUl.appendChild(this.createGbp());
    resultUl.appendChild(this.createBgn());

    return resultUl;
  }
  createSek() {
    let li1 = document.createElement('li');
    li1.innerText = `sek = ${this.sek}`;
    return li1;
  }
  createGbp() {
    let li2 = document.createElement('li');
    li2.innerText = `gbp = ${this.gbp}`;
    return li2;
  }
  createBgn() {
    let li3 = document.createElement('li');
    li3.innerText = `bgn = ${this.bgn}`;
    return li3;
  }
}

// Calculator
let calculate = (i) => {
  return function() {
    result.innerHTML = eval(result.innerHTML);
  };
}
let insertValue = i => {
  return function() {
    if (buttons[i].innerHTML === '÷') {
      result.innerHTML += ' / ';
    } else if (buttons[i].innerHTML === '×') {
      result.innerHTML += ' * ';
    } else if (buttons[i].innerHTML === '–') {
      result.innerHTML += ' - ';
    } else if (buttons[i].innerHTML === '+') {
      result.innerHTML += ' + ';
    } else if (buttons[i].innerHTML === 'C') {
      result.innerHTML = '';
    } else {
      result.innerHTML += buttons[i].innerHTML;
    }
  };
}

let buttons = document.getElementsByClassName('Calc-buttons');
let clear = document.getElementById('remove');
let result = document.getElementById('resultCalc');

for (let i = 0; i < buttons.length; i++) {
  if (buttons[i].innerHTML === '=') {
    buttons[i].addEventListener("click", calculate(i))
  } else {
    buttons[i].addEventListener("click", insertValue(i))
  }
};
