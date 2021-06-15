# Estrategia

Se utilizo lazy load para la carga prebia de los componentes, asi como el uso de hooks y funciones para la carga y el generado de build por medio de webpack fuera mas rapido.

El manejo de las peticiones se utilizo redux-saga para las peticiones por medio del flujo que redux.
Persistencia de datos con redux-persist
Para los estilos se utilizaron Material ui, styled-components.
Manejo de rutas por react router.

Las peticiones api estan protegidas con token por medio de jwt generado al momento de iniciar sesion correctamente.

Para el webservice se utilizo:

-  webpack para generar el build 
-  expressjs,
-  jwt,
-  hemlet,
-  passport