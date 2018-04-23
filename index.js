const remote = require('electron').remote
const main = remote.require('main.js')

$(function(){



//-----------Agregar datos a la tabla productos desde la Bdd---------//
  let query = 'SELECT * FROM productos'
 //Funcion para ejecutar el query y nos devuelba el resultado o el error
  main.connection.query(query, function(err, rows, fields){
    if(err){
      console.log("Error en la consulta")
      console.log(err)
      return
    }

    //nos devuelve una row
    let row = rows[0]
    let row2 = rows[1]
    //Se mandan los datos ibtenidos al html
    $('.stats').append('ID: <span>'+ row.id_cli +'</span> ')

    $('.stats').append('Nombre: <span>'+ row.nom_cli +'</span> ')


//Metodo para llenar las tablas de la aplicacion  dependiendo de el tampmañp de la tabla de la BDD
    for(var i=0; i<rows.length;i++){
      console.log(i);
      $('.tab').append('<tr style="text-align: center;">'+
                      '<th>'+ rows[i].sku_pro +'</th>'+
                      '<th>'+ rows[i].nom +'</th>'+
                      '<th>'+ rows[i].mar +'</th>'+
                      '<th>'+ rows[i].mod +'</th>'+
                      '<th>'+ rows[i].cost +'</th>'+
                      '<th>'+ rows[i].desc +'</th>'+
                      '<th>'+ rows[i].exist +'</th>'+

                      '</tr>')
                    }


  });

  main.closeConnection();
//-----------Fin Agregar datos a la tabla productos desde la Bdd---------//

  //-----------Agregar datos a la BDD de Productos---------//

function gf(){

  console.log("2");
}




  //Funcion para ejecutar el query y nos devuelba el resultado o el error
  connection.query(query, function(err, rows, fields){
    if(err){
      console.log("Error en la consulta")
      console.log(err)
      return
    }

    //nos devuelve una row
    let row = rows[0]
    let row2 = rows[1]
    //Se mandan los datos ibtenidos al html
    $('.stats').append('ID: <span>'+ row.id_cli +'</span> ')

    $('.stats').append('Nombre: <span>'+ row.nom_cli +'</span> ')


  //Metodo para llenar las tablas de la aplicacion  dependiendo de el tampmañp de la tabla de la BDD
    for(var i=0; i<rows.length;i++){
      console.log(i);
      $('.tab').append('<tr style="text-align: center;">'+
                      '<th>'+ rows[i].sku_pro +'</th>'+
                      '<th>'+ rows[i].nom +'</th>'+
                      '<th>'+ rows[i].mar +'</th>'+
                      '<th>'+ rows[i].mod +'</th>'+
                      '<th>'+ rows[i].cost +'</th>'+
                      '<th>'+ rows[i].desc +'</th>'+
                      '<th>'+ rows[i].exist +'</th>'+

                      '</tr>')
                    }


  });




})
