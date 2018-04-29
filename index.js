
$(function(){
  //se crea constante que manda a llamra a la libreria de mysql
  const mysql = require('mysql')
  //Se crea una constante que contienen una funcion con los datos de conexion de la base de datos
  const connection = mysql.createConnection({
    Host: '127.0.0.1',
    Port: '3306',
    user: 'root',
    password: 'root',
    database: 'StoreTec'
  })

//abrir conexion
  connection.connect(function(err){
    //Si hay un error nos mostrara esto
    if(err){
      console.log(err.code)
      console.log(err.fatal)
    }
  })


//-----------Agregar datos a la tabla productos desde la Bdd---------//
  let query = 'SELECT * FROM productos'

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


let querye = 'SELECT * FROM empleado'
  connection.query(querye, function(err, rows, fields){
    if(err){
      console.log("Error en la consulta")
      console.log(err)
      return
    }

    //nos devuelve una row

    let row2 = rows[1]
    //Se mandan los datos ibtenidos al html


//Metodo para llenar las tablas de la aplicacion  dependiendo de el tampmañp de la tabla de la BDD
    for(var i=0; i<rows.length;i++){
      console.log(i);
      $('.emp').append('<tr style="text-align: center;">'+
                      '<th>'+ rows[i].id_emp +'</th>'+
                      '<th>'+ rows[i].nom_emp +'</th>'+
                      '<th>'+ rows[i].apepat_emp +'</th>'+
                      '<th>'+ rows[i].apemat_emp +'</th>'+
                      '<th>'+ rows[i].dir+'</th>'+
                      '<th>'+ rows[i].tel +'</th>'+
                      '<th>'+ rows[i].email +'</th>'+
                      '<th>'+ rows[i].usu +'</th>'+
                      '<th>'+ rows[i].con +'</th>'+
                      '<th>'+ rows[i].rfc+'</th>'+

                      '</tr>')
                    }


  });

//-----------Fin Agregar datos a la tabla productos desde la Bdd---------//




//cierra conexion con la bdd
  connection.end(function(){

  })
})


function gf(){

  console.log("2");
}
