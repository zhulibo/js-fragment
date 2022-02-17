import { type } from '../index'

function component() {
  const element = document.createElement('div');
  element.innerHTML = html;
  return element;
}

let html = type(123)

document.body.appendChild(component());
