		function filter() {
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
				var id = document.getElementById("parties.identifier.id").value;
				
				var idURL = "";
				if(id !== 'undefined' && id !== null && id !== '') {
					idURL += "parties.0.identifier.id%2C" + id;
				}
				if(idURL != "parties.0.identifier.id%2C") {
					filterURL += idURL;
				}
				var legalName = document.getElementById("parties.identifier.legalName").value;
				
				console.log("legalName: " + legalName);
				console.log("id" + id);
				console.log("idURL: " + idURL);
				if(legalName !== 'undefined' && legalName !== null && legalName !== '' ) {
					var legalNameURL = "";
					legalNameURL += "parties.0.identifier.legalName%2C" + legalName;
					if(legalNameURL != "parties.0.identifier.legalName%2C") {
						if(id != '') {
							filterURL +="%2C";
						}
						filterURL += legalNameURL;
					}
				}
				console.log("id:"+id);
				console.log("legalName:"+legalName);
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
 		
 		function loadAll(page, filter) {
			myFunction("cargando", true); 
			myFunction("no_resultados", false); 
			myFunction("navdiv", false); 
			myFunction("mydiv", false); 
			const request = new XMLHttpRequest();
			if(filter==="undefined"){
				filter="";
			}
			var url = window.location.protocol + '//' + window.location.host +'/apiCCE2.0/rest/releases/'+filter+'?page='+page;
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
				}
			  if (request.status == 200) {
				myFunction("navdiv", false); 
				myFunction("mydiv", false); 
				myFunction("cargando", true); 
				myFunction("no_resultados", false); 
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
				table+="<table>";
				table+="<tr>";
				table+="<td colspan=\"6\">";
				table+="<div style=\"height:400px; overflow-y:scroll;\">"; 
				table+="<table>";

				table+="<thead>";
				table+="<tr>";
				table+="<th><span style=\"font-size: 11px !important;\">OCID</span></th>";
				table+="<th><span style=\"font-size: 11px !important;\">Fecha de Entrega</span></th>";
				table+="<th><span style=\"font-size: 11px !important;\">Etiquetas</span></th>";
				table+="<th><span style=\"font-size: 11px !important;\">Descripciones</span></th>";
				table+="<th><span style=\"font-size: 11px !important;\">Compradores</span></th>";
				table+="<th><span style=\"font-size: 11px !important;\">Cuantía</span></th>";
				table+="</tr>";
				table+="</thead>"; 
				table+="<tbody>"; 
				
				for (var i = 0; releases !== 'undefined' && releases != null && i < releases.length; i++){
					var release = releases[i];
					var ocid = release.ocid;
					var date = release.date.substring(0, 10);;
					var tags = release.tag;
					var parties = release.parties;
					var amount = (typeof release.planning.budget !== "undefined" && typeof release.planning.budget.amount !== "undefined") ? release.planning.budget.amount.amount + " " + release.planning.budget.amount.currency : "-";
					table+="<tr>";
					table+="<td>"+"<span style=\"font-size: 11px !important;\">"+ocid+"</span>" +"</td>";
					table+="<td>"+"<span style=\"font-size: 11px !important;\">"+date+"</span>"+"</td>";
					table+="<td>"+"<span style=\"font-size: 11px !important;\">"+tags[0]+"</span>"+"</td>";
					table+="<td>"+"<span style=\"font-size: 11px !important;\">"+release.planning.rationale+"</span>"+"</td>";
					table+="<td>"+"<span style=\"font-size: 11px !important;\">";
					if(parties !== 'undefined' && parties != null) {
						for (var j = 0; j < parties.length; j++){
							table+="<b>"+parties[j].name+"</b><br>";
							table+="roles: ";
							for (var k = 0; k < parties[j].roles.length; k++){
								table+=parties[j].roles[k]+" "
							}
							table += "<br>";
						}
					}
					table+="</span></td>";
					table+="<td>"+"<span style=\"font-size: 11px !important;\">"+amount+"</span>"+"</td>";
					table+="</tr>";
				}
				
				table+="</tbody>"; 
				table+="</table>";
				table+="</div>"; 
				table+="</td>"; 
				table+="</tr>"; 
				table+="</table>";
			 
				//Showing the table inside table
				document.getElementById("mydiv").innerHTML = table; 
				
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
					if(links.next !== 'undefined' && links.next != null && page+1 <= links.all.length) {
						for(var i = 1; i <= 5 && (page+i) <= links.all.length; i++) {
							var urlPageN = 'loadAll('+(page+i)+',\''+filter+'\');';
							console.log("urlPageN:"+urlPageN);
							nav+="<td><a onclick=\""+urlPageN+"\" href=\"javascript:void(0);\">"+(page+i)+"</a></td>";
						}
						var urlNext = 'loadAll('+(page+1)+',\''+filter+'\');';
						console.log("urlNext:"+urlNext);
						nav+="<td><a onclick=\""+urlNext+"\" href=\"javascript:void(0);\">siguiente &gt;</a></td>";
						if(page+1 < links.all.length) {
							var urlLast = 'loadAll('+links.all.length+',\''+filter+'\');';
							console.log("urlLast:"+urlLast);
							nav+="<td><a onclick=\""+urlLast+"\" href=\"javascript:void(0);\">último &gt;&gt;</a></td>";
						}
					}
					nav+="</tr>";
					nav+="</table>";

					//Showing the table inside table
					document.getElementById("navdiv").innerHTML = nav; 
				}
				
				doCSV(json);
				myFunction("navdiv", true); 
				myFunction("mydiv", true); 
				myFunction("cargando", false); 
				myFunction("no_resultados", false); 
				
			  } 
			};

	 	}

 		function download(page,filter) {
			const request2 = new XMLHttpRequest();
			if(filter==="undefined"){
				filter="";
			}
			var url = window.location.protocol + '//' + window.location.host +'/apiCCE2.0/rest/releases/'+filter+'?page='+page;
			console.log("url:"+url);
			request2.open('GET', url);
			request2.send(); 
			 
			request2.onload = function() {
			  if (request2.status == 200) {
				console.log("page:"+page);
				console.log("filter:"+filter);
				
				//Extracting data
				var releases;
				var links;
				try {
					var json = JSON.stringify(request2.response);
					doCSV(json);
					//releases = json.releases; //.id;
				} catch(err) {
				    
				}
			  }
			}

		}
		
 		// Adaptado de http://konklone.io/json/
 		function doCSV(json) {
 		    // 1) find the primary array to iterate over
 		    // 2) for each item in that array, recursively flatten it into a tabular object
 		    // 3) turn that tabular object into a CSV row using jquery-csv
 		    var inArray = arrayFrom(json);

 		    var outArray = [];
 		    for (var row in inArray)
 		        outArray[outArray.length] = parse_object(inArray[row]);
 		    var csv = $.csv.fromObjects(outArray);
 		    var uri = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
// 		    var downloadlink ="<input id=\"clickMeDownload\" type=\"button\" value=\"Descargar\" onclick=\"descargar(\""+csv+"\");\" class=\"btn btn-success btnWidth\" />"

			var downloadlink = "<a download=\"result.csv\" href=\""+uri+"\" class=\"download\" onclick=\"descargar(+\'"+csv+",\')\"> Descargar en formato CSV</a>";				
 		    document.getElementById("download").innerHTML = downloadlink; 
// 		    document.getElementById("clickMeDownload").onclick = descargar();
 
 		  }
 		
 		  
 		function descargar(data) {
 		      if (data) {
		        return true;
 		      } else
 		        return false;
 		    }