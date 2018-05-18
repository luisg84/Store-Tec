const remote = require('electron').remote
const main = remote.require('./main.js')

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



$(function(){


  //-----------Agregar datos a la tabla productos desde la Bdd---------//
    let query = 'SELECT * FROM productos'

   //Funcion para ejecutar el query y nos devuelba el resultado o el error
    connection.query(query, function(err, rows, fields){
      if(err){
        console.log("Error en la consulta")
        console.log(err)
        return
      }



  ///////////////////////////////////////////////////////////

  //----------Tabla Soporte admin--------------//

                        // llenar tabla soporte
              for(var i=0; i<rows.length;i++){
                console.log(i);
                $('.tabsop').after('<tr style="text-align: center;" >'+
                  '<th class="delt">'+ rows[i].sku_pro +'</th>'+
                    '<th>'+ rows[i].nom +'</th>'+
                      '<th>'+ rows[i].mar +'</th>'+
                      '<th>'+ rows[i].cost +'</th>'+
                        '<th>'+ rows[i].mod +'</th>'+

                        '<th>'+ rows[i].exist +'</th>'+

                                              '</tr>')
                                            }



    });

    //----------Tabla Soporte admin--------------//





  //-----------Fin Agregar datos a la tabla productos desde la Bdd---------//




  //cierra conexion con la bdd
  main.closeConnection();

  });


  });
