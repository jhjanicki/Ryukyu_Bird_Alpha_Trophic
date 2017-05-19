d3.custom = {};
 
d3.custom.scatterplot = function module() {
	var margin = {top: 30, right: 30, bottom: 100, left: 40},
    	width = 400,
    	height = 350,
    	xValue ='IslandArea',
    	yValue='Taxonomic',
    	xLabel='Area',
    	yLabel = 'Taxonomic Diversity',
    	_index = 0,
    	xlog='log';
    

    
    
    	var svg;
    
    	function exports(_selection) {
			_selection.each(function(_data) {
		
			var x;
			var xAxis;
		
				if(xlog=='log'){
				
					 x = d3.scale.log()
					.range([0, width]);
					
					xAxis = d3.svg.axis()
					.scale(x)
					.orient("bottom")
					.ticks(5, ",.1s")
    				.tickSize(6, 0);
    				
				}else{
					 x = d3.scale.linear()
					.range([0, width]);
					
					xAxis = d3.svg.axis()
					.scale(x)
					.orient("bottom")
					.ticks(5, ",1s")
    				.tickSize(6, 0);
				}

				var y = d3.scale.linear()
					.range([height, 0]);


					// .tickFormat(function (d) {
// 						return x.tickFormat(4,d3.format(",d"))(d)
// 					});
					
					

				var yAxis = d3.svg.axis()
					.scale(y)
					.orient("left");

			

		
				if (!svg) {
					 svg = d3.select(this).append('svg');
					 var container = svg.append('g').classed('container-group'+_index, true);

				}
			
				svg.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom);
			
				container
						.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
					
				  x.domain(d3.extent(_data, function(d) { return d[xValue]; })).nice();
				  
				  console.log(x.domain());
				  y.domain(d3.extent(_data, function(d) { return d[yValue]; })).nice();
				  
				

				   //x-axis labels
				  container.append("g")
					  .attr("class", "x axis")
					  .attr("transform", "translate(0," + height + ")")
					  .call(xAxis)
					  .selectAll("text")	
							.style("text-anchor", "end")
							.attr("dx", "-.8em")
							.attr("dy", ".15em")
							.attr("transform", function(d) {
								return "rotate(-65)" 
							});
   
				   //x-axis title label
					container.append("g")
					  .attr("class", "x axis")
					  .attr("transform", "translate(-5," + height + ")")
					  .append("text")
					  .attr("class", "label")
					  .attr("x", width)
					  .attr("y", -6)
					  .style("text-anchor", "end")
					  .text(xLabel);

				 //y-axis title label
				  container.append("g")
					  .attr("class", "y axis")
					  .call(yAxis)
					  .append("text")
					  .attr("class", "label")
					  .attr("transform", "rotate(-90)")
					  .attr("y", 6)
					  .attr("dy", ".71em")
					  .style("text-anchor", "end")
					  .text(yLabel);
				  
					
					// draw 5 trophic groups, 5 groups of dots
					 
					var frugivore = _data.filter(function(d){
						return d.Trophic == 'Frugivore';
					});
					
					console.log(frugivore);
					  
					container.selectAll(".dot"+_index)
					  .data(frugivore)
					  .enter().append("circle")
					  .attr("class", "dot")
					  .attr("r", 3.5)
					  .attr("cx", function(d) { 
								return x(d[xValue])
						 })
					  .attr("cy", function(d) { 
								return y(d[yValue])
						})
					  .style("fill", '#FC1207')
					  .style("opacity",0.9);
	  
	  
	  				var insectivore = _data.filter(function(d){
						return d.Trophic == 'Insectivore';
					});
					
					console.log(insectivore);
					
					
				  container.selectAll(".dot2"+_index)
					  .data(insectivore)
					  .enter().append("circle")
					  .attr("class", "dot")
					  .attr("r", 3.5)
					  .attr("cx", function(d) { 
					  		return x(d[xValue])
						 })
					  .attr("cy", function(d) {
					  		return y(d[yValue])
					  })
					  .style("fill", '#FD8451')
					  .style("opacity",0.9);
	  
	  				
	  				var omnivore = _data.filter(function(d){
						return d.Trophic == 'Omnivore';
					});
	  				
					container.selectAll(".dot3"+_index)
					  .data(omnivore)
					  .enter().append("circle")
					  .attr("class", "dot")
					  .attr("r", 3.5)
					  .attr("cx", function(d) { 
					  		return x(d[xValue])
						 })
					  .attr("cy", function(d) {
					  		return y(d[yValue])
					  })
					  .style("fill", '#ADCFD9')
					  .style("opacity",0.9);
					  
					var granivore = _data.filter(function(d){
						return d.Trophic == 'Granivore';
					});  
					  
					container.selectAll(".dot4"+_index)
					  .data(granivore)
					  .enter().append("circle")
					  .attr("class", "dot")
					  .attr("r", 3.5)
					  .attr("cx", function(d) { 
					  		return x(d[xValue])
						 })
					  .attr("cy", function(d) {
					  		return y(d[yValue])
					  })
					  .style("fill", '#396A8E')
					  .style("opacity",0.9);
					  
					  
					 var carnivore = _data.filter(function(d){
						return d.Trophic == 'Carnivore';
					 }); 
					 
					  container.selectAll(".dot5"+_index)
					  .data(carnivore)
					  .enter().append("circle")
					  .attr("class", "dot")
					  .attr("r", 3.5)
					  .attr("cx", function(d) { 
					  		return x(d[xValue])
						 })
					  .attr("cy", function(d) {
					  		return y(d[yValue])
					  })
					  .style("fill", '#38385B')
					  .style("opacity",0.9);
					  
					  
					  
					  
					// could be tax, phy or func, depending on what you pass in for the x value  
// 					var DiversityArray_F = _data.map(function(d){
// 							if (d.Trophic=='Frugivore'){
// 								return d[yValue]}
// 							});
// 						
// 					var DiversityArray_I = _data.map(function(d){
// 							if (d.Trophic=='Insectivore'){
// 								return d[yValue]}
// 							});
// 					var DiversityArray_O = _data.map(function(d){
// 							if (d.Trophic=='Omnivore'){
// 								return d[yValue]}
// 							});
// 					var DiversityArray_G = _data.map(function(d){
// 							if (d.Trophic=='Granivore'){
// 								return d[yValue]}
// 							});
// 					var DiversityArray_C = _data.map(function(d){
// 							if (d.Trophic=='Carnivore'){
// 								return d[yValue]}
// 							});
// 					
// 
// 					//get the x and y values for least squares
// 					var ySeries = _data.map(function(d) { return d[yValue] });
// 					var xSeries_F = DiversityArray_F;
// 					var xSeries_I = DiversityArray_I;
// 					var xSeries_O = DiversityArray_O;
// 					var xSeries_G = DiversityArray_G;
// 					var xSeries_C = DiversityArray_C;
// 					
// 		
// 					var dataArray_F=[];
// 					var dataArray_I=[];
// 					var dataArray_O=[];
// 					var dataArray_G=[];
// 					var dataArray_C=[];
// 		
// 					for (var i=0;i<xSeries_F.length;i++){
// 						var indvArray_F = [];
// 						indvArray_F.push(xSeries_F[i],ySeries[i]);
// 						dataArray_F.push(indvArray_F);
// 						
// 						var indvArray_I = [];
// 						indvArray_I.push(xSeries_I[i],ySeries[i]);
// 						dataArray_I.push(indvArray_I);
// 						
// 						var indvArray_O = [];
// 						indvArray_O.push(xSeries_O[i],ySeries[i]);
// 						dataArray_O.push(indvArray_O);
// 						
// 						var indvArray_G = [];
// 						indvArray_G.push(xSeries_G[i],ySeries[i]);
// 						dataArray_G.push(indvArray_G);
// 						
// 						var indvArray_C = [];
// 						indvArray_C.push(xSeries_C[i],ySeries[i]);
// 						dataArray_C.push(indvArray_C);
// 						
// 					}
// 		
// 		
// 					var result_F = regression('linear', dataArray_F);
// 					var slope_F = result_F.equation[0];
// 					var yIntercept_F = result_F.equation[1];
// 					
// 					console.log(dataArray_F);
// 					console.log(result_F);
// 					
// 					var result_I = regression('linear', dataArray_I);
// 					var slope_I = result_I.equation[0];
// 					var yIntercept_I = result_I.equation[1];
// 					
// 					var result_O = regression('linear', dataArray_O);
// 					var slope_O = result_O.equation[0];
// 					var yIntercept_O = result_O.equation[1];
// 					
// 					var result_G = regression('linear', dataArray_G);
// 					var slope_G = result_G.equation[0];
// 					var yIntercept_G = result_G.equation[1];
// 					
// 					var result_C = regression('linear', dataArray_C);
// 					var slope_C = result_C.equation[0];
// 					var yIntercept_C = result_C.equation[1];
// 		
// 					
// 		
// 					// apply the reults of the least squares regression
// 		
// 					var x1_F = d3.min(xSeries_F);
// 					var y1_F = slope_F*x1_F+ yIntercept_F;
// 					
// 					console.log(slope_F);
// 					console.log(x1_F);
// 					console.log(yIntercept_F);
// 					
// 					var x2_F = d3.max(xSeries_F);
// 					var y2_F= slope_F*x2_F + yIntercept_F;
// 					var trendData_F= [[x1_F,y1_F,x2_F,y2_F]];
// 					
// 					var x1_I = d3.min(xSeries_I);
// 					var y1_I = slope_I*x1_I+ yIntercept_I;
// 					var x2_I = d3.max(xSeries_I);
// 					var y2_I= slope_F*x2_I + yIntercept_I;
// 					var trendData_I= [[x1_I,y1_I,x2_I,y2_I]];
// 					
// 					var x1_O = d3.min(xSeries_O);
// 					var y1_O = slope_O*x1_O+ yIntercept_O;
// 					var x2_O = d3.max(xSeries_O);
// 					var y2_O= slope_O*x2_O + yIntercept_O;
// 					var trendData_O= [[x1_O,y1_O,x2_O,y2_O]];
// 					
// 					var x1_G = d3.min(xSeries_G);
// 					var y1_G = slope_G*x1_G+ yIntercept_G;
// 					var x2_G = d3.max(xSeries_G);
// 					var y2_G= slope_G*x2_G + yIntercept_G;
// 					var trendData_G= [[x1_G,y1_G,x2_G,y2_G]];
// 					
// 					var x1_C = d3.min(xSeries_C);
// 					var y1_C = slope_C*x1_C+ yIntercept_C;
// 					var x2_C = d3.max(xSeries_C);
// 					var y2_C= slope_C*x2_C + yIntercept_C;
// 					var trendData_C= [[x1_C,y1_C,x2_C,y2_C]];
// 		
// 
// 					console.log(trendData_F);
// 		
// 					var trendline_F = container.selectAll(".trendline"+_index)
// 						.data(trendData_F);
// 			
// 					var trendline_I=container.selectAll(".trendline2"+_index)
// 						.data(trendData_I);
// 			
// 					var trendline_O= container.selectAll(".trendline3"+_index)
// 						.data(trendData_O);
// 					
// 					var trendline_G= container.selectAll(".trendline4"+_index)
// 						.data(trendData_G);
// 					
// 					var trendline_C= container.selectAll(".trendline5"+_index)
// 						.data(trendData_C);
// 			
// 					trendline_F.enter()
// 						.append("line")
// 						.attr("class", "trendline")
// 						.attr("x1", function(d) { return x(d[0]); })
// 						.attr("y1", function(d) { return y(d[1]); })
// 						.attr("x2", function(d) { return x(d[2]); })
// 						.attr("y2", function(d) { return y(d[3]); })
// 						.attr("stroke", "#72A8FF")
// 						.attr("stroke-width", 1);
// 		
// 					trendline_I.enter()
// 						.append("line")
// 						.attr("class", "trendline")
// 						.attr("x1", function(d) { return x(d[0]); })
// 						.attr("y1", function(d) { return y(d[1]); })
// 						.attr("x2", function(d) { return x(d[2]); })
// 						.attr("y2", function(d) { return y(d[3]); })
// 						.attr("stroke", "#96BF52")
// 						.attr("stroke-width", 1);
// 			
// 					trendline_O.enter()
// 						.append("line")
// 						.attr("class", "trendline")
// 						.attr("x1", function(d) { return x(d[0]); })
// 						.attr("y1", function(d) { return y2(d[1]); })
// 						.attr("x2", function(d) { return x(d[2]); })
// 						.attr("y2", function(d) { return y2(d[3]); })
// 						.attr("stroke", "#D65734")
// 						.attr("stroke-width", 1);
// 					
// 					trendline_G.enter()
// 						.append("line")
// 						.attr("class", "trendline")
// 						.attr("x1", function(d) { return x(d[0]); })
// 						.attr("y1", function(d) { return y2(d[1]); })
// 						.attr("x2", function(d) { return x(d[2]); })
// 						.attr("y2", function(d) { return y2(d[3]); })
// 						.attr("stroke", "#D65734")
// 						.attr("stroke-width", 1);
// 						
// 					trendline_C.enter()
// 						.append("line")
// 						.attr("class", "trendline")
// 						.attr("x1", function(d) { return x(d[0]); })
// 						.attr("y1", function(d) { return y2(d[1]); })
// 						.attr("x2", function(d) { return x(d[2]); })
// 						.attr("y2", function(d) { return y2(d[3]); })
// 						.attr("stroke", "#D65734")
// 						.attr("stroke-width", 1);
					  
					  
					  
					  

			})
	
		}
		
		exports.xValue = function(value) {
			if (!arguments.length) return xValue;
			xValue = value;
			return this;
		}
		
	
		exports.yValue = function(value) {
			if (!arguments.length) return yValue;
			yValue = value;
			return this;
		}
		
		exports.y2Value = function(value) {
			if (!arguments.length) return y2Value;
			y2Value = value;
			return this;
		}
		
		exports.y3Value = function(value) {
			if (!arguments.length) return y3Value;
			y3Value = value;
			return this;
		}
		
		exports.xLabel = function(value) {
			if (!arguments.length) return xLabel;
			xLabel = value;
			return this;
		}
		
		exports.yLabel = function(value) {
			if (!arguments.length) return yLabel;
			yLabel = value;
			return this;
		}
		
		exports.y2Label = function(value) {
			if (!arguments.length) return y2Label;
			y2Label = value;
			return this;
		}
	
	
		exports._index = function(value) {
			if (!arguments.length) return _index;
			_index = value;
			return this;
		}
		
		exports.xlog = function(value) {
			if (!arguments.length) return xlog;
			xlog = value;
			return this;
		}
	
	
		return exports;

}








  




  

	


