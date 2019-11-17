var users = null;
var query = "";
function loadUsers(){
    $.getJSON('https://jsonplaceholder.typicode.com/users', apiusers => { 
      users = apiusers;
      console.log(users);
      var names = users.map(user => user.name);
      let pattern = /\b(?:Mrs\.? *|Mr\. *|, Dr)\b/g;
      
      names.forEach(function(name, index){
        query += "name[]=" + name.replace(pattern, "").replace(/ .*/,'') + "&";       
      });
      getGenders();
    });
}
function getGenders(){
    $.getJSON('https://api.genderize.io/?' + query,
      function(genders) { 
      genders = genders.map(gender => gender.gender);
      genders.forEach(function(gender, index){
        users[index].gender = gender; 
      });
      console.log(genders);
      getPosts();
    });  
}
function getPosts(){

   users.forEach((user, index) => {
     $('#users-container').append(`
       <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
         <div class="user-header mb-4">
           <img class="user-thumb"  src="//joeschmoe.io/api/v1/${user.gender}/random"  width="100px">
           <span class="ml-2">${user.name}</span></div>  
         <div class="wrapper" id="user-${user.id}"></div>
       </div>
     `);  
     
    $.getJSON(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`,
        posts => { 
          let titles = posts.map(post => post.title);
          titles.sort(function(a, b){ return b.length - a.length; });   
          titles.forEach(function(title, index){
          let color = 'text-danger';
          if(index%2==0) color='';
          $('#user-' + user.id).append(`<p class="mb-0 ${color}">${title}</p>`);
         });
      });  
   });

}
$(document).ready(function() { 
  loadUsers();  
}); 
