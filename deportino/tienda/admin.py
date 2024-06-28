from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Category, Product, Cliente, Pedido, Reseña, CustomUser

# Register your models here.
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'price', 'available', 'created', 'updated']
    list_filter = ['available', 'created', 'updated']
    list_editable = ['price', 'available']
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'apellidos', 'email', 'ciudad']

@admin.register(Pedido)
class PedidoAdmin(admin.ModelAdmin):
    list_display = ['cliente', 'fecha', 'direccion_entrega', 'pagado']

@admin.register(Reseña)
class ReseñaAdmin(admin.ModelAdmin):
    list_display = ['producto', 'cliente', 'calificacion', 'fecha']
    list_filter = ['calificacion', 'fecha']

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['username', 'email', 'first_name', 'last_name', 'is_staff']

admin.site.register(CustomUser, CustomUserAdmin)
