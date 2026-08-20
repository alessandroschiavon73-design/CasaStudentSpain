STUDENTBNB ESPAÑA — FRONTEND MULTICIUDAD PREPARADO PARA BASE DE DATOS EUROPEA
==========================================================================

Esta versión parte de la última versión italiana suministrada por el usuario y mantiene su estructura visual y funcional.

CAMBIOS ESTRUCTURALES
- Ya no existe una página piloto ligada a Padova.
- `ciudad.html?city=madrid` es una plantilla genérica para cualquier ciudad española.
- Configuración nacional separada en `assets/js/config.js` (countryCode ES, locale es-ES, EUR).
- Ciudades, anuncios y perfiles demo incluyen `countryCode`, `cityId` e identificadores de entidad compatibles con una futura base de datos común.
- `database-contract.json` define la propuesta de entidades y endpoints para el backend europeo único.
- El dominio español puede leer el mismo backend que Italia, Francia, Portugal, etc., filtrando por countryCode/cityId.
- Los datos demo siguen funcionando sin servidor para poder publicar y probar el frontend inmediatamente.

PÁGINAS
- index.html
- ciudad.html?city=madrid (o cualquier slug disponible)
- anuncio.html?id=<uuid-demo>
- publicar.html
- busco.html
- estudiantes.html
- casa-solidaria.html
- privacidad.html
- 404.html

DATOS DEMO
Hay anuncios iniciales en Madrid, Barcelona, Valencia, Sevilla y Granada, y perfiles de estudiantes en varias ciudades. No hay una ciudad piloto única.

BASE DE DATOS ÚNICA EUROPEA
En producción, la recomendación es un único backend/API y una única base de datos. Los dominios nacionales deben ser frontends/localizaciones que filtran por country_code. La autenticación debe ser común a todos los dominios.

MODO ACTUAL
`apiMode` está en `demo`: publicaciones, favoritos y búsquedas se guardan en localStorage. Cuando exista el backend, el punto de sustitución será la capa de datos del frontend; la estructura de URL y los identificadores territoriales ya están preparados.
