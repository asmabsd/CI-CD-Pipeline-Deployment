import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransportService } from 'src/app/services/transport.service';
import { Transport } from 'src/app/models/transport';

@Component({
  selector: 'app-detailstransport',
  templateUrl: './detailstransport.component.html',
  styleUrls: ['./detailstransport.component.css']
})
export class DetailstransportComponent implements OnInit {

  transport!: Transport;

  constructor(
    private route: ActivatedRoute,
    private transportService: TransportService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.transportService.getTransportById(id).subscribe(data => {
      this.transport = data;
    });
  }
}
