from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

from registrationprofile.models import RegistrationProfile

User = get_user_model()


# Create your models here.
class CustomUser(AbstractUser):
    basic_user = models.OneToOneField(to=User, on_delete=models.CASCADE)
    registration_profile = models.OneToOneField(to=RegistrationProfile, on_delete=models.CASCADE, null=True, blank=True)
    avatar = models.ImageField(upload_to='', blank=True, null=True)
    banner = models.ImageField(upload_to='', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    about_me = models.TextField(blank=True, null=True)
    location = models.TextField(blank=True, null=True)
    phone_number = models.CharField(max_length=255, blank=True, null=True)
    job = models.CharField(max_length=255, blank=True, null=True)
    things_user_likes = models.TextField(blank=True, null=True)
    following = models.ManyToManyField('self', symmetrical=False, related_name='followers_users', blank=True)
    followers = models.ManyToManyField('self', symmetrical=False, related_name='following_users', blank=True)
    received_request_from = models.ForeignKey('friendrequest.FriendRequest', on_delete=models.CASCADE,
                                              related_name='received_requests', blank=True, null=True)
    sent_request_to = models.ForeignKey('friendrequest.FriendRequest', on_delete=models.CASCADE,
                                        related_name='sent_request', blank=True, null=True)
