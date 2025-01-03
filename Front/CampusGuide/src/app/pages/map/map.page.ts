import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonPopover } from '@ionic/angular/standalone';
import { HeaderModule } from "../../components/header/header/header.module";
import Panzoom from '@panzoom/panzoom';

// This component will display a custom map with interactive functionality like zooming, panning, and dragging.
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [IonPopover, IonContent, CommonModule, FormsModule, HeaderModule]
})
export class MapPage implements OnInit, AfterViewInit{
  rooms: QueryList<ElementRef> | null = null;
  @ViewChild('popover', { static: false }) popover!: HTMLIonPopoverElement;
  isOpen:boolean = false;
  text: string = 'map';

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    // Add event listeners to your custom map elements here
    // if (this.rooms) {
    //   this.rooms.forEach((room) => {
    //     room.nativeElement.addEventListener('click', () => {
    //       console.log('Room clicked:', room.nativeElement.id);
    //     });
    //   });
    // }

  }

  ngAfterViewInit() {
    // const svgElement = document.getElementById('custom-map') as HTMLElement;

    // if (svgElement) {
    //   const panzoomInstance = Panzoom(svgElement, {
    //     maxScale: 5, // Allow zooming in further
    //     minScale: 0.1, // Allow zooming out further
    //     contain: 'outside', // Prevent restricting zoom to the container
    //   });

    //   // Add mouse wheel zoom support
    //   svgElement.parentElement?.addEventListener('wheel', panzoomInstance.zoomWithWheel);

    //   // Optional: Add reset on double-tap or double-click
    //   svgElement.addEventListener('dblclick', () => panzoomInstance.reset());
    // }
    // Get the native DOM element of the host component
    const hostElement = this.elementRef.nativeElement;

    // Query all <g> elements under #test
    const roomElements = hostElement.querySelectorAll('#test > g');
    const position = hostElement.querySelector('#position') as HTMLElement;
    console.log(position);

    // Convert the NodeList into an Angular QueryList
    this.rooms = new QueryList<ElementRef>();
    this.rooms.reset(
      Array.from(roomElements).map(element => new ElementRef(element))
    );

    console.log(this.rooms); // Logs the QueryList
    if (this.rooms) {
      this.rooms.forEach((room) => {
        room.nativeElement.addEventListener('click', (e: Event) => {
          // Get the bounding rectangle of the clicked element
          const rect = room.nativeElement.getBoundingClientRect();

          // Calculate x and y coordinates relative to the viewport
          const x = rect.left + window.scrollX;
          const y = rect.top + window.scrollY;
          this.popover.event = e;
          this.isOpen = true;
          this.text = room.nativeElement.id;
          position.style.left = x + "px";
          position.style.top = (y-2+rect.height/2) + "px";
          console.log('Room clicked:', room.nativeElement.id);
          console.log('Position (x, y):', { x, y });
          console.log('Bounding rectangle (width, height):',rect.width, rect.height);
        });
      });
    }
  }
}
