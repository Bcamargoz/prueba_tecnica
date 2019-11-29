# PruebaTecnicaFront

La prueba tecnica fue realizada en la parte del backend con el framework Laravel y en la parte del frontend con Angular

## Iniciar Projecto Laravel

Para iniciar el backend desde la terminal navegamos hasta la carpeta donde se encuantra el proyecto y usamos el siguiente comando:

`composer install`

una vez instalados los paquetes, modificar el archivo `.env` con los datos de acceso a la base de datos y usar el comando para la creacion de las estructura en la base de datos:

`php artisan migrate`

para finalizar correr el servidor con el siguiente comando:

`php artisan serve`


## Iniciar Projecto Angular

Para iniciar el frontend desde la terminal navegamos hasta la carpeta donde se encuantra el proyecto y usamos el siguiente comando:

`npm install`

una vez instalados los paquetes, usamos el siguiente comando para iniciar el servidor de desarrollo:

`ng serve`

previamente se debe tener instalado Angular en el equipo, si no se tiene usar el comado:

`npm install -g @angular/cli`