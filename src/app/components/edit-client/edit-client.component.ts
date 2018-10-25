import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service'
import { Client } from '../../models/Client';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from '../../services/settings.service';


@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = { 
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  }
  disableBalanceOnEdit: boolean;

  constructor( private clientService: ClientService,
               private router: Router,
               private route: ActivatedRoute,
               private flashMsg: FlashMessagesService,
               private settingsService: SettingsService,
  ) { }

  ngOnInit() {
     // get id from URL
     this.id = this.route.snapshot.params['id'];

     // get client
     this.clientService.getClient(this.id).subscribe(client => this.client = client)

     this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
}

onSubmit({value, valid}: {value: Client, valid: boolean}) {
  if(!valid) {
    // Show error
    this.flashMsg.show('Please fill out the form corectly', {cssClass: 'alert-danger', timeout: 4000})}
  else {
    // Add id to client
    value.id = this.id
    // Update client
    this.clientService.updateClient(value);
    // Show messages
    this.flashMsg.show('Client updated', {cssClass: 'alert-success', timeout: 4000})
    // Redirect to dash
    this.router.navigate(['/client/'+this.id])
  }
}

}
