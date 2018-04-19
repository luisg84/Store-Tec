const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;
const menu = electron.Menu

let mainWindow
let addWindow;

//listen for app to be ready(Escucha que la aplicacion este lista)
app.on('ready', function(){
  //crea una nueva ventana
  mainWindow = new BrowserWindow({});

  const {app, Menu} = require('electron')


  //carga el archvi html en la ventana
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
    isResizable:false,

  }));
mainWindow.isResizable(false);



  //construye el menu desde el template
  //const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  const menu = Menu.buildFromTemplate(template)

  //inserta el menu
  //Menu.setAppliactionMenu(mainMenu);
  Menu.setApplicationMenu(menu)
});



//Se encargara de agregar ventana
function createAddWindow(){
  //crea una nueva ventana
  addWindow = new BrowserWindow({
    width: 300,
    height:200,
    title:'Add shoping List'
  });
  const {app, Menu} = require('electron')
  //carga el archvi html en la ventana
  addWindow.loadURL('http://localhost/PHPBasicos/8tablas.php');

  //se encarga de recoleccion de basura
  addWindow.on('close', function(){
    addWindow = null;
  })
}

//catch item:addWindow
ipcMain.on('item:add', function(e, item){
   mainWindow.webContents.send('item:add', item);
   addWindow.close();

});




//Crear plantilla de barra de  menu
//const mainMenuTemplate = [

  //{
    //label: 'File'
//  }
//];
const template = [
  {
    label: 'File',
    submenu: [
      //aqui van las sub categorias
      {label: 'Add item',
        click(){
          createAddWindow();
        }},
      {label: 'Clear item',
      click(){
        mainWindow.webContents.send('item:clear');
      }},
      {label: 'Quit',
      accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',//con acelerator podemos crear los comandos con teclado para el funcionamiento de nuestro software y aqui se verifica si el software se esta corriendo en windows o wn mac
      click(){
        app.quit();//despues de la coma va el metodo o funcion que realizara la opcion de el menu al darle click, en este caso es una funcion que ya trae electron la cual es quit que cierr la app.
      }},
      /*{role: 'undo'},
      {role: 'copy'},*/


    ]
  }

]
//Verificamos si en mac para acomodar los items de el menu
if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
  })
}

//Add developer tools item if not in production
// Añadir elemento de herramientas de desarrollador si no está en producción
if(process.env.NODE_ENV !== 'production'){
  template.push({
    label: 'Developer Tools',
    submenu:[
      {label: 'Toggle DevTools',
      accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
    click(item, focusedWindow){
      focusedWindow.toggleDevTools();
    }},
    {role:'reload'}
    ]
  });
}
