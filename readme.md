# yariel.dev-sqlserver

Libreria de conexion de datos a sqlserver la cual devuelve un formato centralizado de salida de los datos

## install

```sh
$ npm install yariel.dev-sqlserver
```

## use

```js
//require the module
const { exec } = require("yariel.dev-sqlserver");

//
app.get("/con", async function (req, res) {
  //bloque de tres lineas para funcionar
  let SQL = `SELECT * FROM public.usuarios`; //sentencia SQL
  let msgOk = "usuario encontrado"; //mensaje cuando encuentra registro
  let msgVacio = "No encontramos usuario"; //mensaje cuando el registro es 0
  const resp = await exec(SQL, msgOk, msgVacio);
  //fin bloque de tres lineas para funcionar

  res.status(200).json(resp);
});
```

# config

Lo primero es crear un archivo .env en la raiz del proyecto con las siguientes variables el valor de cada variable debe configurarlas con la de su base de datos sqlserver

```js
DATABASE = userdb;
HOSTDB = localhost;
USERDB = user;
PASSWORDDB = 12345;
MAX_POOL = 10;
idleTimeoutMillis = 30000;
```

# Respuesta ok

se devuelve un objeto json con el siguiente info
count= es el numero de registros
message= el mensaje personalizado que se le envio
y data= la respuesta a la sentencia sql

```js
{
"count": 1,
"message": "Se a encontrado un usuario",
"data": [{
    "apellidos": "Bros",
    "nombres": "Mario",
    "correo": "otroemail@nomail.com",
    "delete": false
    }]
}
```

# Respuesta error

Si ocurre un error a nivel de la base de datos el cuerpo que se regresa es el siguiente
donde count es negativo

```js
{
"count": -1,
"message": " error: relation "public.usuario" does not exist",
"data": []
}
```

si necesita colocar un mensaje personalizado para los errores puede aumentar un parametro mas

```js
const { exec } = require("yariel.dev-sqlserver");

//(optionally) set the SQL dialect
app.get("/con", async function (req, res) {
  let SQL = `SELECT * FROM public.usuarios`; //sentencia SQL
  let msgOk = "usuario encontrado"; //mensaje cuando encuentra registro
  let msgVacio = "No encontramos usuario"; //mensaje cuando el registro es 0
  let msgError = "ha ocurrido un error personalizado"; //mensaje cuando encuentra registro
  const resp = await exec(SQL, msgOk, msgVacio, msgError); //se aumenta un parametro, si no se envia mensaje se devuelve el error de la base de datos
  res.status(200).json(resp);
});
```
