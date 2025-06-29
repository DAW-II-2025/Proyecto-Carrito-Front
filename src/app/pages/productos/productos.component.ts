import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

interface Producto {
  descripcion: string;
  estado: string;
  stock: number;
  idProducto: string;
  precioUnidad: number;
  imagen: string;
}

interface PaginationResponse {
  content: Producto[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: any;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: any;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent, FormsModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  paginatedData: PaginationResponse | null = null;
  productos: Producto[] = [];
  currentPage = 0;
  error: string | null = null;
  loading = false;
  notification: string | null = null;
  precioMax?: number;
  precioMin?: number;
  nombreFiltro = '';
  categoriaSeleccionada = '';
  categorias = [
    'Monitores', 'Televisores', 'Micrófonos', 'Impresoras', 'Almacenamiento',
    'Routers', 'Camaras', 'Tablets', 'Consolas', 'Altavoces', 'Seguridad', 'Teléfonos', 'Teclados'
  ];

  constructor(private cartService: CartService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['categoria']) {
        this.categoriaSeleccionada = params['categoria'];
        this.handleFilter(); // Ejecutar el filtro automáticamente si viene por query param
      } else {
        this.fetchProductos();
      }
    });
  }

  async fetchProductos(page = this.currentPage, nombre?: string, categoria?: string) {
    this.loading = true;
    try {
      let url = `${environment.apiUrl}/Producto/list?page=${page}`;
      if (nombre) url += `&nombre=${nombre}`;
      if (categoria) url += `&categoria=${categoria}`;
      const response = await fetch(url);
      const data = await response.json();
      this.paginatedData = data;
      let productosFiltrados = data.content;
      if (this.precioMin !== undefined && this.precioMin !== null) {
        productosFiltrados = productosFiltrados.filter((p: Producto) => p.precioUnidad >= this.precioMin!);
      }
      if (this.precioMax !== undefined && this.precioMax !== null) {
        productosFiltrados = productosFiltrados.filter((p: Producto) => p.precioUnidad <= this.precioMax!);
      }
      this.productos = productosFiltrados;
    } catch (err: any) {
      this.error = err.message || 'Error al cargar productos';
    } finally {
      this.loading = false;
    }
  }

  handleFilter() {
    this.currentPage = 0;
    this.fetchProductos(0, this.nombreFiltro, this.categoriaSeleccionada);
  }

  goToPage(page: number) {
    if (this.paginatedData && page >= 0 && page < this.paginatedData.totalPages) {
      this.currentPage = page;
      this.fetchProductos(page, this.nombreFiltro, this.categoriaSeleccionada);
    }
  }

  nextPage() {
    if (this.paginatedData && !this.paginatedData.last) {
      this.currentPage++;
      this.fetchProductos(this.currentPage, this.nombreFiltro, this.categoriaSeleccionada);
    }
  }

  prevPage() {
    if (this.paginatedData && !this.paginatedData.first) {
      this.currentPage--;
      this.fetchProductos(this.currentPage, this.nombreFiltro, this.categoriaSeleccionada);
    }
  }

  getPageNumbers(): number[] {
    if (!this.paginatedData) return [];
    const totalPages = this.paginatedData.totalPages;
    const currentPageNum = this.paginatedData.number;
    const pages = [];
    const startPage = Math.max(0, Math.min(currentPageNum - 2, totalPages - 5));
    const endPage = Math.min(totalPages, startPage + 5);
    for (let i = startPage; i < endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  handleAddToCart(producto: Producto) {
    this.cartService.addToCart({
      id: Number(producto.idProducto),
      name: producto.descripcion,
      price: producto.precioUnidad,
      image: producto.imagen,
      quantity: 1
    });
    this.notification = `Producto "${producto.descripcion}" agregado al carrito.`;
    setTimeout(() => this.notification = null, 3000);
  }
}
