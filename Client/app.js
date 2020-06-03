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
        <tr>
            <td>${data[i]["movieId"]}</td>
            <td>${data[i]["title"]}</td>
            <td>${data[i]["director"]}</td>
            <td>${data[i]["genre"]}</td>
            <td><Img class="imagesizer" src="${data[i]["imgUrl"]}"></td>
            <td>
            <button type="button" onclick="updateMovie(${data[i]["movieId"]})">Edit</button>
            <button type="button" onclick="deleteMovie(${data[i]["movieId"]})">Delete</button>           
            </td>
        </tr>
        `);
    }
}
function updateMovie(id){

}
function deleteMovie(id){

}
