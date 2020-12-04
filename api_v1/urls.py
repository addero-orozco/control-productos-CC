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
]

urlpatterns_no_suffix = format_suffix_patterns(urlpatterns_no_suffix)

urlpatterns = urlpatterns_no_suffix + router.urls