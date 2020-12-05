from django.urls import path, re_path
from . import views


urlpatterns = [
   path('registro/', views.registro, name='registro'),
   path('login/', views.user_login, name='login'),
   path('logout/', views.user_logout, name='logout'),
]