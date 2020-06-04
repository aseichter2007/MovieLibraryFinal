function processForm( e ){
    var dict = {
        Title : this["title"].value,
        Director: this["director"].value,
        Genre: this["genre"].value,
        Image: this["image"].value
    };

    $.ajax({
        url: 'https://localhost:44325/api/movie',
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(dict),
        success: function( data, textStatus, jQxhr ){
            $('#response pre').html( data );
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });

    e.preventDefault();
}

$('#my-form').submit( processForm );

$( document ).ready(getAllMovies);//get movies when page finishes loading

function getAllMovies(){
    $.ajax({
        
        url: 'https://localhost:44325/api/movie',
        datatype: 'application/json',
        type: 'get',
        success: function (data, textStatus, jQxhr) {
            console.log("Success!");
            console.log(data);
            populateMyTable(data);
            
        },
        error: function (jQxhr, textStatus, errorThrown){
            console.log("Error!");
            console.log(errorThrown);
        }
    })
}





function populateMyTable(data){

    $("#TableContent").html("");
    $("#TableContent").html(`
    <tr>
        <th>Id#</th>
        <th>Title</th>
        <th>Director</th>
        <th>Genre</th>
        <th>Image</th>
        <th>.</th>
    </tr>`
    )
    for (let i = 0; i < data.length; i++){
        $("#TableContent").append(`
        <tr id="tablerow${data[i]["movieId"]}">
            <td id="tabledataid${data[i]["movieId"]}">${data[i]["movieId"]}</td>
            <td id="tabledatatitle${data[i]["movieId"]}">${data[i]["title"]}</td>
            <td id="tabledatadirector${data[i]["movieId"]}">${data[i]["director"]}</td>
            <td id="tabledatagenre${data[i]["movieId"]}">${data[i]["genre"]}</td>
            <td><Img id="tableimg${data[i]["movieId"]}" class="imagesizer" src="${data[i]["imgUrl"]}"></td>
            <td class="mytablebuttons">
            <button type="button" onclick="setUpdateFields(${data[i]["movieId"]})">Edit</button>
            <button type="button" onclick="deleteMovie(${data[i]["movieId"]})">Delete</button> 
            <button type="button" onclick="getDetails(${data[i]["movieId"]})">Details</button>          
            </td>
        </tr>
        `);
    }
}
function setUpdateFields(id){
    let title = $("#tabledatatitle"+id).html();
    let director = $("#tabledatadirector"+id).html();
    let genre = $("#tabledatagenre"+id).html();
    let img = $("#tableimg"+id).attr('src')
    $("#TableContent").empty();
    //^working^
    //problem lives here
    $("#TableContent").append(`
    <form id="editmovie${id}">
        <input id="EditTitle" type="text" name="edittitle" placeholder="${title}" />
        <input id="EditDirector" type="text" name="editdirector" placeholder="${director}" />
        <input id="EditGenre" type="text" name="editgenre" placeholder="${genre}" />
        <input id="EditImage" type="text" name="editimage" placeholder="${img}" />
    </form>
    <button type="buton" onclick="updateMovie(${id})">Update</button>

    `)
    
    //turn into input fields like top of index
    //name values below 
    // 
}
//put request with object and number in body data
function updateMovie(id){
    let title = $("#EditTitle").val();
    let director= $("#EditDirector").val();
    let genre = $("#EditGenre").val();
    let image =  $("#EditImage").val();

    var dict = {
        Title : title,
        Director: director,
        Genre: genre,
        Image: image,
    };

    $.ajax({
        url: 'https://localhost:44325/api/movie/'+id,
        dataType: 'json',
        type: 'put',
        contentType: 'application/json',
        data: JSON.stringify(dict),
        success: function( data, textStatus, jQxhr ){
            $('#response pre').html( data );
            getAllMovies();
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });

    e.preventDefault();
}
//delete request with a number url.  /api/movie/3
function deleteMovie(id){
    $.ajax({
        url: 'https://localhost:44325/api/movie/'+id,
        type: 'delete',
        success: function (data, textStatus, jQxhr) {
            console.log("Success!");
            console.log(data);
            getAllMovies()
        },
        error: function (jQxhr, textStatus, errorThrown){
            console.log("Error!");
            console.log(errorThrown);
        }
    })
}
//get request with a number url.  /api/movie/3
function getDetails(id){
    $.ajax({
        url: 'https://localhost:44325/api/movie/'+id,
        type: "get",
        dataType: 'json',
        contentType: 'application/json',
        success: function (data, textStatus, jQxhr) {
            console.log("Success!");
            console.log(data);
            displayDetails(data)
        },
        error: function (jQxhr, textStatus, errorThrown){
            console.log("Error!");
            console.log(errorThrown);
        }
    })
 

}
function displayDetails(data){
    $("#TableContent").html("");
    //todo:
    //append a set of divs with the info for one object,
    //like in populateMyTable above, but it won't need a loop.
    //and probably need ids 
    $("#TableContent").append(`
    <div style="display:block" id="tablerow${data["movieId"]}">
        <div><Img id="tableimg${data["movieId"]}" class="imagesizer" src="${data["imgUrl"]}"></div>
        <div id="tabledataid${data["movieId"]}">${data["movieId"]}</div>
        <div id="tabledatatitle${data["movieId"]}">${data["title"]}</div>
        <div id="tabledatadirector${data["movieId"]}">${data["director"]}</div>
        <div id="tabledatagenre${data["movieId"]}">${data["genre"]}</div>
        <button type="button" onclick="setSingleUpdateFields(${data["movieId"]})">Edit</button>
    </div>
    `)

    function searchByPartial(){
        $.ajax({
            url: 'https://localhost:44325/api/movie/'+id,
            type: 'get',
            dataType: 'json',
            
        })
    }

}
function setSingleUpdateFields(id){
    let title = $("#tabledatatitle"+id).html();
    let director = $("#tabledatadirector"+id).html();
    let genre = $("#tabledatagenre"+id).html();
    let img = $("#tableimg"+id).attr('src')
    $("#TableContent").empty();
    //^working^
    //problem lives here
    $("#TableContent").append(`
    <form id="editmovie${id}">
        <input id="EditTitle" type="text" name="edittitle" placeholder="${title}" />
        <input id="EditDirector" type="text" name="editdirector" placeholder="${director}" />
        <input id="EditGenre" type="text" name="editgenre" placeholder="${genre}" />
        <input id="EditImage" type="text" name="editimage" placeholder="${img}" />
    </form>
    <button type="buton" onclick="updateMovie(${id})">Update</button>

    `)
    
    //turn into input fields like top of index
    //name values below 
    // 
}
function searchpartial(){
    let title = $("#Title").val();
    let director = $("#Director").val();
    let genre = $("#Genre").val();
    let img = $("#Image").attr('src');
   
    $.ajax({
        url: 'https://localhost:44325/api/movie/'+title+`/`+director+`/`+genre+`/`+ img,
        dataType: 'json',
        type: 'get',
        contentType: 'application/json',

        success: function( data, textStatus, jQxhr ){
            $('#response pre').html( data );
            displayDetails(data);
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });

}