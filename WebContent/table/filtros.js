function cargarSelect() {
	console.log("cargarSelect");
	var host = window.location.protocol + '//' + window.location.host; //"http://localhost:8080";

	var api = host + "/apiCCE2.0/rest/releases/";
	api = "https://raw.githubusercontent.com/sdd1982/visualizacion/master/darEntidades.json";
	d3.json(api, function(data){

		$("#buyer").empty();
		$("#buyer").append('<option value="ALL">Seleccione...</option>'); 
		var tmpAry = new Array();
	    for (var i=0;i<data.entidades.length;i++) {
	        tmpAry[i] = new Array();
	        tmpAry[i][0] = data.entidades[i].legalName;
	        tmpAry[i][1] = data.entidades[i].id;
	    }
	    tmpAry.sort();
		for (var i=0; i<tmpAry.length; i++){
			if(tmpAry[i] != "") {
			    $("#buyer").append('<option value="' + tmpAry[i][1] + '">' + tmpAry[i][0] + '</option>'); 
			}
		}     
	});
	
} 

function filter2() {
	console.log("filter");
	var form = document.getElementById("filters");
	var filtersName = document.getElementsByName('filter');
	var filterName;
	for(var i = 0; i < filtersName.length; i++){
	    if(filtersName[i].checked){
	    	filterName = filtersName[i].value;
	    }
	}
	var strUser = "";
	var filterURL = "";
	console.log("filterName: "+filterName);
	if(filterName == 'tender.status') {
		var e = document.getElementById("tender.status");
		strUser = e.options[e.selectedIndex].value;
	}
	else if(filterName == 'tender.procurementMethod') {
		var e = document.getElementById("tender.procurementMethod");
		strUser = e.options[e.selectedIndex].value;
	}
	else if(filterName == 'buyer') {
		var entidad = document.getElementById("buyer").value;
		if(entidad != "ALL") {
			strUser = entidad;
			filterName = "parties.0.identifier.id"
		} else {
			filterName = null;
		}
	}
	else if(filterName == 'tag') {
		var e = document.getElementById("tag");
		strUser = e.options[e.selectedIndex].value;
	}
	else if(filterName == 'planning.rationale') {
		strUser = document.getElementById("planning.rationale").value;
	}
	else if(filterName == 'tender.submissionMethod') {
		var e = document.getElementById("tender.submissionMethod");
		strUser = e.options[e.selectedIndex].value;
	}
	else if(filterName == 'date') {
		var e = document.getElementById("date");
		strUser = e.options[e.selectedIndex].value;
	}
	else if(filterName == 'lastUpdate') {
		var e = document.getElementById("lastUpdate");
		strUser = e.options[e.selectedIndex].value;
	}	
	if(filterName !== 'undefined' && filterName != null) {
		if(filterName != 'buyer'){
			filterURL = "filters/"+filterName+"%2C"+strUser;
		} else {
			filterURL = "filters/"+filterURL;
		}
	}
	console.log("filter2:"+filterURL);
	
	downloadAll(filterURL);
}

function downloadAll(filter) {
	myFunction("clickMe2", false);
	myFunction("linkDownload2", false);
	var url = window.location.protocol + '//' + window.location.host +'/apiCCE2.0/rest/download/'+filter+'';
	console.log("url:"+url);
	const request = new XMLHttpRequest();
	request.open('GET', url);
	request.send(); 
	var json;
	request.onload = function() {
		if(request.status != 200) {
			console.log("Sin resultados"); 
			myFunction("linkDownload2", false); 
		}
		if (request.status == 200) {
			console.log("Success");
			myFunction("linkDownload2", false);
			var csv = request.response;
			var downloadlink = "<a download=\"resultados.csv\" href=\""+url+"\" class=\"download\" onclick=\"descargar(+\'"+csv+",\')\"> Descargar resultados en formato CSV</a>";				
 		    document.getElementById("download2").innerHTML = downloadlink; 
 		    myFunction("linkDownload2", true); 
		}
	}
}

		function filter() {
			console.log("filter");
			myFunction("linkDownload", false);
			var form = document.getElementById("filters");
			var filtersName = document.getElementsByName('filter');
			var filterName;
			for(var i = 0; i < filtersName.length; i++){
			    if(filtersName[i].checked){
			    	filterName = filtersName[i].value;
			    }
			}
			var strUser = "";
			var filterURL = "";
			console.log("filterName: "+filterName);
			if(filterName == 'tender.status') {
				var e = document.getElementById("tender.status");
				strUser = e.options[e.selectedIndex].value;
			}
			else if(filterName == 'tender.procurementMethod') {
				var e = document.getElementById("tender.procurementMethod");
				strUser = e.options[e.selectedIndex].value;
			}
			else if(filterName == 'buyer') {
				var entidad = document.getElementById("buyer").value;
				if(entidad != "ALL") {
					strUser = entidad;
					filterName = "parties.0.identifier.id"
				} else {
					filterName = null;
				}
//				var id = document.getElementById("parties.identifier.id").value;
				
//				if(id !== 'undefined' && id !== null && id !== '') {
//					idURL += "parties.0.identifier.id%2C" + id;
//				}
//				if(idURL != "parties.0.identifier.id%2C") {
//					filterURL += idURL;
//				}
//				var legalName = document.getElementById("parties.identifier.legalName").value;
				
//				console.log("legalName: " + legalName);
//				console.log("id" + id);
//				console.log("idURL: " + idURL);
//				if(legalName !== 'undefined' && legalName !== null && legalName !== '' ) {
//					var legalNameURL = "";
//					legalNameURL += "parties.0.identifier.legalName%2C" + legalName;
//					if(legalNameURL != "parties.0.identifier.legalName%2C") {
//						if(id != '') {
//							filterURL +="%2C";
//						}
//						filterURL += legalNameURL;
//					}
//				}
//				console.log("id:"+id);
//				console.log("legalName:"+legalName);
			}
			else if(filterName == 'tag') {
				var e = document.getElementById("tag");
				strUser = e.options[e.selectedIndex].value;
			}
			else if(filterName == 'planning.rationale') {
				strUser = document.getElementById("planning.rationale").value;
			}
			else if(filterName == 'tender.submissionMethod') {
				var e = document.getElementById("tender.submissionMethod");
				strUser = e.options[e.selectedIndex].value;
			}
			else if(filterName == 'date') {
				var e = document.getElementById("date");
				strUser = document.getElementById("date").value;
			}
			else if(filterName == 'lastUpdate') {
				var e = document.getElementById("lastUpdate");
				strUser = document.getElementById("lastUpdate").value;
			}	
			if(filterName !== 'undefined' && filterName != null) {
				if(filterName != 'buyer'){
					filterURL = "filters/"+filterName+"%2C"+strUser;
				} else {
					filterURL = "filters/"+filterURL;
				}
			}
			console.log("filter:"+filterURL);
			loadAll(1,filterURL);
		}

		function myFunction(id, mostrar) {
			var x = document.getElementById(id);
			console.log("myFunction "+ id + " - " + (mostrar ? "mostrar": "no mostrar"));
			if (mostrar) {
				x.style.display = "block";
			} else {
				x.style.display = "none";
			}
		}
		
		window.onload = function () {
			var page = 1;
			var filter = "";
			loadAll(page, filter);
 		};
 		
 		function loadAll(page, filter, id) {
			myFunction("cargando", true); 
			myFunction("no_resultados", false); 
			myFunction("navdiv", false); 
			myFunction("mydiv", false); 
			myFunction("linkDownload", false);
			
			const request = new XMLHttpRequest();
			if(filter==="undefined"){
				filter="";
			}
			var url = window.location.protocol + '//' + window.location.host +'/apiCCE2.0/rest/releases/'+filter+'?page='+page;
			if(id !== 'undefined' && id != null) {
				url = url + "&id="+id;
			}
			console.log("url:"+url);
			request.open('GET', url);
			request.send(); 
			var json;
			
			request.onload = function() {
				if(request.status != 200) {
					console.log("Sin resultados"); 
					myFunction("navdiv", false); 
					myFunction("mydiv", false); 
					myFunction("cargando", false); 
					myFunction("no_resultados", true); 
					myFunction("linkDownload", false); 
//					myFunction("clickMe2", false);
				}
			  if (request.status == 200) {
//				myFunction("clickMe2", true);
				myFunction("navdiv", false); 
				myFunction("mydiv", false); 
				myFunction("cargando", true); 
				myFunction("no_resultados", false); 
				myFunction("linkDownload", false); 
				console.log("Success"); // So extract data from json and create table
				console.log("page:"+page);
				console.log("filter:"+filter);
				
				//Extracting data
				var releases;
				var links;
				try {
					json = JSON.parse(request.response);
					releases = json.releases; //.id;
					links = json.links;
				} catch(err) {
				    
				}
				
				//Creating table
				var table=""; 
				table = createTable(releases);
//				table = CreateDetailView(releases);
				$('#mydiv').html(table);
				var divSelector = '#mydiv';
//				releases.forEach(function(d) {
//					console.log(d);
//					tableCreator( d,divSelector );	
//				});
//				tableCreator( releases,divSelector );	
				
				var nav="";
				if(links !== 'undefined' && links != null) {
					nav="<table>";
					nav+="<tr>";
					if(links.prev !== 'undefined' && links.prev != null) {
						if((page-1) != 1) {
							var urlPrimero = 'loadAll('+(1)+',\''+filter+'\');';
							console.log("urlPrimero:"+urlPrimero);
							nav+="<td><a onclick=\""+urlPrimero+"\" href=\"javascript:void(0);\">&lt;&lt; primero</a></td>";
						}
						var urlAnterior = 'loadAll('+(page-1)+',\''+filter+'\');';
						console.log("urlAnterior:"+urlAnterior);
						nav+="<td><a onclick=\""+urlAnterior+"\" href=\"javascript:void(0);\">&lt; anterior</a></td>";
						var prevhtml = "";
						for(var i = 1; i <= 5 && (page-i) >= 1; i++) {
							var urlPageA = 'loadAll('+(page-i)+',\''+filter+'\');';
							console.log("urlPageA:"+urlPageA);
							prevhtml="<td><a onclick=\""+urlPageA+"\" href=\"javascript:void(0);\">"+(page-i)+"</a></td>"+prevhtml;
						}
						nav += prevhtml
					}
					nav+="<td>" + page + "</td>";
					if(typeof links.next !== 'undefined' && links.next != null /*&& page+1 <= links.all.length*/) {
						console.log(links.next);
						var index  = links.next.indexOf('&');
						var nextPage = links.next.substr(index);
						var nextPageNumber = page + 1;
						var _id = null;
						index = nextPage.indexOf('=');
						_id = nextPage.substr(index+1);
						var urlNext = 'loadAll('+nextPageNumber+',\''+filter+'\',\''+_id+'\');';
						console.log("urlNext:"+urlNext);
						nav+="<td><a onclick=\""+urlNext+"\" href=\"javascript:void(0);\">siguiente &gt;</a></td>";
					}
					nav+="</tr>";
					nav+="</table>";

					//Showing the table inside table
					document.getElementById("navdiv").innerHTML = nav; 
				}
				console.log("onclick=\"doCSV("+page+",'"+filter+"','"+ id+"')");
				var downloadlink = "<a download class=\"download\" onclick=\"downloadCSV('"+page+","+filter+","+ id+"');\"> <input type=\"button\" value=\"Descargar página en formato CSV\" /></a>";				
				console.log(downloadlink);
				document.getElementById("download").innerHTML = downloadlink; 

				//				doCSV(json);
				myFunction("navdiv", true); 
				myFunction("mydiv", true); 
				myFunction("cargando", false); 
				myFunction("no_resultados", false); 
				myFunction("linkDownload", true); 
				
			  } 
			};

	 	}
		
 		function downloadCSV(texto) {
 			console.log("downloadCSV(texto)");
 			var data = texto.split(","); 
 			var page = data[0];
 			var filter = data[1];
 			var id = data[2];
 			doCSV1(page, filter, id);
 		}
 		function doCSV1(page, filter, id) {
 			console.log("function doCSV(page, filter, id)");
			const request = new XMLHttpRequest();
			if(filter==="undefined"){
				filter="";
			}
			var url = window.location.protocol + '//' + window.location.host +'/apiCCE2.0/rest/releases/'+filter+'?page='+page;
			if(id !== 'undefined' && id != null) {
				url = url + "&id="+id;
			}
			console.log("url:"+url);
			request.open('GET', url);
			request.send(); 
			var json;
			
			request.onload = function() {
				if(request.status != 200) {
					console.log("Sin resultados"); 
				}
			  if (request.status == 200) {
				//Extracting data
					var releases;
					var links;
					try {
						json = JSON.parse(request.response);
						releases = json.releases; //.id;
					} catch(err) {
					    
					}
					doCSV(json);
			  }
			};
 		}
 		// Adaptado de http://konklone.io/json/
 		// Genera el csv del json buscado
 		function doCSV(json) {
 			console.log("function doCSV(json)" + json);
 		    // 1) find the primary array to iterate over
 		    // 2) for each item in that array, recursively flatten it into a tabular object
 		    // 3) turn that tabular object into a CSV row using jquery-csv
 		    var inArray = arrayFrom(json);

 		    var outArray = [];
 		    for (var row in inArray)
 		        outArray[outArray.length] = parse_object(inArray[row]);
 		    //.replace(/[^\u000A\u0020-\u007E]\n/g, ' ')
 		    for(var i in outArray){
//	    		console.log(typeof i);
//	    		i = i.replace(/[^\u000A\u0020-\u007E]\n/g, ' ');
 		    	for (var aindex in i) {
// 		    		console.log(typeof aindex);
 		    		aindex = aindex.replace(/[^\u000A\u0020-\u007E]\n/g, ' ');
 		    	}
 		    }
 		    var csv = $.csv.fromObjects(outArray);
 		    csv = csv.replace('\u00A4', ' ');//.replace(/[^\u000A\u0020-\u007E]\n/g, ' ');
 		    console.log(csv);

 		    var contentType = 'text/csv';
 		    var a = document.getElementById('download');
 		    var blob = new Blob([csv], {
 		        'type': contentType
 		    });
 		    console.log(blob);
 		    a.href = window.URL.createObjectURL(blob);
 		    console.log(a.href);
 		    a.download = "test.csv";
 		    var filename = "test.csv";
 		   if(window.navigator.msSaveOrOpenBlob) {
 		        window.navigator.msSaveBlob(blob, filename);
 		    }
 		    else{
 		        var elem = window.document.createElement('a');
 		        elem.href = window.URL.createObjectURL(blob);
 		        elem.download = filename;        
 		        document.body.appendChild(elem);
 		        elem.click();        
 		        document.body.removeChild(elem);
 		    }
 		    
// 		    var uri = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
// 		    var downloadlink ="<input id=\"clickMeDownload\" type=\"button\" value=\"Descargar\" onclick=\"descargar(\""+csv+"\");\" class=\"btn btn-success btnWidth\" />"

//			var downloadlink = "<a download=\"result.csv\" href=\""+uri+"\" class=\"download\" onclick=\"descargar(+\'"+csv+",\')\"> <input type=\"button\" value=\"Descargar página en formato CSV\" /></a>";				
// 		    document.getElementById("download").innerHTML = downloadlink; 

			
			// 		    document.getElementById("clickMeDownload").onclick = descargar();
 
 		  }
 		
 		function doCSV2(json) {
 		    var inArray = arrayFrom(json);

 		    var outArray = [];
 		    for (var row in inArray)
 		        outArray[outArray.length] = parse_object(inArray[row]);
 		    var csv = $.csv.fromObjects(outArray);
 		    var uri = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);

			var downloadlink = "<a download=\"result.csv\" href=\""+uri+"\" class=\"download\" onclick=\"descargar(+\'"+csv+",\')\"> Descargar resultados en formato CSV</a>";				
 		    document.getElementById("download2").innerHTML = downloadlink; 
 
 		  }
 		  
 		function descargar(data) {
 		      if (data) {
		        return true;
 		      } else
 		        return false;
 		    }

 		
 	// takes an array of flat JSON objects, converts them to arrays
 		  // renders them into a small table as an example
 		  function renderCSV(objects) {
 		    var rows = $.csv.fromObjects(objects, {justArrays: true});
 		    if (rows.length < 1) return;

 		    // find CSV table
 		    var table = $(".csv table")[0];
 		    $(table).text("");

 		    // render header row
 		    var thead = document.createElement("thead");
 		    var tr = document.createElement("tr");
 		    var header = rows[0];
 		    for (field in header) {
 		      var th = document.createElement("th");
 		      $(th).text(header[field])
 		      tr.appendChild(th);
 		    }
 		    thead.appendChild(tr);

 		    // render body of table
 		    var tbody = document.createElement("tbody");
 		    for (var i=1; i<rows.length; i++) {
 		      tr = document.createElement("tr");
 		      for (field in rows[i]) {
 		        var td = document.createElement("td");
 		        $(td)
 		          .text(rows[i][field])
 		          .attr("title", rows[i][field]);
 		        tr.appendChild(td);
 		      }
 		      tbody.appendChild(tr);
 		    }

 		    table.appendChild(thead);
 		    table.appendChild(tbody);
 		  }
 		  
 		  
 		  
 		// This function creates a standard table with column/rows
 		// Parameter Information
 		// objArray = Anytype of object array, like JSON results
 		// theme (optional) = A css class to add to the table (e.g. <table class="<theme>">
 		// enableHeader (optional) = Controls if you want to hide/show, default is show
 		function CreateTableView(objArray, theme, enableHeader) {
 		    // set optional theme parameter
 		    if (theme === undefined) {
 		        theme = 'lightPro'; //default theme
 		    }
 		 
 		    if (enableHeader === undefined) {
 		        enableHeader = true; //default enable headers
 		    }
 		 
 		    // If the returned data is an object do nothing, else try to parse
 		    var array = typeof objArray != 'object' ? JSON.parse(objArray) : new Array(objArray);
 		    var keys = Object.keys(array[0]);
 		 
 		    var str = '<table class="' + theme + '">';
 		 
 		    // table head
 		    if (enableHeader) {
 		        str += '<thead><tr>';
 		        for (var index in keys) {
 		            str += '<th scope="col">' + keys[index] + '</th>';
 		        }
 		        str += '</tr></thead>';
 		    }
 		 
 		    // table body
 		    str += '<tbody>';
 		    for (var i = 0; i < array.length; i++) {
 		        str += (i % 2 == 0) ? '<tr class="alt">' : '<tr>';
 		        for (var index in keys) {
 		            var objValue = array[i][keys[index]];
 		 
 		            // Support for Nested Tables
 		            if (typeof objValue === 'object' && objValue !== null) {
 		                if (Array.isArray(objValue)) {
 		                    str += '<td>';
 		                    for (var aindex in objValue) {
 		                        str += CreateTableView(objValue[aindex], theme, true);
 		                    }
 		                    str += '</td>';
 		                } else {
 		                    str += '<td>' + CreateTableView(objValue, theme, true) + '</td>';
 		                }
 		            } else {
 		                str += '<td>' + objValue + '</td>';
 		            }
 		 
 		        }
 		        str += '</tr>';
 		    }
 		    str += '</tbody>'
 		    str += '</table>';
 		 
 		    return str;
 		}
 		 
 		// This function creates a details view table with column 1 as the header and column 2 as the details
 		// Parameter Information
 		// objArray = Anytype of object array, like JSON results
 		// theme (optional) = A css class to add to the table (e.g. <table class="<theme>">
 		// enableHeader (optional) = Controls if you want to hide/show, default is show
 		function CreateDetailView(objArray, theme, enableHeader) {
 		    // set optional theme parameter
 		    if (theme === undefined) {
 		        theme = 'lightPro';  //default theme
 		    }
 		 
 		    if (enableHeader === undefined) {
 		        enableHeader = true; //default enable headers
 		    }
 		 
 		    // If the returned data is an object do nothing, else try to parse
 		    var array = typeof objArray == 'string'? objArray : typeof objArray != 'object' ? JSON.parse(objArray) : new Array(objArray);
 		    if(typeof objArray == 'string') {
 		    	console.log("objArray: " + objArray);
 		    	console.log("Object.keys(array[0]): " + Object.keys(array[0]));
 		    	//array = objArray;
 		    }
 		    var keys = Object.keys(array[0]);
 		    var str = '<table class="' + theme + '">';
 		    str += '<tbody>';
 		 
 		    
 		    for (var i = 0; i < array.length; i++) {
 		        var row = 0;
 		        for (var index in keys) {
 		            var objValue = array[i][keys[index]]
 		 
 		            str += (row % 2 == 0) ? '<tr class="alt">' : '<tr>';
 		 
 		            if (enableHeader) {
 		            	if(typeof objArray == 'string'){
 		            		//No se coloca título cuando el valor es un string
 		            	} else {
 	 		                str += '<th scope="row">' + keys[index] + '</th>';
 		            	}
 		            }
 		 
 		            // Support for Nested Tables
 		           if(typeof objArray == 'string') {
 		        	   if(i == 0) {
 		        		  str += '<td>' + objArray + '</td>';
 		        	   }
 		           }
 		           else if (typeof objValue === 'object' && objValue !== null) {
 		           
 		                if (Array.isArray(objValue)) {
 		                    str += '<td>';
 		                    for (var aindex in objValue) {
 		                        str += CreateDetailView(objValue[aindex], theme, true);
 		                    }
 		                    str += '</td>';
 		                } else {
 		                    str += '<td>' + CreateDetailView(objValue, theme, true) + '</td>';
 		                }
 		            } else {
 		                str += '<td>' + objValue + '</td>';
 		            }
 		 
 		            str += '</tr>';
 		            row++;
 		        }
 		    }
 		    str += '</tbody>'
 		    str += '</table>';
 		    return str;
 		}

 		
 		function recurse(sel) {
 			console.log("function recurse(sel)" + sel);
 			  // sel is a d3.selection of one or more empty tables
 			  sel.each(function(d) {
 				 console.log("sel.each(function(d) {" + d);
 			    // d is an array of objects
 			    var colnames,
 			        tds,
 			        table = d3.select(this);

 			    // obtain column names by gathering unique key names in all 1st level objects
 			    // following method emulates a set by using the keys of a d3.map()
 			    colnames = d                                                          // array of objects
 			        .reduce(function(p,c) { return p.concat(d3.keys(c)); }, [])       // array with all keynames
 			        .reduce(function(p,c) { return (p.set(c,0), p); }, d3.map())      // map with unique keynames as keys
 			        .keys();                                                          // array with unique keynames (arb. order)

 			    // colnames array is in arbitrary order
 			    // sort colnames here if required

 			    // create header row using standard 1D data join and enter()
 			    table.append("thead").append("tr").selectAll("th")
 			        .data(colnames)
 			      .enter().append("th")
 			        .text(function(d) { return d; });

 			    // create the table cells by using nested 2D data join and enter()
 			    // see also http://bost.ocks.org/mike/nest/
 			    tds = table.append("tbody").selectAll("tr")
 			        .data(d)                            // each row gets one object
 			      .enter().append("tr").selectAll("td")
 			        .data(function(d) {                 // each cell gets one value
 			          return colnames.map(function(k) { // for each colname (i.e. key) find the corresponding value
 			            return d[k] || "";              // use empty string if key doesn't exist for that object
 			          });
 			        })
 			      .enter().append("td");

 			    // cell contents depends on the data bound to the cell
 			    // fill with text if data is not an Array
 			    tds.filter(function(d) { return !(d instanceof Array); })
 			        .text(function(d) { return d; });
 			    // fill with a new table if data is an Array
 			    tds.filter(function(d) { return (d instanceof Array); })
 			        .append("table")
 			        .call(recurse);
 			  });
 			}
 		
function tableCreator(e, t) {
	console.log(t);
    function i(e, t) {
        var n = "";
        var r = "";
        var s = "";
        $.each(t[0], function(e, t) {
            s += "<th>" + e + "</th>"
        });
        $.each(t, function(e, t) {
            r += "<tr>";
            $.each(t, function(e, t) {
                var n = 1 + Math.floor(Math.random() * 90 + 10);
                var s = $.isPlainObject(t);
                var o = [];
            	
//                console.log("s " + s);
//            	console.log("e " + e);
                
            	if (s) {
            		if(typeof t != 'string') {
            			o = $.makeArray(t)
            		}
                }
                
//            	console.log("n " + n);
//            	console.log("s " + s);
//            	console.log("o " + o.length);
//            	console.log("t " + t.length);
//            	console.log("t " + $.isArray(t));
//            	console.log("t " + typeof t);

            	if (e != "roles" && $.isArray(t) && t.length > 1) {
                	console.log(t[0]);
                	console.log(t[1]);
                    r += "<td><div><a href='#" + n + "' data-toggle='collapse' data-parent='#msgReport'><span class='glyphicon glyphicon-plus'></span></a><div id='" + n + "' class='panel-collapse collapse'>" + i(e, t) + "</div></div></td>"
                } else {
                    if (o.length > 0) {
                        r += "<td><div><a href='#" + n + "' data-toggle='collapse' data-parent='#msgReport'><span class='glyphicon glyphicon-plus'></span></a><div id='" + n + "' class='panel-collapse collapse'>" + i(e, o) + "</div></div></td>"
                    } else {
                        r += "<td>" + t + "</td>"
                    }
                }
            });
            r += "</tr>"
        });
        n += "<table class='table table-bordered table-hover table-condensed'><thead>" + s + "</thead><tbody>" + r + "</tbody></table>";
        return n
    }
    $(t).empty();
    $(t).append("<table id='parentTable' class='table table-bordered table-hover table-condensed'><thead></thead><tbody></tbody></table>");
    var n = "";
    var r = "";
    console.log("e: " + e + " - t: " +t );
    var ta = "";
    $.each(e, function(e, t) {
        n += "<th>" + e + "</th>";
        var s = 1 + Math.floor(Math.random() * 90 + 10);
        var o = $.isPlainObject(t);
        var u = [];
        if (o) {
        	if(typeof t != 'string') {
                u = $.makeArray(t)
        	}
        }
//        console.log("t: " + t);
//    	console.log("e " + e);
//    	console.log("s " + s);
//    	console.log("t " + t.length);
//    	console.log("t " + $.isArray(t));
//    	console.log("t " + $.type(t));

        if ( (e!= 'tag') && $.isArray(t) && t.length > 0) {
            r += "<td><div id='accordion'><a href='#" + s + "' data-toggle='collapse' data-parent='#msgReport'><span class='glyphicon glyphicon-plus'></span></a><div id='" + s + "' class='panel-collapse collapse'>" + i(e, t) + "</div></div></td>"
        } else {
            if (u.length > 0) {
                r += "<td><div id='accordion'><a href='#" + s + "' data-toggle='collapse' data-parent='#msgReport'><span class='glyphicon glyphicon-plus'></span></a><div id='" + s + "' class='panel-collapse collapse'>" + i(e, u) + "</div></div></td>"
            } else {
                r += "<tr><td>" + t + "</td></tr>"
            }
        }
//        ta += "<tr><td>" + e + "</td><td>"+ r + "</td></tr>";
    });
    $("#parentTable thead").append("<tr>" + n + "</tr>");
    $("#parentTable tbody").append("<tr>" + r + "</tr>");
//    $("#parentTable tbody").append(ta);
    $(".glyphicon ").on("click", function() {
        var e = $(this).attr("class");
        switch (e) {
            case "glyphicon glyphicon-plus":
                $(this).removeClass("glyphicon-plus").addClass("glyphicon-minus");
                break;
            case "glyphicon glyphicon-minus":
                $(this).removeClass("glyphicon-minus").addClass("glyphicon-plus");
                break;
            default:
        }
    })
}


function cargarProceso(ocid) {
	console.log("cargarProceso");
	var host = window.location.protocol + '//' + window.location.host; //"http://localhost:8080";

	var url = host + "/apiCCE2.0/rest/release/ocid/"+ocid;
	
	const request = new XMLHttpRequest();
	console.log("url:"+url);
	request.open('GET', url);
	request.send(); 
	var json;
	
	request.onload = function() {
		if(request.status != 200) {
			console.log("Sin resultados"); 
			myFunction("mydiv", false); 
			myFunction("cargando", false); 
			myFunction("no_resultados", true); 
		}
		else if (request.status == 200) {
			
			//Extracting data
			var releases;
			var links;
			try {
				json = JSON.parse(request.response);
				releases = json.releases; //.id;
				links = json.links;
			} catch(err) {
			    
			}
			
			//Creating table
			var table=""; 
			table = CreateDetailView(releases);
			$('#mydiv').html(table);
//			var divSelector = '#mydiv';
//			releases.forEach(function(d) {
//				console.log(d);
//				tableCreator( d,divSelector );	
//			});
//		tableCreator( releases,divSelector );	
			
			myFunction("mydiv", true); 
			myFunction("gloader-box", false); 
			myFunction("no_resultados", false); 

	  }
	};
} 

function createTable(releases){
	var i = 1;
	
	var table = "<table>";
	table +"<thead>";
	table += "<tr>";
	table += "<th>";
	table += "No.";
	table += "</th>";
	table += "<th>";
	table += "fecha";
	table += "</th>";
	table += "<th>";
	table += "Número de identificación del comprador";
	table += "</th>";
	table += "<th>";
	table += "Nombre del comprador";
	table += "</th>";
	table += "<th>";
	table += "Id del proceso";
	table += "</th>";
	table += "<th>";
	table += "Título del proceso";
	table += "</th>";
	table += "<th>";
	table += "Descripción del proceso";
	table += "</th>";
	table += "<th>";
	table += "Acción";
	table += "</th>";
	table += "</tr>";
	table += "</thead>";
	table += "<tbody>";
	releases.forEach(function(d) {
		table += "<tr>";
		table += "<td>";
		table += i;
		table += "</td>";
		table += "<td>";
		table += d.date.substring(0,10);
		table += "</td>";
		table += "<td>";
		table +=d.buyer.id;
		table += "</td>";
		table += "<td>";
		table += d.buyer.name;
		table += "</td>";
		table += "<td>";
		table += d.tender.id;
		table += "</td>";
		table += "<td>";
		table += d.tender.title;
		table += "</td>";
		table += "<td>";
		table += d.tender.description;
		table += "</td>";
		table += "<td>";
		table += "<a href=\"./viewAll.html?ocid="+d.ocid+"\"><input type=\"button\" value=\"Ver detalle\" /></a>";
		table += "</td>";
		table += "</tr>";
		i++;
	});
	table += "</tbody>";
	table += "</table>";
	return table;	
}