$(document).ready(function() { 
  $.getJSON('https://jsonplaceholder.typicode.com/users', function(users) { 
    users.forEach(function(user){

     $('#users-container').append(`
       <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
         <div class="user-header mb-4">
           <img class="user-thumb"  src="//joeschmoe.io/api/v1/${user.id}"  width="100px">
           <span class="ml-2">${user.name}</span></div>  
         <div class="wrapper" id="user-${user.id}"></div>
       </div>
     `);  
      $.getJSON(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`, function(posts) { 
       let titles = posts.map(post => post.title);
        titles.sort(function(a, b){ return b.length - a.length; });   
        titles.forEach(function(title, index){
          let color = 'text-danger';
          if(index%2==0) color='';
          $('#user-' + user.id).append(`<p class="mb-0 ${color}">${title}</p>`);
         });
      });    
    });
  });
}); 
