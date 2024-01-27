import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hard-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hard-skills.component.html',
  styleUrls: ['./hard-skills.component.scss']
})
export class HardSkillsComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    // gsap.timeline()
  }
}
