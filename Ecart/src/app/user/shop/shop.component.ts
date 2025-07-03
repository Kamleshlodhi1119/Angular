import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  pagedProducts: Product[] = [];

  searchTerm = '';
  selectedCategory = '';
  sortOption = '';

  categories: string[] = ['Men', 'Women', ''];

  currentPage = 1;
  pageSize = 9;
  totalPages = 1;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.applyFilters();
      },
      error: () => {
        this.products = [];
        this.filteredProducts = [];
      }
    });
  }

  applyFilters() {
    let temp = [...this.products];

    // Filter by search term
    if (this.searchTerm.trim()) {
      temp = temp.filter(p =>
        p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Filter by category (hardcoded category match for now)
    if (this.selectedCategory) {
      temp = temp.filter(p => p.category?.toLowerCase() === this.selectedCategory.toLowerCase());
    }

    // Sort
    switch (this.sortOption) {
      case 'price-asc':
        temp.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        temp.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        temp.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        temp.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    this.filteredProducts = temp;
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedProducts = this.filteredProducts.slice(start, end);
    this.totalPages = Math.ceil(this.filteredProducts.length / this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  handleAddToCart(product: Product) {
    // integrate with your cart service
    console.log('Added to cart:', product);
  }
}
