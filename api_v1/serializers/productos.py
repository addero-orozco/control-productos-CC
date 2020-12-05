from rest_framework import serializers
from productos.models import Producto

from django.contrib.auth import get_user_model
User = get_user_model()

class ProductoSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Producto
        fields = [
            'id',
            'nombre',
            'precio',
            'cantidad',
            'descripcion',
            #'usuario',
        ]

class ProductoEditarSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Producto
        fields = [
            'id',
            'nombre',
            'precio',
            'descripcion',
        ]

class VendedoresCatalogoSerializer(serializers.ModelSerializer):
    """Enlaza Vendedor con su Producto"""
    id = serializers.IntegerField(read_only=True)
    productos = ProductoSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = [
            'id',
            'first_name',
            'productos',
        ]