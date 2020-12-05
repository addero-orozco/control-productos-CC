from django.db import transaction
from django.shortcuts import get_object_or_404
from django.db.models import Sum
from django.db.models import Avg

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, mixins
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse
from rest_framework import status

from productos.models import Producto
from ventas.models import Venta, Detalle
from api_v1.serializers.productos import ProductoSerializer, VendedoresCatalogoSerializer
from api_v1.serializers.ventas import ReportePorProductoSerializer
import json
from decimal import Decimal

from django.contrib.auth import get_user_model
User = get_user_model()


class ProductoViewSet(
            viewsets.GenericViewSet,
            mixins.ListModelMixin,
            mixins.CreateModelMixin,
            mixins.RetrieveModelMixin,
            mixins.UpdateModelMixin,
            mixins.DestroyModelMixin):
    """Endpoints para listar, crear y recuperar Producto"""
    queryset = Producto.objects.all().order_by('id')
    serializer_class = ProductoSerializer


    def list(self, request, *args, **kwargs):
        lookup_url_kwarg = 'id'
        lookup_field = 'id'
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({'resultados': serializer.data})


class CatalogosVendedoresViews(APIView):
    """Endpoint para obtener los catalogos de produtos
    por Vendedor"""
    def get(self, request, format = None):
        usuario = request.user
        vendedores = User.objects.all()
        serializer = VendedoresCatalogoSerializer(vendedores, many = True)
        return Response({'resultados': serializer.data})


class VendedorCatalogoViews(APIView):
    """Endpoint para obtener el catalogo del propio vendedor"""
    def get(self, request, format = None):
        vendedor = request.user
        print(vendedor)
        producto = Producto.objects.filter(usuario=vendedor)
        serializer = ProductoSerializer(producto, many = True)
        return Response({'resultados': serializer.data})


class ProductosVendedorViews(APIView):
    """Endpoint para obtener todos los productos de un vendedor"""
    def get(self, request, id_vendedor,format = None):
        vendedor = request.user
        producto = Producto.objects.filter(usuario__id=id_vendedor)
        serializer = ProductoSerializer(producto, many = True)
        return Response({'resultados': serializer.data})


class ConfirmarCompraViews(APIView):
    """Endpoint para registrar la compra"""
    def post(self, request,format = None):
        data = request.data
        usuario = request.user
        comprador = str(usuario)

        if usuario.is_anonymous:
            comprador = 'CF'

        with transaction.atomic():

            venta = Venta.objects.create(
                usuario=usuario,
                comprador=comprador,
                total=0
            )
            total = 0
            for elemento in data:
                id_producto = elemento['id']
                producto = get_object_or_404(Producto, pk=id_producto)
                if producto.cantidad > 0:
                    producto.descontar()

                    Detalle.objects.create(
                        venta=venta,
                        producto=producto,
                        subtotal=producto.precio
                    )
                    total += producto.precio
            venta.total = Decimal(total)
            venta.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ReporteVentaTotalViews(APIView):
    def get(self, request,format = None):
        usuario = request.user
        total_venta = Venta.objects.all().filter(usuario=usuario).values('usuario__first_name').annotate(total_total=Sum('total'))

        total = 0
        for elemento in total_venta:
            total = elemento['total_total']


        return Response({'resultados': total})


class ReportePorProductoViews(APIView):
    def get(self, request,format = None):
        usuario = request.user

        ventas = Venta.objects.filter(usuario=usuario)
        productos_total = Detalle.objects.all().filter(venta_id__in=ventas).values('producto__nombre').annotate(total=Sum('subtotal')).order_by('subtotal')

        return Response({'resultados': productos_total})