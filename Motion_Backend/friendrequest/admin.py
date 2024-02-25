from django.contrib import admin

from friendrequest.models import FriendRequest


# Register your models here.
class FriendRequestAdmin(admin.ModelAdmin):
    list_display = ('requester', 'receiver', 'status')


admin.site.register(FriendRequest, FriendRequestAdmin)
