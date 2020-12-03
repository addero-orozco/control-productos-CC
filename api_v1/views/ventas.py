from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework.permissions import IsAuthenticated


from ventas.models import Venta, Detalle
from api_v1.serializers.ventas import VentaSerializer, DetalleSerializer


from rest_framework.decorators import api_view
from rest_framework.reverse import reverse


class VentaViewSet(
            viewsets.GenericViewSet,
            mixins.ListModelMixin,
            mixins.CreateModelMixin,
            mixins.RetrieveModelMixin):
    queryset = Venta.objects.all().order_by('id')
    serializer_class = VentaSerializer


    def list(self, request, *args, **kwargs):
        lookup_url_kwarg = 'id'
        lookup_field = 'id'
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({'resultados': serializer.data})

class DetalleViewSet(
            viewsets.GenericViewSet,
            mixins.ListModelMixin,
            mixins.CreateModelMixin,
            mixins.RetrieveModelMixin):
    queryset = Detalle.objects.all().order_by('id')
    serializer_class = DetalleSerializer


    def list(self, request, *args, **kwargs):
        lookup_url_kwarg = 'id'
        lookup_field = 'id'
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({'resultados': serializer.data})