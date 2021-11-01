import { Component, OnInit } from '@angular/core';
//line chart
import { ChartDataSets, ChartOptions, ChartType, scaleService } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';


@Component({
  selector: 'app-perfomance',
  templateUrl: './perfomance.component.html',
  styleUrls: ['./perfomance.component.scss']
})
export class PerfomanceComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [6, 5, 2.55, 6, 7, 8, 4,8,9], label: 'Nombre de km parcouru en minute' },
    { data: [4, 4, 2.55, 2.55, 3.20, 3, 3,3,3], label: 'Nombre de km parcouru en minute' },
  ];

  public lineChartLabels: Label[] = ['1 km', '2 km', '3 km', '4 km', '5 km', '6 km', '7 km','8 km','9 km','10 km'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    
    responsive: true,
    
    scales: {
      
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
        id: 'x-axis-0',
        position: 'bottom',
        gridLines : {
          display: false
        }
    
      }],
      yAxes: [
       
        {
          id: 'y-axis-0',
          position: 'right',
          
          ticks: {
            callback: function(value,index,values){
              return value+' minutes';
            }
          }
        
        },
        
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };

  public lineChartColors: Color[] = [


    { // dark grey
      backgroundColor: 'rgba(77,83,96,0)',
      borderColor: 'red',
      pointBackgroundColor: 'white',
      pointBorderColor: 'red',
      pointHoverBackgroundColor: 'white',
      pointHoverBorderColor: 'red'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0)',
      borderColor: '#3751FF',
      pointBackgroundColor: 'white',
      pointBorderColor: '#3751FF',
      pointHoverBackgroundColor: 'white',
      pointHoverBorderColor: '#3751FF'
    },
    
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';



  ngOnInit(){}


 

  constructor() {}

}
