var arrColorsG=["#5899DA", "#E8743B", "#19A979", 
                "#ED4A7B", "#945ECF", "#13A4B4",
                 "#525DF4", "#BF399E", "#6C8893", 
               "white"];

  
  // getting data  
 function buildMetadata(sample)
 {
    d3.json("samples.json").then((data)=>{
       // console.log(data);
        var metadata = data.metadata;
        var resultsarray = metadata.filter(sampleobject=>
                sampleobject.id=sample);
      //  console.log(resultsarray);        
        var result=resultsarray[0];
      //  console.log(result);
        var demographicInfo=d3.select("#sample-metadata");
        //using '.html("")' to clear any existing metadata
        demographicInfo.html(""); 
       //const para=document.createElement("p");
        //use d3 to select panel with id of sample-metadata
        //using Object.entries to add each key and value pair to panel
        Object.entries(result).forEach(([key,value])=>{
            demographicInfo.append("h3").text(`${key}:${value}`);
        //document.getElementById("sample-metadata").appendChild(para);
        });


    });

 }                

//________________________________________________________________________
function CreateGauge(num) {
    
  var gaugedata = [
  {
      domain: { x: [0, 1], y: [0, 1] },
      value: num,
      title: "Weekly Belly Button Washing Frequency",
      type: "indicator",
      mode: "gauge+number",
      delta:{reference:940,increasing:{ color:"blue"}},
      gauge: {
          axis: { range: [null, 10],
                // tickwidth:10,
                 tickcolor:"darkblue"} ,     
                  
                
          bar: { color: "#000000" },
          steps: [
              { range: [0, 1], color: "#FF5733" },
              { range: [1, 2], color: "#FF5E3C" },
              { range: [2, 3], color: "#FF6C4D" },
              { range: [3, 4], color: "#FF7456" },
              { range: [4, 5], color: "#FF8166" },
              { range: [5, 6], color: "#FF8E75" },
              { range: [6, 7], color: "#FE9A83" },
              { range: [7, 8], color: "#FFAE9B" },
              { range: [8, 9], color: "#FFC4B7" },
              { range: [9, 10], color: "#FFEAE5" },
          ],
          
      }
  }];
  var layout={
    width:500,
    height:400,
    //paper_bgcolor:"lavender",
    font:{color:"darkblue",family:"Arial"}
  };
  Plotly.newPlot('gauge',gaugedata,layout);
}
//Building Charts

function buildCharts(sample) {

    // Use `d3.json` to fetch the sample data for the plots
    d3.json("samples.json").then((data) => {
      var samples= data.samples;
      var resultsarray= samples.filter(sampleobject => 
          sampleobject.id == sample);
      var result= resultsarray[0]
    
      var ids = result.otu_ids;
      var labels = result.otu_labels;
      var values = result.sample_values;
    // for bubble charts 

      var LayoutBubble = {
        margin: { t: 0 },
        xaxis: { title: "OTU ID" },
        hovermode: "closest",
        };
    
        var DataBubble = [ 
        {
          x: ids,
          y: values,
          text: labels,
          mode: "markers",
          marker: {
            color: ids,
            size: values,
            }
        }
      ];
      Plotly.newPlot("bubble", DataBubble, LayoutBubble);

      //------ for bar charts 

      var bar_data =[
        {
          y:ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
          x:values.slice(0,10).reverse(),
          text:labels.slice(0,10).reverse(),
          type:"bar",
          orientation:"h"
    
        }
      ];
    
      var barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: { t: 30, l: 150 }
      };
    
      Plotly.newPlot("bar", bar_data, barLayout);
    });
    }

    //============= Function init =======================//
    
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  
  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    // console.log(data)
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
      // Use the first sample from the list to build the initial plots
      const firstSample = sampleNames[0];
      buildMetadata(firstSample);
      buildCharts(firstSample);
      CreateGauge(firstSample)
    
    
    });
    }
    
    function optionChanged(newSample) {
    // Get new data each time a new sample is selected
    buildMetadata(newSample);
    buildCharts(newSample);
    CreateGauge(newSample)
    
    }
    
    
    
    // Initialize the dashboard
   init();
  
  

       
    
   
    
    

   



