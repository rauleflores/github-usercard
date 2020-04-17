/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

const cards = document.querySelector('.cards');


axios.get('https://api.github.com/users/rauleflores')
.then( response =>{
  const userCard = gitHubCardComponentCreator(response.data);
  cards.appendChild(userCard)
  return axios.get('https://api.github.com/users/rauleflores');
})
.then( response => {
  const followersCard = getFollowers(response.data.followers_url);
  cards.appendChild(followersCard)
})
.catch( error => { console.log(`Something went wrong: ${error}`) })



/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 
   Skip to Step 3.
*/
/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/
/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/


////Programmatically (get followers => create a card for each => append new card(s) to document )
function getFollowers(followers_url) {
  axios.get(followers_url)
  .then( response => {
    followersData = response.data.map( user => user.login)
    followersData.forEach( user =>{
      axios.get(`https://api.github.com/users/${user}`).then( response =>{
          const newUserCard = gitHubCardComponentCreator(response.data);
          cards.appendChild(newUserCard)
      }).catch( error => { console.log(`Something went wrong: ${error}`) })
    })
  }).catch( error => { console.log(`Something went wrong: ${error}`) })
}


//Extra hard-coded users just cause :)
let followersArray = [
  'bigknell',
  'tetondan',
  'dustinmyers',
  'luishrd',
  'justsml'
];

followersArray.forEach( user => {
  axios.get(`https://api.github.com/users/${user}`)
    .then( (response) =>{
      const newUserCard = gitHubCardComponentCreator(response.data);
      cards.appendChild(newUserCard)
  }).catch( error => { console.log(`Something went wrong: ${error}`) })
})

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:
<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>
*/

function gitHubCardComponentCreator( obj ){
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card');

  const userImg = document.createElement('img');
  userImg.src = obj.avatar_url;

  const cardInfo = document.createElement('div');
  cardInfo.classList.add('card-info');

  const userRealName = document.createElement('h3');
  userRealName.classList.add('name');
  userRealName.textContent = obj.name;

  const userHandle = document.createElement('p');
  userHandle.classList.add('username');
  userHandle.textContent = obj.login;

  const userLocation = document.createElement('p');
  userLocation.textContent = `Location: ${obj.location}`;

  const userProfile = document.createElement('p');
  userProfile.textContent = 'Profile: ';

  const userProfileLink = document.createElement('a');
  userProfileLink.textContent = obj.html_url;
  userProfileLink.href = obj.html_url;

  const userFollowers = document.createElement('p');
  userFollowers.textContent = `Followers: ${obj.followers}`;

  const userFollowing = document.createElement('p');
  userFollowing.textContent = `Following: ${obj.following}`

  const userBio = document.createElement('p');
  userBio.textContent = `Bio: ${obj.bio}`;

  userProfile.appendChild(userProfileLink)
  cardInfo.appendChild(userRealName)
  cardInfo.appendChild(userHandle)
  cardInfo.appendChild(userLocation)
  cardInfo.appendChild(userProfile)
  cardInfo.appendChild(userFollowers)
  cardInfo.appendChild(userFollowing)
  cardInfo.appendChild(userBio)
  cardDiv.appendChild(userImg)
  cardDiv.appendChild(cardInfo)
  
  //console.log(cardDiv)

  return cardDiv;
  
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/