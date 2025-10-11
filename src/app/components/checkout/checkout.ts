import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../services/cart';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {
// Inyección de dependencias
  private fb = inject(FormBuilder);
  private cartService = inject(CartService);
  private router = inject(Router);

  // Definición del FormGroup para el formulario
  checkoutForm!: FormGroup;

  // Signals para gestionar el estado de la UI
  isSubmitting = signal(false);
  submissionStatus = signal<'idle' | 'success' | 'error'>('idle');

  ngOnInit(): void {
    // Inicialización del formulario con sus campos y validadores
    this.checkoutForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]], // Patrón para 4 dígitos (código postal suizo)
    });
  }

  // Getter para un acceso más fácil a los controles del formulario en la plantilla
  get f() {
    return this.checkoutForm.controls;
  }

  onSubmit(): void {
    // Si el formulario es inválido, marcamos todos los campos como "tocados" para mostrar los errores
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    // Comienza el proceso de envío
    this.isSubmitting.set(true);
    this.submissionStatus.set('idle');

    console.log('Enviando pedido:', this.checkoutForm.value);

    // --- Simulación de una llamada a una API ---
    setTimeout(() => {
      // Éxito simulado
      this.submissionStatus.set('success');
      this.isSubmitting.set(false);
      this.cartService.clearCart(); // Vaciamos el carrito
      this.checkoutForm.reset(); // Reseteamos el formulario

      // Opcional: Redirigir al usuario a una página de agradecimiento después de unos segundos
      setTimeout(() => this.router.navigate(['/']), 3000);

    }, 2000);
  }
}
