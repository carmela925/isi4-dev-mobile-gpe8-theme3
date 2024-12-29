import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HeaderModule } from "../../components/header/header/header.module";
import Panzoom from '@panzoom/panzoom';

// This component will display a custom map with interactive functionality like zooming, panning, and dragging.
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderModule]
})
export class MapPage implements OnInit, AfterViewInit{

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const svgElement = document.getElementById('custom-map') as HTMLElement;

    if (svgElement) {
      // Initialize Panzoom
      const panzoomInstance = Panzoom(svgElement, {
        maxScale: 5, // Allow zooming in further
        minScale: 0.1, // Allow zooming out further
        contain: 'outside', // Prevent restricting zoom to the container
      });

      // Add mouse wheel zoom support
      svgElement.parentElement?.addEventListener('wheel', panzoomInstance.zoomWithWheel);

      // Optional: Add reset on double-tap or double-click
      svgElement.addEventListener('dblclick', () => panzoomInstance.reset());
    }
  }
}
