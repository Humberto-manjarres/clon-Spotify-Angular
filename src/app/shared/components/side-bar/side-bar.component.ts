import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  
  /** el valor de mainMenu es un objeto, que a la vez inicializamos */
  mainMenu : {
    defaultOptions: Array<any>,
    accessLink: Array<any>
  } = {defaultOptions: [], accessLink: []}

  customOptions: Array<any> = [];

  constructor(private route:Router) { }

  ngOnInit(): void {
    this.mainMenu.defaultOptions = [
      {
        name: 'Home',
        icon: 'uil uil-estate',
        router:['/']
      },
      {
        name: 'Buscar',
        icon: 'uil uil-search',
        router:['/','history']
      },
      {
        name: 'Tu biblioteca',
        icon: 'uil uil-chart',
        router:['/','favorites']
      }
    ]

    this.mainMenu.accessLink = [
      {
        name: 'Crear lista',
        icon: 'uil uil-plus-square',
      },
      {
        name: 'Canciones que te gustan',
        icon: 'uil uil-heart-medical',
      }
    ]

    this.customOptions = [
      {
        name: 'Mi lista °1',
        router: ['/']
      },
      {
        name: 'Mi lista °2',
        router: ['/']
      },
      {
        name: 'Mi lista °3',
        router: ['/']
      },
      {
        name: 'Mi lista °4',
        router: ['/']
      }
    ]
     
  }

}
