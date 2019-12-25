// eslint-disable-next-line no-unused-vars
const SOCKET = io.connect(); // global connection
// eslint-disable-next-line max-len
document.querySelector('bcb-navbar').addEventListener('bcbnavbar', (e) => navigate(e.detail));
const content = document.getElementById('bcbcontent');

const navigate = (e) => {
  switch (e) {
    case 'Pantry':
      content.slot = 'slot1';
      break;

    case 'Recipes':
      content.slot = 'slot3';
      break;

    case 'Profile':
      content.slot = 'slot2';
      break;

      case 'Feed':
        content.slot = 'slot4';
        break;

    case 'logout':
      localStorage.removeItem('data');
      localStorage.removeItem('profile');
      window.location = '/users/logout';
      break;
  }
};

let scrollPos = 0;
document.addEventListener('scroll', function() {
  if (document.body.getBoundingClientRect().top > scrollPos) {
    document.querySelector('bcb-navbar').classList.remove('hidden');
  } else {
    document.querySelector('bcb-navbar').classList.add('hidden');
  }
  scrollPos = document.body.getBoundingClientRect().top;
});
