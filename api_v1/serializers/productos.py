from rest_framework import serializers
from productos.models import Producto


class ProductoSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Producto
        fields = '__all__'