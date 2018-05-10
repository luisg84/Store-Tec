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

    //nos devuelve una row
    let row = rows[0]
    let row2 = rows[1]
    //Se mandan los datos ibtenidos al html
    $('.stats').append('ID: <span>'+ row.id_cli +'</span> ')

    $('.stats').append('Nombre: <span>'+ row.nom_cli +'</span> ')



//Metodo para llenar las tablas de la aplicacion  dependiendo de el tampmañp de la tabla de la BDD
    for(var i=0; i<rows.length;i++){
      console.log(i);
      $('.tab').after('<tr style="text-align: center;" class="delt">'+
                      '<th >'+ rows[i].sku_pro +'</th>'+
                      '<th>'+ rows[i].nom +'</th>'+
                      '<th>'+ rows[i].mar +'</th>'+
                      '<th>'+ rows[i].mod +'</th>'+
                      '<th>'+ rows[i].cost +'</th>'+

                      '<th>'+ rows[i].exist +'</th>'+
                        '<th>'+ '<div class="bot1"> <button class="ui teal button boton blog-test">Editar</button><button class="ui red button elimbut" >Eliminar</button></div>'+'</th>'+

                      '</tr>')
                    }


                      var vasku = $('input:text[name=sku]').val();


                        var ni = rows.length-1;


                        var skunum = rows[ni].sku_pro + 1;

                          $("#sku").val(skunum)

//----------Tabla Productos admin--------------//

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

//----------Tabla Usuarios admin--------------//

let querye = 'SELECT * FROM usuario'
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
      //
      $('.emp').append('<tr style="text-align: center;" class="chk" >'+
                      '<th>'+ rows[i].nom_usu +'</th>'+
                      '<th >'+ rows[i].id_usu +'</th>'+
                         '<th>'+ rows[i].usu +'</th>'+
                      '<th>'+ rows[i].email +'</th>'+

                      '<th>'+ '<div class="bot1"> <button class="ui teal button"onclick="edit()">Editar</button><button class="ui red button">Eliminar</button></div>'+'</th>'+


                      '</tr>')
                    }





  });

  //----------Tabla Usuarios admin--------------//

  ///////////////////////////////////////////////////////////

  //----------Tabla Productos emp--------------//

  let querypod = 'SELECT * FROM productos'
    connection.query(querypod, function(err, rows, fields){
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
            $('.usuprod').after('<tr style="text-align: center;" >'+
                            '<th class="delt">'+ rows[i].sku_pro +'</th>'+
                            '<th>'+ rows[i].nom +'</th>'+
                            '<th>'+ rows[i].mar +'</th>'+
                            '<th>'+ rows[i].mod +'</th>'+
                            '<th>'+ rows[i].cost +'</th>'+

                            '<th>'+ rows[i].exist +'</th>'+
                            '</tr>')
                          }





    });

    //----------Tabla Productos emp--------------//

//-----------Fin Agregar datos a la tabla productos desde la Bdd---------//




//cierra conexion con la bdd
main.closeConnection();

});



//------<<<<<<<llenado de productos>>>>>>>-------//
function gf(){
  //obtengo los valores de el formulario y los agregamos a una variable
const sku = "'"+$('input:text[name=sku]').val()+"'"

const nombreP = "'"+$('input:text[name=nombreP]').val()+"'"

const marcaP = "'"+$('input:text[name=marcaP]').val()+"'"

const modeloP = "'"+$('input:text[name=modeloP]').val()+"'"

const costoP = "'"+$('input:text[name=costoP]').val()+"'"

const existenciaP = "'"+$('input:text[name=existenciaP]').val()+"'"

const descripcionP =  "'"+$("#descripcionP").val()+"'"






//se crea la constante con el query que se ejecutara en la bdd
let query4 =  "INSERT INTO `productos` (`sku_pro`, `nom`, `mar`, `mod`, `cost`, `desc`, `exist`) VALUES ("+sku+","+nombreP+","+marcaP+","+modeloP+","+costoP+","+descripcionP+","+existenciaP+");"

console.log(query4)

/*
// let query4 = "INSERT INTO `productos` (`sku_pro`, `nom`, `mar`, `mod`, `cost`, `desc`, `exist`) VALUES ('1120','consola','nintendo','switch','7000','nueva','3');";

INSERT INTO `productos` (`sku_pro`, `nom`, `mar`, `mod`, `cost`, `desc`, `exist`) VALUES ('1120','consola','nintendo','sw','' '','');*/




  //Funcion para ejecutar el query y nos devuelba el resultado o el error
  connection.query(query4, function(err, rows, fields){
    if(err){
      console.log("Error en la consulta")
      console.log(err)
      return
    }



});
alert("Producto agregado correctamente");
location.href='tabla.html';

}

///////////////////////////////////////////////////////
//------<<<<<<<Registro de Empleados>>>>>>>-------//
function regemp(){


  //obtengo los valores de el formulario y los agregamos a una variable
const nomus = "'"+$('input:text[name=nomusu]').val()+"'"

const pasw = "'"+$('input:password[name=pass]').val()+"'"

const emai = "'"+$('input:text[name=email]').val()+"'"

const nomb = "'"+$('input:text[name=nomb]').val()+"'"

const apepat = "'"+$('input:text[name=apepat]').val()+"'"

const apemat = "'"+$('input:text[name=apemat]').val()+"'"

const idus = "'"+$('input:text[name=idus]').val()+"'"

const dirus = "'"+$('input:text[name=dir]').val()+"'"

const telus = "'"+$('input:text[name=telf]').val()+"'"

const rfc = "'"+$('input:text[name=rfc]').val()+"'"

const tipus = "'"+$('select[id=tipusu]').val()+"'"





// location.href='usuariosad.html';






//se crea la constante con el query que se ejecutara en la bdd
var query5 =  "INSERT INTO `usuario` (`id_usu`, `nom_usu`, `apemat_usu`, `apepat_usu`, `rfc`, `tel`, `email`, `usu`, `con`, `tip_usu`) VALUES ("+idus+","+nomb+","+apemat+","+apepat+","+rfc+","+telus+","+emai+","+nomus+","+pasw+","+tipus+");"





  //Funcion para ejecutar el query y nos devuelba el resultado o el error
  connection.query(query5, function(err, rows, fields){
    if(err){
      console.log("Error en la consulta")
      console.log(err)
      return
    }



});
alert("Usuario agregado correctamente");
location.href='usuariosad.html';

}

///////////////////////////////////////////////////////



//------Editar producto------//
$(function(){

  $(document).on("click", ".boton", function(){



          var valores="";
          var i=0;
          var datpro = new Array(7);


          // Obtenemos todos los valores contenidos en los <td> de la fila
          // seleccionada
          $(this).parents("tr").find("th").each(function(){
            datpro[i]=$(this).html();
            i++;

          });

            // location.href='editprod.html';
            //
            // $('input:text[name=sku]').val(datpro[0])


          alert(datpro[0]+" "+datpro[1]+" "+datpro[2]+" "+datpro[3]+" "+datpro[4]+" "+datpro[5]);




  });
});

//------Editar producto------//


//------Eliminar fila------//

$(function(){

  $(document).on("click", ".elimbut", function(){
    var valores="";
    var i=0;
    var datel = new Array(7);


    // Obtenemos todos los valores contenidos en los <td> de la fila
    // seleccionada
    $(this).parents("tr").find("th").each(function(){
      datel[i]=$(this).html();
      i++;

    });







//variable que contienen el query para eliminar  la fila de la base de datos
    let query4 =  "DELETE FROM `productos` WHERE `productos`.`sku_pro` = " + datel[0]

    connection.query(query4, function(err, rows, fields){
      if(err){
        console.log("Error en la consulta")
        console.log(err)
        return
      }



  });

//elimina la fila de la tabla
  event.preventDefault();
      $(this).closest('tr').remove();


  });
});



//------Eliminar fila------//


// ------ Buscar------- //

$(function(){

      $(document).on("click", ".busc", function(){




        const busc = "'"+$('input:text[name=buscc]').val()+"'"

        let query7 =  "SELECT * FROM `productos` WHERE `productos`.`nom` = " + busc +"OR `productos`.`mar` ="+ busc +"OR `productos`.`sku_pro` ="+ busc +"OR `productos`.`mod` ="+ busc+"OR `productos`.`cost` ="+ busc;

        connection.query(query7, function(err, rows, fields){
          if(err){
            console.log("Error en la consulta")
            console.log(err)
            return
          }


              $(".delt").empty();
            var result = rows[0].mar




            for(var i=0; i<rows.length;i++){
              console.log(i);
              $('.tab').after('<tr style="text-align: center;" class="delt">'+
                              '<th >'+ rows[i].sku_pro +'</th>'+
                              '<th>'+ rows[i].nom +'</th>'+
                              '<th>'+ rows[i].mar +'</th>'+
                              '<th>'+ rows[i].mod +'</th>'+
                              '<th>'+ rows[i].cost +'</th>'+

                              '<th>'+ rows[i].exist +'</th>'+
                                '<th>'+ '<div class="bot1"> <button class="ui teal button boton blog-test">Editar</button><button class="ui red button elimbut" >Eliminar</button></div>'+'</th>'+

                              '</tr>')
                            }

      });




        });


        $(document).on("click", ".cance", function(){

          let query8 = 'SELECT * FROM productos'



          connection.query(query8, function(err, rows, fields){
            if(err){
              console.log("Error en la consulta")
              console.log(err)
              return
            }


                $(".delt").empty();



              for(var i=0; i<rows.length;i++){
                console.log(i);
                $('.tab').after('<tr style="text-align: center;" class="delt">'+
                                '<th >'+ rows[i].sku_pro +'</th>'+
                                '<th>'+ rows[i].nom +'</th>'+
                                '<th>'+ rows[i].mar +'</th>'+
                                '<th>'+ rows[i].mod +'</th>'+
                                '<th>'+ rows[i].cost +'</th>'+

                                '<th>'+ rows[i].exist +'</th>'+
                                  '<th>'+ '<div class="bot1"> <button class="ui teal button boton blog-test">Editar</button><button class="ui red button elimbut" >Eliminar</button></div>'+'</th>'+

                                '</tr>')
                              }

        });

          });

});



function busc(){



}

// ------ Buscar------- //



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
