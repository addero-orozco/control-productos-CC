from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from api_v1.views import productos
from rest_framework.routers import DefaultRouter

from rest_framework.routers import DefaultRouter


app_name = 'api_v1'

router = DefaultRouter()
router.register(r'productos', productos.ProductoViewSet)

urlpatterns_no_suffix = [
    ##path('', productos.api_root, name="root"),
    ##path('productos/', productos.ProductoAPIView.as_view(), name='productos'),
]

urlpatterns_no_suffix = format_suffix_patterns(urlpatterns_no_suffix)

urlpatterns = urlpatterns_no_suffix + router.urls