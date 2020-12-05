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


class ReportePorProductoSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    total = serializers.SerializerMethodField()

    class Meta:
        model = Detalle
        fields = [
            'id',
            'producto',
            'total',
        ]

    def get_total(self, obj):
        request = self.context.get('request')
        print("\n \n \n")
        print(request.user)
        print("\n \n \n")
        return str("aaaaa")