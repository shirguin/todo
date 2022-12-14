from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    username = models.CharField(max_length=64, unique=True)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    email = models.EmailField(max_length=64, unique=True)

    def __str__(self):
        return f'{self.last_name}-{self.first_name}'

    def delete(self, *args, **kwargs):
        self.is_active = False
        self.save()
