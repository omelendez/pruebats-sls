# Prueba Para Softtek

Muchas gracias por la oportunidad de participar en este reto que han propuesto. ha sido duro e intennso estos dias. Espero haber estado a la altura de lo esperado.

## Lo hecho

1. El proyecto esta hechoen nodejs v20.19.2 con typescript en modo ESM. Se uso TypeORM para los temas de capa de datos y migraciones. Para la paquetería usé pnpm. Se dispuso un modulo de express aislado del de serverless para trabajar en un entorno local. Luego usé serverless offline para probar lo hecho antes de deployarlo. Est estructurado de manera que dist obtiene todo lo transpilado por lo codificado en src.
2. Para la infraestructura de redis me hice una cuenta gratuita en uptash y para labase de datos, una imagen de docker de mariadb corriendo en mi nube propia que tengo.
3. Los 3 endpoint: fusionados, almacenar e historial
4. Fusionados actualmente trae los datos de 5 planetas de Starwars y conAviationStack, adjuntandole los ultimos 10 vuelos de un aeropuerto de una ciudad del mundo. La relación esta hecha en base al tipo de suelo. De manera arbitraria, asigne los tipos de suelo de países en la tierra con los tipos de suelo de los planetas de Starwars. Ejemplo
   SWAPI trae: Tattoine - terrain: dessert
   Mapeo trae: dessert: DXB //Emigratos
   De ahí que cada planeta obtiene el código iata del pais relacionado, y con ello obtiene los ultimos 10 vuelos de dicho país.
5. El service fusionado busca la información cacheada. Sino la encuentra, guarda la información en base de datos y luego en cache. Si se vuelve a visitar el dato viene de cache. Asimismo se programo un cliente redis basico para usarlo desde el servicio de cache y asi mantener las responsabilidades desacopladas. El cacheo se hace cada 30 minutos.
6. /almacenar es un endpoint que captura y guarda en tablas, información de 3 campos: nombre, telefono mensaje. Esto va a una tabla mensajes y se almacena (ademas de una llave primaria) junto con un timestamp del momento en que se proceso este endpoint. /historial retorna la información acumulada por /almacenar, y la muestra de manera descendente en base al timestamp.
7. Para el unit testing, se hizo con jest probando 4 servicios (dominio): redis, swapi, mensaje y fusionados. El coverage es ta es un punto aceptable. Hay lineas que jest detecta como faltantes pero en realidad no es relevante.
8. Se llego a construir la documentación con Swagger para los endpoints.
9. Se llego a establecer grupos de logs con Cludwatch / insights.

## Lo que no alcance

1. Si bien despliega a serverless en producción, hay un problema de fondo que esta tumbando todos los endpoints cuando esta en Lambda y es que descubri, que por mas que hoy por hoy serverless se jacta de usar typescript de manera nativa, aun presenta esquinazos con el modo ESM. Los errores detectados en los grupos de logs lo demuestran.
   * Fusionados tira un error de *Dynamic require of 'fs' is not supported* . Eso es porque TypeORM con nodejs en modo ESM intenta usar fs para cargar módulos. lambda bloquea ese tipo de acciones. De haber sabido esta situacion hubiera usado Drizzle.
   * Para Swagger *Dynamic require of "assert" is not supported* . En Swagger, `doctrine` usa `require('assert')` dinámico. Otra cosa que Lambda con ESM no lo permite. Podríamos haber intentado usar fastify pero ya no quedaba mas tiempo
2. La autentiacion de jwt o cognito.
3. El rate limit, aunque  se configuró, nunca se pudo visualizar.
4. Gherkin, en eso debo ser honesto, jamás he utilizado.
