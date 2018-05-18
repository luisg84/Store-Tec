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

                        '<th>'+ '<div class="bot1"> <button class="ui teal button editusu">Editar</button><button class="ui red button elimusu">Eliminar</button></div>'+'</th>'+


                        '</tr>')
                      }


                      var cont = rows.length-1;


                      var sautid = rows[cont].id_usu + 1;

                        $("#idusu").val(sautid)





    });



    //----------Tabla Usuarios admin--------------//


});



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
var query5 =  "INSERT INTO `usuario` (`id_usu`, `nom_usu`, `apemat_usu`, `apepat_usu`, `rfc`, `tel`, `email`, `usu`, `con`, `tip_usu`,`dir_usu`) VALUES ("+idus+","+nomb+","+apemat+","+apepat+","+rfc+","+telus+","+emai+","+nomus+","+pasw+","+tipus+","+dirus+");"





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

//------Editar Usuario------//
$(function(){



////Detecta el click al boton  para ejecutar la funcion
  $(document).on("click", ".editusu", function(){



          var valores="";
          var i=0;
          var datusu = new Array(11);


          // Obtenemos todos los valores contenidos en los <td> de la fila
          // seleccionada
          $(this).parents("tr").find("th").each(function(){
            datusu[i]=$(this).html();
            i++;

          });

            // location.href='editprod.html';
            //
            // $('input:text[name=sku]').val(datpro[0])



        //se crean las variabes con los datos de la fila de el boton editar
          var idi = "'"+datusu[1]+"'";
          var nompr = "'"+datusu[0]+"'";

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

            location.href='edit_usu.html';

            // const electron = requiere('electron');
            // const {ipcRenderer} = electron;
            //
            // const form = document.query


  });


});

//Funcion que actulizara la bdd al darle acepyar
function editaus(){
  //obtengo los valores de el formulario y los agregamos a una variable
const usua = "'"+$('input:text[name=nomusuedit]').val()+"'"//

const idusua = "'"+$('input:text[name=idusedit]').val()+"'"//

const pass = "'"+$('input:password[name=passedit]').val()+"'"//

const email = "'"+$('input:text[name=emailedit]').val()+"'"//

const nomus = "'"+$('input:text[name=nombedit]').val()+"'"//

const apepat = "'"+$('input:text[name=apepatedit]').val()+"'"//

const apemat = "'"+$('input:text[name=apematedit]').val()+"'" //

const dir = "'"+$('input:text[name=diredit]').val()+"'"//

const telf = "'"+$('input:text[name=telfedit]').val()+"'"//

const rfc = "'"+$('input:text[name=rfcedit]').val()+"'"//






let query12 =  "UPDATE `usuario` SET `nom_usu` = "+nomus+", `apemat_usu` = "+apemat+", `apepat_usu` ="+apepat+ ", `rfc` =" + rfc +", `tel` =" +telf+", `email` ="+email+", `usu` =" +usua+", `con` =" +pass+", `dir_usu` =" +dir+ "WHERE `usuario`.`id_usu` ="+ idusua;

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
  alert("Usuario editado correctamente")
location.href='usuariosad.html';

//se llama a la funcion que borrara los datos de la tupla auxiliar de la bdd
borr(idusua);


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
function cancelus(){

  //toma el valor del sku que se esta editando
const usuid = "'"+$('input:text[name=idusedit]').val()+"'"

//llama a la funcion borrar con el parametro del sku que se esta editando para que lo borre de la tupla auxiliar
borr(usuid);

  //redirecciona a la pantalla de productod
  location.href='usuariosad.html';
}





//------Editar Usuario------//

//------Eliminar fila Usuarios------//

$(function(){





//Detecta el click al boton  para ejecutar la funcion
  $(document).on("click", ".elimusu", function(){


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
    let query4 =  "DELETE FROM `usuario` WHERE `usuario`.`id_usu` = " + datel[1]

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

      alert("Usuario eliminado correctamente");


  });
});



//------Eliminar fila Usuarios------//
