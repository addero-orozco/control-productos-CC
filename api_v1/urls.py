from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.routers import DefaultRouter
from api_v1.views import productos
from api_v1.views import ventas


app_name = 'api_v1'

router = DefaultRouter()
router.register(r'productos', productos.ProductoViewSet)
router.register(r'ventas', ventas.VentaViewSet)
router.register(r'detalles', ventas.DetalleViewSet)

urlpatterns_no_suffix = [
    path('catalogos/', productos.CatalogosVendedoresViews.as_view(), name='catalogos'),
    path('catalogo-vendedor/', productos.VendedorCatalogoViews.as_view(), name='catalogo-vendedor'),
    path('productos-catalogo/<int:id_vendedor>/', productos.ProductosVendedorViews.as_view(), name='productos-catalogo'),
    path('productos-descontar/<int:id_producto>/', productos.DescontarProductoViews.as_view(), name='productos-descontar'),
    path('venta-confirmar/', productos.ConfirmarCompraViews.as_view(), name='venta-confirmar'),
]

urlpatterns_no_suffix = format_suffix_patterns(urlpatterns_no_suffix)

urlpatterns = urlpatterns_no_suffix + router.urls