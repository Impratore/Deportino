# Generated by Django 4.2 on 2024-06-26 05:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tienda', '0004_customuser'),
    ]

    operations = [
        migrations.DeleteModel(
            name='CustomUser',
        ),
    ]