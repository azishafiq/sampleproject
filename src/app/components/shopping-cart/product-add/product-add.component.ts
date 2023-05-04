import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'selenium-webdriver';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {


  imageSrc: string;
  myForm = new FormGroup({
   name: new FormControl('', [Validators.required]),
   price: new FormControl('', [Validators.required]),
   description: new FormControl('', ),
   image: new FormControl('', ),
   fileSource: new FormControl('',),
   tags: new FormControl('',),
   preferenceType: new FormControl('',),
   preferences: new FormControl('',)

 });

 
  constructor(   private productService: ProductService,
    private router: Router) { }


  get f(){
    return this.myForm.controls;
  }
  
  ngOnInit() {
  }

  onImageChange(event) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;
     
        this.myForm.patchValue({
          fileSource: reader.result
        });
   
      };
   
    }
  }


  submit(){
    
    this.productService.addProduct(this.prepareProductJson(this.myForm.value))
      .subscribe(res => {
        
        this.router.navigate(['/products']); 
      })
  }

  prepareProductJson(formValue)
  {
  return new Product(formValue.name,formValue.description,formValue.price,
    formValue.fileSource,formValue.tags,formValue.preferenceType,formValue.preferences);

  }

}
