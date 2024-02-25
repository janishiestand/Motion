from django.contrib.auth import get_user_model
from django.db import models

from customuser.models import CustomUser

User = get_user_model()


# Create your models here.
class FriendRequest(models.Model):
    STATUS_CHOICES = [
        ('Acc', 'Accepted'),
        ('Pen', 'Pending'),
        ('Dec', 'Declined'),
    ]
    requester = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_requests')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_requests')
    status = models.CharField(max_length=8, choices=STATUS_CHOICES, default='Pen')
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.requester} -> {self.receiver}' ({self.status})"
