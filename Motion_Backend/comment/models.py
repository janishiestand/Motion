from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()

# Create your models here.
class Comment(models.Model):
    author = models.ForeignKey(to=User, on_delete=models.CASCADE)
    post = models.ForeignKey('post.Post', on_delete=models.CASCADE)
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    is_from_logged_in_user = models.BooleanField(default=False)
