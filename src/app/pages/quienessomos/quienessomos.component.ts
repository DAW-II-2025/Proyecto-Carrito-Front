import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quienessomos',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent],
  templateUrl: './quienessomos.component.html',
  styleUrls: ['./quienessomos.component.css']
})
export class QuienessomosComponent {
  desarrolladores = [
    { name: 'Jhon Quiñones', img: 'assets/hacker.jpg' },
    { name: 'Cristopher Ortega', img: 'assets/hacker.jpg' },
    { name: 'Ian Bazán', img: 'assets/hacker.jpg' },
    { name: 'Betsy Pantaleón', img: 'assets/hacker.jpg' },
    { name: 'Antony Trejo', img: 'assets/hacker.jpg' },
  ];
}
