from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=200, blank=False, default='')
    author = models.ForeignKey(to=User, on_delete=models.CASCADE)
    content = models.TextField()
    image = models.ImageField(upload_to='', blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    likes = models.IntegerField(default=0)
    is_from_logged_in_user = models.BooleanField(default=False)
    shared_post = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE,
                                    related_name='shared_posts')
    original_post = models.ForeignKey('self', on_delete=models.CASCADE, related_name='original_posts', null=True, blank=True)
    shared = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.author}: {self.content}"
