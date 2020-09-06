export const cyrillicValidate = (event: any) => {
  if (/[а-яА-ЯЁё \n\s]+/.test(String.fromCharCode(event.keyCode))) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
};

export const FIELDS_NAME_MAPPING = {
  name: 'ФИО',
  gender: 'пол',
  age: 'возраст',
  relationship: 'семейное положение',
  child: 'дети',
  email: 'эл. почта',
  comment: 'коментарий',
};
