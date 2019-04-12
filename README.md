**Visualización datos en formato OCDS**

Este repositorio contiene dos visualizaciones de datos, en formato OCDS:

1. Vista de tabla
2. Visualización de datos

## Vista de tabla
En este vista se tiene la lectura de los datos de una API, aplicando criterios de búsqueda. Los datos se pueden visualizar de manera painada (la misma que utiliza la API) y se pueden descargar en formato CSV. Si bien la vista se puede ver reducida en cantidad de datos, al descargar el archivo se puede ver todos los datos del estándar.

![alt text](https://github.com/sdd1982/VisualizacionOCDS/blob/master/docs/previewTabla.png?raw=true)

## Visualización de datos
Esta visualización está hecha haciendo uso de la librería D3.js, y utiliza el esquema de visualización crossfilter. La visualización permite hacer seguimiento a la gestión contractual de las entidades permitiendo visualizar lo porcentajes de contratación. Esta visualización cumple con las siguientes carcaterísticas:
1. drill down a nivel de entidad
2. Ver comportamiento por entidad, orden, sector y año

![alt text](https://github.com/sdd1982/VisualizacionOCDS/blob/master/docs/previewVisualizacion.png?raw=true)
---
La estructura del directorio es que en la raíz del WebContent se encuentra la visualización y en la carpeta table, la vista de tabla

---
** Display data in OCDS format **

This repository contains two data visualizations, in OCDS format:

1. Table view
2. Data visualization

## Table view
In this view you can read the data of an API, applying search criteria. The data can be displayed in a paired way (the same as the API) and can be downloaded in CSV format. Although the view can be reduced in quantity of data, when downloading the file you can see all the data of the standard.

## Data visualization
This visualization is made using the D3.js library, and uses the crossfilter visualization scheme. The visualization allows to follow the contractual management of the entities allowing to visualize the percentages of hiring. This visualization complies with the following characteristics:
1. drill down at entity level
2. See behavior by entity, order, sector and year

---
The structure of the directory is that at the root of the WebContent is the visualization and in the table folder, the table view
