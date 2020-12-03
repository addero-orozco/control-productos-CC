from decimal import Decimal
from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


DECIMAL_CERO = Decimal('0.0')


class Producto(models.Model):
    nombre      = models.CharField(
                            max_length=10,
                            blank=False,
                            null=False)
    precio      = models.DecimalField(
                            max_digits=8,
                            decimal_places=2,
                            default=DECIMAL_CERO)
    imagen      = models.ImageField(
                            upload_to='productos_images',
                            blank=True)
    descripcion = models.TextField(
                            default=' ',
                            blank=True,
                            null=True)
    usuario     = models.ForeignKey(
                            User,
                            related_name='productos',
                            null=False,
                            blank=False,
                            verbose_name='Usuario',
                            on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre