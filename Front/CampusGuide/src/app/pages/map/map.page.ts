import { AfterViewInit, Component, ElementRef, inject, OnInit, QueryList, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonPopover, IonSearchbar, IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import { HeaderModule } from "../../components/header/header/header.module";
import { CartService } from 'src/app/services/cart.service';
import { addIcons } from 'ionicons';
import { qrCodeOutline } from 'ionicons/icons';

// This component will display a custom map with interactive functionality like zooming, panning, and dragging.
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [IonIcon, IonFabButton, IonFab, IonSearchbar, IonPopover, IonContent, CommonModule, FormsModule, HeaderModule]
})
export class MapPage implements OnInit, AfterViewInit{
  rooms: QueryList<ElementRef> | null = null;
  @ViewChild('popover', { static: false }) popover!: HTMLIonPopoverElement;
  @ViewChild('myCanvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  isOpen:boolean = false;
  text: string = 'map';
  private cartService = inject(CartService);
    isToast = false;
    toastData: any = {};

  constructor(private elementRef: ElementRef) {
    addIcons({ qrCodeOutline });
  }

  ngOnInit() {
    console.log("hey")
  }

  ngAfterViewInit() {
    const canvas = this.canvas.nativeElement;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const hostElement = this.elementRef.nativeElement;

    // Query all <g> elements under #test
    const roomElements = hostElement.querySelectorAll('#Floor > g');
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

          const hasClassTop = room.nativeElement.classList.contains('top');
          const hasClassBottom = room.nativeElement.classList.contains('bottom');
          const hasClassLeft = room.nativeElement.classList.contains('left');
          const hasClassRight = room.nativeElement.classList.contains('right');

          // Calculate x and y coordinates relative to the viewport
          const x = rect.left + window.scrollX;
          const y = rect.top + window.scrollY;
          this.popover.event = e;
          this.isOpen = true;
          this.text = room.nativeElement.id;
          position.style.left = (x - 22) + "px";
          if(hasClassTop){
            position.style.left = (x - 3 + rect.width/2) + "px";
            position.style.top = (y - 22) + "px";
          }
          if (hasClassBottom) {
            position.style.left = (x - 3 + rect.width/2) + "px";
            position.style.top = (y + rect.height + 10) + "px";
          }
          else {
            position.style.top = (y-2+rect.height/2) + "px";
          }
          console.log('Room clicked:', room.nativeElement.id);
          console.log('Position (x, y):', { x, y });
          console.log('Bounding rectangle (width, height):',rect.width, rect.height);
        });
      });
    }


    //57 x
    //85 y
    // Define the two points
    const point1 = { x: 251, y: 98 };
    const point2 = { x: 250.5, y: 318 };

    const canvasPoint1 = this.toCanvasCoordinates(point1);
    const canvasPoint2 = this.toCanvasCoordinates(point2);
    console.log(canvasPoint1, canvasPoint2);
    // const point3 = { x: 220, y: 378 };

    // Draw the path
    this.drawLine(canvasPoint1 , canvasPoint2 );
    // this.drawLine(point2, point3);
    // this.drawLine(point1, point3);
  }

  private toCanvasCoordinates(viewportPoint: { x: number; y: number }): { x: number; y: number } {
    const x = viewportPoint.x - 48;
    const y = viewportPoint.y - 35;

    return { x, y };
  }

  private drawLine(point1: { x: number; y: number }, point2: { x: number; y: number }): void {
    if (!this.ctx) return;

    // Begin a new path
    this.ctx.beginPath();
    this.ctx.moveTo(point1.x, point1.y); // Move to the starting point
    this.ctx.lineTo(point2.x, point2.y); // Draw a line to the ending point
    this.ctx.strokeStyle = 'blue'; // Set line color
    this.ctx.lineWidth = 2; // Set line width
    this.ctx.stroke(); // Stroke the path
  }


  //Axel Worked here
  async scanBarCode(){

    try{
      const code = await this.cartService.startscan();
      console.log(code)
    }
    catch(e){
      console.log(e)
    }
  }

  async scanAndPay() {
    try {
      const code = await this.cartService.startscan(0);
      console.log(code);
      if (!code) {
        this.isToast = true;
        this.toastData = {
          color: 'danger',
          message: 'Error! Please try again',
        };
        return;
      }

      this.isToast = true;
      this.toastData = {
        color: 'success',
        message: 'Payment successful',
      };
    } catch (e) {
      console.log(e);
    }
  }
}
