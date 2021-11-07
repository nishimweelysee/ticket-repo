import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css"


const errorToast = (message) => {
  Toastify({
    text: message,
    backgroundColor: '#ff4d4d',
    className: 'info',
  }).showToast();
};

const successToast = (message) => {
  Toastify({
    text: message,
    backgroundColor: '#03CE75',
    className: 'info',
  }).showToast();
};

export {successToast,errorToast}