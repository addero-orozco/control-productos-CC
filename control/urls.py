from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('base.urls')),
    path('', include('ventas.urls')),
    path('api/v1/', include('api_v1.urls')),
]
