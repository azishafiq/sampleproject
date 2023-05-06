import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from 'selenium-webdriver';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  submitted =false;
  imageSrc: string;
  myForm = new FormGroup({
   name: new FormControl('', [Validators.required]),
   price: new FormControl('', [Validators.required,   Validators.pattern("^[0-9]*$"), ] ) ,
   description: new FormControl('',[Validators.required] ),
   image: new FormControl('', ),
   fileSource: new FormControl('',),
   tags: new FormControl('',),
   preferenceType: new FormControl('',),
   preferences: new FormControl('',)

 });
  productId: any;

 
  constructor(   private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }


  get f(){
    return this.myForm.controls;
  }
  
  ngOnInit() {

    this.productId = this.route.snapshot.params['id'];
    if(this.productId)
    {
      this.LoadProduct();
    }  
    

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
    if(this.myForm.valid)
    {
      if(this.productId)
      {
        this.productService.editProduct(this.productId,this.prepareProductJson(this.myForm.value))
        .subscribe(res => {
          
          this.router.navigate(['/product-list']); 
        })

      }
      else
      {
        this.productService.addProduct(this.prepareProductJson(this.myForm.value))
        .subscribe(res => {
          
          this.router.navigate(['/product-list']); 
        })
      }  
    }    

   
    
  }

  prepareProductJson(formValue)
  {
  return new Product(formValue.name,formValue.description,formValue.price,
    formValue.fileSource,formValue.tags,formValue.preferenceType,formValue.preferences);

  }

  LoadProduct()
  {
    this.productService.getProductById(this.productId).subscribe((product : any) => {
      this.myForm.controls['name'].setValue(product.product.name);
      this.myForm.controls['price'].setValue(product.product.price);
      this.myForm.controls['description'].setValue(product.product.description);
      this.imageSrc = product.product.imageSrc;
      this.myForm.patchValue({
        fileSource:      this.imageSrc
      });

      this.myForm.controls['tags'].setValue(product.product.tags);
      this.myForm.controls['preferenceType'].setValue(product.product.preferenceType);
      this.myForm.controls['preferences'].setValue(product.product.preferences);
      
  })

  }

}
