from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework.permissions import IsAuthenticated

from rest_framework import viewsets, mixins
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse


from productos.models import Producto
from api_v1.serializers.productos import ProductoSerializer, VendedoresCatalogoSerializer


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
        vendedores = User.objects.all()
        serializer = VendedoresCatalogoSerializer(vendedores, many = True)
        return Response({'resultados': serializer.data})


class VendedorCatalogoViews(APIView):
    """Endpoint para obtener el catalogo del vendedor"""
    def get(self, request, format = None):
        vendedor = request.user
        print(vendedor)
        producto = Producto.objects.filter(usuario=vendedor)
        serializer = ProductoSerializer(vendedores, many = True)
        return Response({'resultados': serializer.data})
