from django.db import models
from django.contrib.auth.models import User

class UserPerfil(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=25, blank=False, null=False)
    apellido = models.CharField(max_length=25, blank=False, null=False)
    foto = models.ImageField(upload_to='profile_images', blank=True)

    def __str__(self):
        return self.user.username