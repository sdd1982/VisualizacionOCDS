**Visualización datos en formato OCDS**

Este repositorio contiene dos visualizaciones de datos, en formato OCDS:

1. Vista de tabla
2. Visualización de datos

## Vista de tabla
En este vista se tiene la lectura de los datos de una API, aplicando criterios de búsqueda. Los datos se pueden visualizar de manera painada (la misma que utiliza la API) y se pueden descargar en formato CSV. Si bien la vista se puede ver reducida en cantidad de datos, al descargar el archivo se puede ver todos los datos del estándar.

## Visualización de datos
Esta visualización está hecha haciendo uso de la librería D3.js, y utiliza el esquema de visualización crossfilter. La visualización permite hacer seguimiento a la gestión contractual de las entidades permitiendo visualizar lo porcentajes de contratación. Esta visualización cumple con las siguientes carcaterísticas:
1. drill down a nivel de entidad
2. Ver comportamiento por entidad, orden y sector

---
La estructura del directorio es que en la raíz del WebContent se encuentra la visualización y en la carpeta table, la vista de tabla
