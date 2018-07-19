import './styles/main.scss';

const stayUpdatedForm = document.querySelector('.form-stay-updated');

const setStayUpdatedForm = () => {
  const checkBox = document.querySelector('.form-stay-updated .form-check input[type=checkbox]');
  const confirmBtn = document.querySelector('.form-stay-updated input[type=submit]');
  checkBox.onclick = e => {
    confirmBtn.disabled = !checkBox.checked;
  };
};

if(stayUpdatedForm) setStayUpdatedForm();