import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { ProductFormComponent } from '../product-form/product-form';
import { ProductServiceAdmin } from '../../services/product-service-admin';
import { HttpClient, httpResource } from '@angular/common/http';
import { Product } from '../../../interfaces/product';
import { DecimalPipe, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'product-list-admin',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './product-list-admin.html',
  styleUrl: './product-list-admin.css',
})
export class ProductListAdmin {
  private service = inject(ProductServiceAdmin);
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);


  products = this.service.products;
  showModal = signal(false);
  selectedProduct = signal<Product | null>(null);

  form: FormGroup = this.fb.group({
    id: [null],
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, Validators.required],
    imageUrl: [''],
    stock: [0, Validators.required],
  });

  editMode = computed(() => !!this.selectedProduct());

  constructor() {
    this.service.loadProducts();

    effect(() => {
      const product = this.selectedProduct();
      if (product) {
        this.form.patchValue(product);
      } else {
        this.form.reset();
      }
    });
  }

  openAddModal() {
    this.selectedProduct.set(null);
    this.showModal.set(true);
  }

  openEditModal(product: Product) {
    this.selectedProduct.set(product);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  saveProduct() {
    if (this.form.invalid) return;

    const product = this.form.value as Product;
    this.service.saveProduct(product);
    this.closeModal();
  }

  deleteProduct(id: number) {
    this.service.deleteProduct(id);
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    this.form.get('imageUrl')?.setValue('/' + file.name);
  }
  logout() {
  this.auth.logout();
  this.router.navigate(['/login']); // vuelve a la página de login
}
}
