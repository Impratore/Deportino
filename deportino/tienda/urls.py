from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProductViewSet, ClienteViewSet, PedidoViewSet, ReseñaViewSet, RegisterView, LoginView, UserViewSet, register, login_view

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'clientes', ClienteViewSet)
router.register(r'pedidos', PedidoViewSet)
router.register(r'reseñas', ReseñaViewSet)
router.register(r'users', UserViewSet)  # Añadir esta línea

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register_api'),
    path('login/', LoginView.as_view(), name='login_api'),
    path('register_page/', register, name='register'),
    path('login_page/', login_view, name='login'),
]
