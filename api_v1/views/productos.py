from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework.permissions import IsAuthenticated


from productos.models import Producto
from api_v1.serializers.productos import ProductoSerializer


from rest_framework.decorators import api_view
from rest_framework.reverse import reverse


# @api_view(['GET'])
# def api_root(request, format=None):
#     return Response({
#         'productos': reverse('api_v1:productos', request=request, format=format),
#     })


class ProductoViewSet(
            viewsets.GenericViewSet,
            mixins.ListModelMixin,
            mixins.CreateModelMixin,
            mixins.RetrieveModelMixin,
            mixins.UpdateModelMixin,
            mixins.DestroyModelMixin):
    queryset = Producto.objects.all().order_by('id')
    serializer_class = ProductoSerializer


    def list(self, request, *args, **kwargs):
        lookup_url_kwarg = 'id'
        lookup_field = 'id'
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({'resultados': serializer.data})
