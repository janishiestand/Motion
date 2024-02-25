from django.contrib import admin

from customuser.models import CustomUser


# Register your models here.
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('basic_user', 'about_me', 'location')


admin.site.register(CustomUser, CustomUserAdmin)
