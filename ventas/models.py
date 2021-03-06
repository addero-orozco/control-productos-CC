from decimal import Decimal
from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()
from productos.models import Producto


DECIMAL_CERO = Decimal('0.0')


class Venta(models.Model):
    usuario     = models.ForeignKey(
                            User,
                            related_name='ventas',
                            null=False,
                            blank=False,
                            verbose_name='Usuario',
                            on_delete=models.CASCADE)
    comprador   = models.CharField(
                            max_length=79,
                            blank=False,
                            null=False)
    total       = models.DecimalField(
                            max_digits=8,
                            decimal_places=2,
                            default=DECIMAL_CERO)

    def __str__(self):
        return str(self.id)


class Detalle(models.Model):
    venta       = models.ForeignKey(
                            Venta,
                            on_delete=models.PROTECT,
                            null=False)
    producto    = models.ForeignKey(
                            Producto,
                            related_name='detalles',
                            null=False,
                            blank=False,
                            verbose_name='Producto',
                            on_delete=models.CASCADE)
    subtotal    = models.DecimalField(
                            max_digits=8,
                            decimal_places=2,
                            default=DECIMAL_CERO)