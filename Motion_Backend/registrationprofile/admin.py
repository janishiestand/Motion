from django.contrib import admin

from registrationprofile.models import RegistrationProfile


# Register your models here.
class RegistrationProfileAdmin(admin.ModelAdmin):
    list_display = ('user', )


admin.site.register(RegistrationProfile, RegistrationProfileAdmin)
