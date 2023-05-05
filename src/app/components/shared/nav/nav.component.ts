import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  
  cartCount=0;
  constructor(private msg : MessengerService) { }

  ngOnInit() {

    this.msg.getMsg().subscribe((data) => {
      if(data == 0)
      {
        this.cartCount--;
        if(this.cartCount < 0 )  
        {
          this.cartCount =0;
        }
      }
      else
      {
        this.cartCount++;
        
      }
      
    })

  }

}
