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

main.closeConnection();

    });
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




  //------Editar producto------//
  $(function(){



  ////Detecta el click al boton  para ejecutar la funcion
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



          //se crean las variabes con los datos de la fila de el boton editar
            var idi = "'"+datpro[0]+"'";
            var nompr = "'"+datpro[1]+"'";

            //se crea la constante con el query que se ejecutara en la bdd
            var query6 =  "INSERT INTO `edit_prod` (`idedit`, `nom`) VALUES ("+idi+","+nompr+");"






              //Funcion para ejecutar el query y nos devuelba el resultado o el error
              connection.query(query6, function(err, rows, fields){
                if(err){
                  console.log("Error en la consulta")
                  console.log(err)
                  return
                }



            });

              //se redirige a la pantalla de el formuario de editar
              location.href='editprod.html';

              // const electron = requiere('electron');
              // const {ipcRenderer} = electron;
              //
              // const form = document.query


    });


  });

  //Funcion que actulizara la bdd al darle acepyar
  function edita(){
    //obtengo los valores de el formulario y los agregamos a una variable
  const sku = "'"+$('input:text[name=skuedit]').val()+"'"

  const nombreP = "'"+$('input:text[name=nombrePedit]').val()+"'"

  const marcaP = "'"+$('input:text[name=marcaPedit]').val()+"'"

  const modeloP = "'"+$('input:text[name=modeloPedit]').val()+"'"

  const costoP = "'"+$('input:text[name=costoPedit]').val()+"'"

  const existenciaP = "'"+$('input:text[name=existenciaPedit]').val()+"'"

  const descripcionP =  "'"+$("#descripcionP").val()+"'"




  let query12 =  "UPDATE `productos` SET `nom` = "+nombreP+", `mar` = "+marcaP +", `mod` ="+ modeloP+ ", `cost` =" + costoP +", `desc` =" +descripcionP+", `exist` ="+existenciaP+ "WHERE `productos`.`sku_pro` ="+ sku;

  //se crea la constante con el query que se ejecutara en la bdd


  console.log(query12)

  /*
  // let query4 = "INSERT INTO `productos` (`sku_pro`, `nom`, `mar`, `mod`, `cost`, `desc`, `exist`) VALUES ('1120','consola','nintendo','switch','7000','nueva','3');";

  INSERT INTO `productos` (`sku_pro`, `nom`, `mar`, `mod`, `cost`, `desc`, `exist`) VALUES ('1120','consola','nintendo','sw','' '','');*/




    //Funcion para ejecutar el query y nos devuelba el resultado o el error
    connection.query(query12, function(err, rows, fields){
      if(err){
        console.log("Error en la consulta")
        console.log(err)
        return
      }



  });

    alert("Producto editado correctamente")
  location.href='tabla.html';

  //se llama a la funcion que borrara los datos de la tupla auxiliar de la bdd
  borr(sku);


  }

  function borr(t){


    //variable con el query que se ejecutara en la bdd
    let query13 =  "DELETE FROM `edit_prod` WHERE `edit_prod`.`idedit` = " + t;

    //funcion que ejecuta el query
    connection.query(query13, function(err, rows, fields){
      if(err){
        console.log("Error en la consulta")
        console.log(err)
        return
      }



  });
  }

  //Funcion cancelar de el boton de la pantalla editar
  function cancel(){

    //toma el valor del sku que se esta editando
  const sku = "'"+$('input:text[name=skuedit]').val()+"'"

  //llama a la funcion borrar con el parametro del sku que se esta editando para que lo borre de la tupla auxiliar
  borr(sku);

    //redirecciona a la pantalla de productod
    location.href='tabla.html';
  }





  //------Editar producto------//
  //////////////////////////////


  //////////////////////////////

  //------Eliminar fila------//

  $(function(){





    //Detecta el click al boton  para ejecutar la funcion
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

        alert("Eliminado correctamente");


    });
  });



  //------Eliminar fila------//




  // ------ Buscar------- //

  $(function(){


        //Detecta el click al boton buscar  para ejecutar la funcion
        $(document).on("click", ".busc", function(){



            //constante que obtienen el valor de el input de buscar
          const busc = "'"+$('input:text[name=buscc]').val()+"'"

            //se crea el query que se ejecutara la consulat en la BDD
          let query7 =  "SELECT * FROM `productos` WHERE `productos`.`nom` = " + busc +"OR `productos`.`mar` ="+ busc +"OR `productos`.`sku_pro` ="+ busc +"OR `productos`.`mod` ="+ busc+"OR `productos`.`cost` ="+ busc;

            //Funcion que ejecuta el query en la BDD
          connection.query(query7, function(err, rows, fields){
            if(err){
              console.log("Error en la consulta")
              console.log(err)
              return
            }



                $(".delt").empty();
              var result = rows[0].mar



                  //se genera la tabla con los datos que coinciden con la busqueda
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

            //Funcion que se jecuta al precionar cancelar
          $(document).on("click", ".cance", function(){

              //se Crea una constante con el query que mostrara todos los prodcutos
            let query8 = 'SELECT * FROM productos'


              //Funcion que ejecuta el query en la BDD
            connection.query(query8, function(err, rows, fields){
              if(err){
                console.log("Error en la consulta")
                console.log(err)
                return
              }

                //borra la tabla con el resultado de la busqueda
                  $(".delt").empty();


                    //pinta la tabla con todos los datos de la BDD
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




  // ------ Buscar------- //
