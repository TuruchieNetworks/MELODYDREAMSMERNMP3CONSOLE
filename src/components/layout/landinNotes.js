
// <div class="profilecontainer profileCoverShowcase">
// <div class="main-container">
// <div class="profileShowcase padding-big">
//   <div class="dark-card-cove profilegrpbtn dark-glo">
//     <div class="dark-card-cove leadShowcase">
//       <h1 class="leadShowcase dark-glow dark-profile-overla"><a class="leadShowcas profilegrpbtn" href="/sasquaches/{{sasquach.id}}/stories">MELODY DREAMS <i class="fas fa-cloud-moon lea"></i></a></h1>
//     </div>
//     <div class="profileTitle leadShowcase profilegrpbtns profilecontainer dark-card-cover dark-overlay purple-circle-container ">
//       <h1 class="leadShowcase dark-profile-overlay">
//         <a class="profilegrpbtns leadShowcase" href="/sasquaches" onmouseenter="signuphover(this)">Released Tracks <i class="fas fa-ghost lea"></i> </a>
//       </h1>  

//       <h1 class="leadShowcase dark-card-cover dark-glo dark-profile-overlay-longwor">
//         <a class="leadShowcase dark-glo profilegrpbtns" href="/users/{{sasquach.id}}">
//           <i class="fas fa-eye leadShowcase" > {{}}'s watch</i>
//         </a>
//       </h1>
//     </div>

//     <div class="dojoCar dark-overla profilegrpbtns dark-glow">
//       <div class="program third_btn_hover leadShowcas dark-card-cove purple-circle-container">
//         <a class="text-bold leadShowcase dark-glow profilegrpbtns" href="/sasquaches/{{sasquach.id}}"><i class="fas fa-cat leadShowcase"> {{}} watch</i>
//         </a>  
//       </div>       
//       <i class="fas fa-ghost leadShowcas" onmouseenter="ghostHover(this)"></i>

//       <div class="seventh-width leadShowcas box-shado dark-card-cove dark-glow profilegrpbtn">
//         <div class=" leadShowcase dark-glo profilegrpbtns purple-circle-container">
//           <a class="flex profilegrpbtn leadShowcase" href="/sasquaches/{{sasquach.id}}">
//             <i class="fas fa-bell action leadShowcase"> New Track Alert!</i>
//           </a>
//           <a class="leadShowcas dark-glo" href="/sasquaches">
//             <i class="fas fa-skull-crossbones actio textShowcase dar" onmouseenter="landingHover(this)"> {{ }} new tracks{{}}!</i>
//           </a>
//         </div>
//         <div class="inner-card-showcase dark-overlas">
//           <p class="leadShowcase purple-circle-container profilegrpbtns">
//             <a class="profilegrpbtns leadShowcase dark-overlay" href= "/sasquaches/{{sasquach.id}}">{{ }}</a>
//           </p>
//           <p><h2 class="leadShowcase dark-card-cove profilegrpbtn"><i class="fas fa-skull-crossbones"> Music by: {{}} at {{}}</i></h2></p>
//         </div>
//       </div>
//       <div class="profilegrpbtns dark-glow textShowcase">
//         <p class="profilegrpbtns my">Date of release: {{}}</p>
//         <p class="dark-card-cover leadShowcas">
//           <a class="dark-card-cove textShowcase" href="/sasquaches/{{sasquach.id}}">
//             <i class="fas fa-eye"> {{}}'s watch! </i>{{}} since {{}}</a>
//         </p>
//       </div>
//       <div class="flex">
//         <p><a href="/sasquaches/{{sasquach.id}}/edit"><i class="fas fa-edit"></i></a></p>
//         <p><a href="/sasquaches/delete/confirmation/{{sasquach.id}}"> <i class="fas fa-trash"></i></a></p>
//       </div>
//       <div class="sized-width">
//       </div>
//     </div>
//     <div class="my-1 ">
//       <a class=" margin_light" href="/sasquaches/new">Add New Track!</a>
//     </div>
//   </div>
// </div>
// </div>
// </div>







// axios
//   .get('http://localhost:8000/api/users', { withCredentials: true })
//   .then(({ data }) => {
//     // Assuming songs is an array, loop through the songs
//     data.users.songs.forEach((songData, index) => {
//       // Access the specific data you need, adjust this part based on your actual data structure
//       console.log(`Song ${index + 1} Data:`, songData.songData);
//     });

//     // If you need data from a specific song, you can access it directly
//     const specificSongData = data.users.songs[songIndex].songData;
//     console.log('Specific Song Data:', specificSongData);
//   })
//   .catch((err) => {
//     console.log('Error:', err);
//   });
