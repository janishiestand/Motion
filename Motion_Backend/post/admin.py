from django.contrib import admin

from post.models import Post


# Register your models here.
class PostAdmin(admin.ModelAdmin):
    list_display = ('title','author', 'content', 'created')
    search_fields = ['title', 'content']
    ordering = ['created']


admin.site.register(Post, PostAdmin)
