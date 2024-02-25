from random import random

from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


def code_generator(length=5):
    numbers = '0123456789'
    return ''.join(random.choice(numbers) for _ in range(length))


# Create your models here.
class RegistrationProfile(models.Model):
    user = models.OneToOneField(to=User, on_delete=models.CASCADE, primary_key=True)
    code = models.CharField(max_length=5, default=code_generator)
