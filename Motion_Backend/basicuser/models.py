from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models


# Create your models here.
class BasicUser(AbstractUser):
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    email = models.EmailField(unique=True)

    user_permissions = models.ManyToManyField(Permission, related_name='basic_user_related_user_permissions',
                                              blank=True)
    groups = models.ManyToManyField(Group, related_name='basic_user_related_groups', blank=True)

    def __str__(self):
        return self.email
