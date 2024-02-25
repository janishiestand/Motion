from django.contrib import admin

from comment.models import Comment


# Register your models here.
class CommentAdmin(admin.ModelAdmin):
    list_display = ('author', 'content', 'created')


admin.site.register(Comment, CommentAdmin)
