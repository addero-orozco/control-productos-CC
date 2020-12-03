# Generated by Django 3.1.4 on 2020-12-03 09:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0001_initial'),
        ('ventas', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='detalle',
            name='producto',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='detalles', to='productos.producto', verbose_name='Venta'),
        ),
    ]
