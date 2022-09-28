import { Component, OnDestroy, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from './product.service'
import { Subscription } from 'rxjs';


@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnDestroy{
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string = '';
    sub!: Subscription;

    //Getter and Setter
    private _listFilter:string = ''; //hold the value managed by getter and setter
    //process the amount and return amt from private storage
    get listFilter(): string{
        return this._listFilter;
    }
    //process and retain the amt in private storage
    set listFilter(value:string){
        this._listFilter = value;
        console.log('In setter:', value);
        this.filteredProducts = this.performFilter(value);
    }
    //filter
    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];
    //Methods
    constructor(private productService: ProductService){}

    toggleImage(): void{ //void because it wont have a return type. return type void
        this.showImage= !this.showImage;
    }
    ngOnInit(): void {
         this.sub = this.productService.getProducts().subscribe({
            next: products => {
                this.products = products
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        });
        
    }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
    performFilter(filterBy:string): IProduct[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => 
        product.productName.toLocaleLowerCase().includes(filterBy));
    }
    onRatingClicked(message:string): void {
        this.pageTitle = 'Product List: ' + message;
    }
    
}