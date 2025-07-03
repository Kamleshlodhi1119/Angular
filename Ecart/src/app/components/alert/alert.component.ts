import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  message: string | null = null;
  visible = false;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.alertService.alert$.subscribe(msg => {
      this.message = msg;
      this.visible = true;

      // Auto-close after 3 seconds
      setTimeout(() => {
        this.visible = false;
        this.message = null;
      }, 3000);
    });
  }

  close() {
    this.visible = false;
    this.message = null;
  }
}
