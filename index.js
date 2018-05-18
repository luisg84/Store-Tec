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

  ///////////////////////////////////////////////////////////


  //----------Tabla Productos admin--------------//

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


///////////////////////////////////////////////////////////


  ///////////////////////////////////////////////////////////



//-----------Fin Agregar datos a la tabla productos desde la Bdd---------//




//cierra conexion con la bdd
main.closeConnection();

});





//-----Login---//
$(function(){



//funcion que se ejecutara cuando detecte el evento click en el elementocon la clase testt
$(document).on("click", ".testt", function(){




// variable con el query que se ejecutara en la bdd
    let query = 'SELECT * FROM usuario'

   //Funcion para ejecutar el query y nos devuelba el resultado o el error
    connection.query(query, function(err, rows, fields){
      if(err){
        console.log("Error en la consulta")
        console.log(err)
        return
      }

      //S obtienen los valores de los campos de el login

        const usu =$('input:text[name=usuario]').val();
        const pass =$('input:password[name=passw]').val();


        // var usu = "and84";
        // var opcion = "a";


        //Se recorre la tabla de usuarios por medio de un ciclo for
      for(var i=0; i<rows.length;i++){

          //se verifica si el usuario y la contraseña coinciden y el tipo de usuario y se manda al panel de control correspondiente
          ////se verifica el tipo de usuario Administrador
          if(rows[i].usu==usu && rows[i].con==pass && rows[i].tip_usu==1){
            alert("se encontro el usuario administrador");

                i=rows.length
                location.href='panel_cont_ad.html';


                //se verifica el tipo de usuario normal
          }else if (rows[i].usu==usu && rows[i].con==pass && rows[i].tip_usu==2) {
            alert("se encontro el usuario Normal");
              i=rows.length
              location.href='panel_cont_P.html';

              //se verifica el tipo de usuario Cajero
          }else if (rows[i].usu==usu && rows[i].con==pass && rows[i].tip_usu==3) {
            alert("se encontro el usuario Cajero");
              i=rows.length
              location.href='panel_cont_V.html';
              //se verifica el tipo de usuario Soporte
          }else if (rows[i].usu==usu && rows[i].con==pass && rows[i].tip_usu==4) {
            alert("se encontro el usuario soporte");
              i=rows.length
              location.href='panel_cont_S.html';
              //en caso de que no alla coincidencias se muestra un texto con error
          }else if (i==rows.length-1) {

              $('.errr').text('usuario o contraseña incorrectos')
          }

      }


    });

    });
});

//-----Login---//
