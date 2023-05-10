// get all ramen objects from the server and display their images in the #ramen-menu div
function getRamen() {
    fetch('http://localhost:3000/ramens')
      .then(response => response.json())
      .then(ramenData => {
        ramenData.forEach(ramen => {
          const img = document.createElement('img');
          img.src = ramen.image;
          img.alt = ramen.name;
          img.dataset.id = ramen.id;
          document.querySelector('#ramen-menu').append(img);
        });
      });
  }
  
  // display the info for a clicked ramen image in the #ramen-detail div
  function showRamenInfo(event) {
    if (event.target.matches('img')) {
      const id = event.target.dataset.id;
      fetch(`http://localhost:3000/ramens/${id}`)
        .then(response => response.json())
        .then(ramen => {
          document.querySelector('.detail-image').src = ramen.image;
          document.querySelector('.name').textContent = ramen.name;
          document.querySelector('.restaurant').textContent = ramen.restaurant;
          document.querySelector('#rating-display').textContent = ramen.rating;
          document.querySelector('#comment-display').textContent = ramen.comment;
        });
    }
  }
  
  // create a new ramen and add its image to the #ramen-menu div
  function createRamen(event) {
    event.preventDefault();
    const newRamen = {
      name: event.target.name.value,
      restaurant: event.target.restaurant.value,
      image: event.target.image.value,
      rating: event.target.rating.value,
      comment: event.target['new-comment'].value
    };
    const img = document.createElement('img');
    img.src = newRamen.image;
    img.alt = newRamen.name;
    document.querySelector('#ramen-menu').append(img);
    event.target.reset();
  }
  
  // add event listeners
  document.addEventListener('DOMContentLoaded', getRamen);
  document.querySelector('#ramen-menu').addEventListener('click', showRamenInfo);
  document.querySelector('#new-ramen').addEventListener('submit', createRamen);
  
// show the details for the first ramen when the page loads
function showFirstRamen() {
    fetch('http://localhost:3000/ramens')
      .then(response => response.json())
      .then(ramenData => {
        const firstRamen = ramenData[0];
        document.querySelector('.detail-image').src = firstRamen.image;
        document.querySelector('.name').textContent = firstRamen.name;
        document.querySelector('.restaurant').textContent = firstRamen.restaurant;
        document.querySelector('#rating-display').textContent = firstRamen.rating;
        document.querySelector('#comment-display').textContent = firstRamen.comment;
      });
  }
  
  // update the rating and comment for a ramen
  function updateRamen(event) {
    event.preventDefault();
    const id = document.querySelector('.detail-image').dataset.id;
    const rating = event.target.rating.value;
    const comment = event.target.comment.value;
    document.querySelector('#rating-display').textContent = rating;
    document.querySelector('#comment-display').textContent = comment;
    event.target.reset();
  }
  
  // delete a ramen
  function deleteRamen() {
    const id = document.querySelector('.detail-image').dataset.id;
    document.querySelector(`img[data-id="${id}"]`).remove();
    document.querySelector('.detail-image').src = './assets/image-placeholder.jpg';
    document.querySelector('.name').textContent = 'Insert Name Here';
    document.querySelector('.restaurant').textContent = 'Insert Restaurant Here';
    document.querySelector('#rating-display').textContent = 'Insert rating here';
    document.querySelector('#comment-display').textContent = 'Insert comment here';
  }
  
  // add event listeners
  document.addEventListener('DOMContentLoaded', () => {
    getRamen();
    showFirstRamen();
  });
  document.querySelector('#edit-ramen').addEventListener('submit', updateRamen);
  document.querySelector('#delete-button').addEventListener('click', deleteRamen);

  
  // persist updates to a ramen's rating and comment
function updateRamen(event) {
    event.preventDefault();
    const id = document.querySelector('.detail-image').dataset.id;
    const rating = event.target.rating.value;
    const comment = event.target.comment.value;
    fetch(`http://localhost:3000/ramens/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ rating, comment })
    })
      .then(response => response.json())
      .then(updatedRamen => {
        document.querySelector('#rating-display').textContent = updatedRamen.rating;
        document.querySelector('#comment-display').textContent = updatedRamen.comment;
      });
    event.target.reset();
  }
  
  // persist new ramens
  function createRamen(event) {
    event.preventDefault();
    const newRamen = {
      name: event.target.name.value,
      restaurant: event.target.restaurant.value,
      image: event.target.image.value,
      rating: event.target.rating.value,
      comment: event.target['new-comment'].value
    };
    fetch('http://localhost:3000/ramens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRamen)
    })
      .then(response => response.json())
      .then(createdRamen => {
        const img = document.createElement('img');
        img.src = createdRamen.image;
        img.alt = createdRamen.name;
        img.dataset.id = createdRamen.id;
        document.querySelector('#ramen-menu').append(img);
      });
    event.target.reset();
  }
  
  // persist ramen deletions
  function deleteRamen() {
    const id = document.querySelector('.detail-image').dataset.id;
    fetch(`http://localhost:3000/ramens/${id}`, { method: 'DELETE' });
    document.querySelector(`img[data-id="${id}"]`).remove();
    document.querySelector('.detail-image').src = './assets/image-placeholder.jpg';
    document.querySelector('.name').textContent = 'Insert Name Here';
    document.querySelector('.restaurant').textContent = 'Insert Restaurant Here';
    document.querySelector('#rating-display').textContent = 'Insert rating here';
    document.querySelector('#comment-display').textContent = 'Insert comment here';
  }