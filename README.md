<p  align="center">
<img  src="https://raw.githubusercontent.com/Jucema89/leadManager-app/main/src/assets/img/leadman-logo.png"  width="218px"  alt="Aitrain logo"  />
</p>

  

<h3  align="center">Gestor de Leads conectado a Google Sheets.</h3>

<p  align="center">Conecta tu sheet con LeadMan y entrega acceso a tu equipo de ventas, gestiona los estados de tus leads desde un solo lugar.</p>

<p  align="center"><a  href="https://leadman.juliodaza.com/">App Produccion</a> · <a  href="https://github.com/Jucema89/leadManager-api">Github Backend</a></p>

<br  />

  
  

<br>

  

<p  align="center">

<a  href="https://strapi.io">

<img  src="https://raw.githubusercontent.com/Jucema89/leadManager-app/main/src/assets/img/leadman_app.png"  alt="Aitrain Preview Project"  />
</a>
</p>
<br>

##  Correr en Desarollo

Si deseas correr la app en local debes tener la versión 20 de Node o superior:
### Correr Frontend Angular
`git clone git@github.com:Jucema89/leadManager-app.git`
`npm i`
`ng serve`

### Correr Backend NodeJs
`git clone git@github.com:Jucema89/leadManager-api.git`
`npm i`
Crear archivo de ambiente `.env` en el root del proyecto;
```
ENVIRONMENT='develop'

PORT_EXPRESS=3900
BACK_NODE_URL='http://localhost:3900'
CORS_DOMAINS='http://localhost:3000,http://localhost:4200'
DATABASE_URL='postgresql://<userPostgresql>:<pass_user>@localhost:6432/leadManager'
```
  dentro de `/src/conf/` mover el .json que se obtiene al crear un service Account en Google Api. aqui:  [Google Cloud Console](https://console.cloud.google.com/iam-admin/serviceaccounts)

> Recuerda compartir tu google sheet con el cliente Email que genera Google dentro del servicio, el que termina en iam.gserviceaccount.com

Este proyecto esta creado con Angular como Framework de frontend y los estilos vienen de [Preline](https://preline.co/docs/index.html) un framework de Estilos basado en tailwind.