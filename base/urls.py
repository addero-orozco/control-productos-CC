from django.urls import path, re_path
from . import views


urlpatterns = [
   path('registro/', views.registro, name='registro'),
]