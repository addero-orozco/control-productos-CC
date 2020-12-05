from rest_framework import serializers
from ventas.models import Venta, Detalle


class VentaSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Venta
        fields = '__all__'

class DetalleSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Detalle
        fields = '__all__'
