import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';



@Component ({
  selector: 'app-error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.css']
})

export class ErrorDisplayComponent implements OnInit {
  @Input() errorMsg: string;
  @Input() displayError: boolean;
  @Input() emailFlag: boolean;
  constructor(public authService: AuthService) {}

  ngOnInit() {
    if (typeof(this.emailFlag) === 'undefined') {
      this.emailFlag = true;
    }
  }
}




